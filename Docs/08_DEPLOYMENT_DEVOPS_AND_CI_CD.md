# Deployment, DevOps & CI/CD Pipeline
**Project:** The Algorithm Knows Best  
**Document Version:** 1.0.0  
**Status:** Approved DevOps Blueprint  

---

## 1. Dual Deployment Topologies

To maximize flexibility between serverless agility and containerized independence, the system supports two battle-tested deployment topologies:

```
TOPOLOGY A: SERVERLESS EDGE (RECOMMENDED)       TOPOLOGY B: CONTAINERIZED / DOCKER
+----------------------------------------+     +----------------------------------------+
| Client Browser                         |     | Client Browser                         |
+-------------------+--------------------+     +-------------------+--------------------+
                    │                                              │
                    ▼                                              ▼
+----------------------------------------+     +----------------------------------------+
| Cloudflare Global Anycast Edge Network |     | Cloudflare DNS / WAF                   |
| - Cloudflare Pages (Static Frontend)   |     +-------------------+--------------------+
| - Cloudflare Workers (API & OG Worker) |                         │
| - Cloudflare Turnstile & DDoS Defense  |                         ▼
+-------------------+--------------------+     +----------------------------------------+
                    │                          | NGINX Reverse Proxy (SSL, Gzip, Cache) |
                    ▼                          +-------------------+--------------------+
+----------------------------------------+                         │
| Serverless Persistence Tier            |                         ▼
| - Upstash Redis (Counters & Cache)     |     +----------------------------------------+
| - Neon / Supabase Serverless Postgres  |     | Docker Compose / Kubernetes Cluster    |
+----------------------------------------+     | - Node.js Next.js Standalone Container |
                                               | - Redis 7 Container (AOF Persistence)  |
                                               | - PostgreSQL 16 Container              |
                                               +----------------------------------------+
```

---

## 2. Production Multi-Stage Dockerfile

A rock-solid, multi-stage Docker build producing a minimal (< 110 MB) hardened Alpine container running as a non-root user:

```dockerfile
# ==============================================================================
# STAGE 1: Dependency Caching
# ==============================================================================
FROM node:20-alpine AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci --frozen-lockfile

# ==============================================================================
# STAGE 2: Build Application
# ==============================================================================
FROM node:20-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

ENV NEXT_TELEMETRY_DISABLED=1
ENV NODE_ENV=production

RUN npm run build

# ==============================================================================
# STAGE 3: Hardened Production Runtime
# ==============================================================================
FROM node:20-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"
ENV NEXT_TELEMETRY_DISABLED=1

# Security: Create and run as unprivileged user
RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 nextjs

# Copy standalone bundle and static assets
COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

HEALTHCHECK --interval=30s --timeout=5s --start-period=5s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://localhost:3000/api/health || exit 1

CMD ["node", "server.js"]
```

---

## 3. Production Docker Compose Configuration

```yaml
version: '3.8'

services:
  web:
    build:
      context: .
      dockerfile: Dockerfile
    restart: always
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
      - DATABASE_URL=postgresql://app_user:app_secure_pw@postgres:5432/algorithm_db?sslmode=disable
      - REDIS_URL=redis://redis:6379
      - HMAC_SECRET=${HMAC_SECRET}
      - NEXT_PUBLIC_TURNSTILE_SITE_KEY=${NEXT_PUBLIC_TURNSTILE_SITE_KEY}
      - TURNSTILE_SECRET_KEY=${TURNSTILE_SECRET_KEY}
    depends_on:
      postgres:
        condition: service_healthy
      redis:
        condition: service_healthy
    deploy:
      resources:
        limits:
          cpus: '1.5'
          memory: 1024M

  postgres:
    image: postgres:16-alpine
    restart: always
    environment:
      POSTGRES_DB: algorithm_db
      POSTGRES_USER: app_user
      POSTGRES_PASSWORD: app_secure_pw
    volumes:
      - pgdata:/var/lib/postgresql/data
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U app_user -d algorithm_db"]
      interval: 10s
      timeout: 5s
      retries: 5
    deploy:
      resources:
        limits:
          cpus: '1.0'
          memory: 1024M

  redis:
    image: redis:7-alpine
    restart: always
    command: redis-server --appendonly yes --requirepass redis_secure_pw
    volumes:
      - redisdata:/data
    healthcheck:
      test: ["CMD", "redis-cli", "ping"]
      interval: 10s
      timeout: 5s
      retries: 5
    deploy:
      resources:
        limits:
          cpus: '0.5'
          memory: 512M

volumes:
  pgdata:
  redisdata:
```

---

## 4. Continuous Integration & Continuous Deployment (CI/CD)

The GitHub Actions pipeline provides automated validation, testing, and zero-downtime deployment:

```yaml
name: CI/CD Pipeline - The Algorithm Knows Best

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

concurrency:
  group: ${{ github.workflow }}-${{ github.ref }}
  cancel-in-progress: true

jobs:
  lint-and-test:
    name: 🛡️ Code Quality & Unit Tests
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: 'npm'

      - name: Install Dependencies
        run: npm ci

      - name: Type Check
        run: npm run typecheck

      - name: ESLint
        run: npm run lint

      - name: Unit Tests (Vitest)
        run: npm run test:coverage

      - name: Security Audit
        run: npm audit --audit-level=high

  e2e-and-a11y:
    name: 🧪 E2E & Accessibility (Playwright)
    needs: lint-and-test
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: 'npm'

      - name: Install Dependencies
        run: npm ci

      - name: Install Playwright Browsers
        run: npx playwright install --with-deps chromium

      - name: Run E2E Test Suite
        run: npx playwright test

      - name: Upload Playwright Artifacts
        if: failure()
        uses: actions/upload-artifact@v4
        with:
          name: playwright-report
          path: playwright-report/

  deploy-production:
    name: 🚀 Production Deploy (Cloudflare / Edge)
    needs: [lint-and-test, e2e-and-a11y]
    if: github.ref == 'refs/heads/main' && github.event_name == 'push'
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: 'npm'

      - name: Install Dependencies
        run: npm ci

      - name: Run Database Migrations
        env:
          DATABASE_URL: ${{ secrets.PROD_DATABASE_URL }}
        run: npx drizzle-kit migrate

      - name: Deploy to Cloudflare Pages
        uses: cloudflare/wrangler-action@v3
        with:
          apiToken: ${{ secrets.CLOUDFLARE_API_TOKEN }}
          accountId: ${{ secrets.CLOUDFLARE_ACCOUNT_ID }}
          command: pages deploy .next --project-name=the-algorithm-knows-best
```

---

## 5. Observability, Metrics & Telemetry

### 5.1 Health Check Endpoint (`GET /api/health`)
Returns deep diagnostic JSON with sub-5ms latency:

```json
{
  "status": "healthy",
  "timestamp": "2026-10-11T18:00:00.000Z",
  "version": "1.0.0",
  "services": {
    "database": "connected",
    "redis": "connected",
    "turnstile": "active"
  },
  "metrics": {
    "uptimeSeconds": 86420,
    "memoryUsageMb": 42.1
  }
}
```

### 5.2 Error Monitoring (Sentry Integration)
- Every uncaught client and edge worker exception is stripped of any PII, enriched with release version and breadcrumb tags, and pushed to Sentry.
- Alerts trigger in Slack / Discord if 5xx error rate exceeds 0.5% over a 5-minute sliding window.
