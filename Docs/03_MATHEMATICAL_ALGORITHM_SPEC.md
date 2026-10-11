# Mathematical Algorithm Specification: The Anti-Recommendation Engine
**Project:** The Algorithm Knows Best  
**Document Version:** 1.0.0  
**Status:** Approved Algorithmic Standard  

---

## 1. Mathematical Formulation

Conventional recommender systems (collaborative filtering, matrix factorization, vector embeddings) optimize for **utility maximization**:
$$\text{argmax}_{i \in \mathcal{I}} \left( \text{Similarity}(\mathbf{u}, \mathbf{v}_i) \right)$$
Where $\mathbf{u}$ represents user preference and $\mathbf{v}_i$ represents item attributes.

*The Algorithm Knows Best* optimizes for **calculated friction**—selecting tasks from the **uncomfortable middle band**:
$$\mathcal{I}_{\text{target}} = \left\{ i \in \mathcal{I} \;\middle|\; \theta_{\text{lower}} \le \mathcal{D}(\mathbf{u}, \mathbf{v}_i) \le \theta_{\text{upper}} \right\}$$

Where:
- $\mathcal{D}(\mathbf{u}, \mathbf{v}_i)$ is the normalized distance metric.
- $\theta_{\text{lower}} = 0.40$ (Dropping the "Boring Tier": tasks too close to existing comfort).
- $\theta_{\text{upper}} = 0.75$ (Dropping the "Repulsive Tier": tasks with high refusal probability).

---

## 2. Taste Vector Space Definition

Every user profile $\mathbf{u}$ and every assignment $\mathbf{v}$ is mapped into an orthonormal 5-dimensional vector space $\mathbb{R}^5$, bounded within $[-1.0, 1.0]^5$:

$$\mathbf{v} = \begin{bmatrix} d_1 \\ d_2 \\ d_3 \\ d_4 \\ d_5 \end{bmatrix} = \begin{bmatrix} \text{Adventurousness vs. Comfort} \\ \text{Sensory Intensity vs. Mildness} \\ \text{Traditional vs. Avant-Garde} \\ \text{Cognitive Friction vs. Low-Effort} \\ \text{Absurdity vs. Utilitarianism} \end{bmatrix}$$

### 2.1 Dimensional Axes

| Dimension | Coordinate Range | Negative Extreme (-1.0) | Positive Extreme (+1.0) |
| :--- | :---: | :--- | :--- |
| $d_1$: **Adventurousness** | $[-1.0, 1.0]$ | Highly predictable, routine-seeking | Novelty-seeking, chaotic, experimental |
| $d_2$: **Sensory Intensity** | $[-1.0, 1.0]$ | Low stimulation, beige, silence, bland | High sensory stimulus (polka, wasabi, bright neon) |
| $d_3$: **Aesthetic Tradition** | $[-1.0, 1.0]$ | Classical, canonical, universally accepted | Niche, counter-culture, ironic, camp |
| $d_4$: **Cognitive Effort** | $[-1.0, 1.0]$ | Zero-friction, passive consumption | Analytical, focus-intensive, self-reflection |
| $d_5$: **Absurdity** | $[-1.0, 1.0]$ | Pragmatic, literal, serious | Surrealist, Dadaist, nonsensical logic |

---

## 3. Taste Vector Synthesis from Dilemmas

A session presents $K = 5$ binary dilemmas. Each dilemma $k$ presents two mutually exclusive options $A$ and $B$, each having a differential delta vector $\boldsymbol{\delta}_{k,A}$ and $\boldsymbol{\delta}_{k,B} = -\boldsymbol{\delta}_{k,A}$.

### 3.1 Aggregation Formula
The user's preliminary taste vector $\mathbf{u}_0$ is computed as the normalized centroid of selections:

$$\mathbf{u}_0 = \frac{1}{\sqrt{\sum_{j=1}^5 \left( \sum_{k=1}^K w_k \cdot \delta_{k, \text{choice}, j} \right)^2}} \cdot \sum_{k=1}^K w_k \boldsymbol{\delta}_{k, \text{choice}}$$

Where:
- $w_k = 1.0$ is the standard dilemma weighting factor.
- The denominator provides Euclidean normalization: $\|\mathbf{u}_0\|_2 = 1.0$.

---

## 4. Distance Metric

To capture both the directional divergence in taste (polar opposite vs. aligned) and variance across dimensions, we use a hybrid **Cosine-Euclidean Distance**:

### 4.1 Cosine Distance
$$\mathcal{S}_{\cos}(\mathbf{u}, \mathbf{v}) = \frac{\mathbf{u} \cdot \mathbf{v}}{\|\mathbf{u}\|_2 \|\mathbf{v}\|_2}$$
$$\mathcal{D}_{\cos}(\mathbf{u}, \mathbf{v}) = \frac{1 - \mathcal{S}_{\cos}(\mathbf{u}, \mathbf{v})}{2} \in [0.0, 1.0]$$

### 4.2 Distance Interpretation Table
```
 0.00                    0.40                       0.75                     1.00
  ├─── BORING TIER ───────┼── UNCOMFORTABLE SWEET SPOT ┼────── ABSURD TIER ─────┤
  │ (Too familiar,        │   (Optimal friction,       │   (Known hate,        │
  │  zero growth, yawn)   │    provocative, potential) │    hostile refusal)   │
  └─── DROPPED ───────────┴─── ELIGIBLE POOL ──────────┴────── DROPPED ────────┘
```

---

## 5. Candidate Selection Pipeline & Determinism

To ensure daily consistency and prevent the same user from re-rolling candidates until they get an easy task, the selection is **cryptographically pseudo-random**:

### 5.1 Deterministic Hash Seeding
Given:
- `UserUUID`: Unique persistent client identifier stored in browser.
- `DateUTC`: Canonical date string `YYYY-MM-DD`.
- `Seed` = `HMAC-SHA256(SecretKey, UserUUID + ":" + DateUTC)`

The seed initializes a **Mulberry32** pseudo-random number generator:

$$\text{PRNG}(s) \to r \in [0, 1)$$

### 5.2 Category Cooldown Constraint
Let $C_{\text{yesterday}}$ be the category of the assignment completed in the previous session:
$$\mathcal{I}_{\text{eligible}} = \left\{ i \in \mathcal{I}_{\text{target}} \;\middle|\; \text{Category}(i) \neq C_{\text{yesterday}} \right\}$$

If $\mathcal{I}_{\text{eligible}}$ is empty due to pool sparsity, relax the lower boundary $\theta_{\text{lower}}$ by $-0.05$ iteratively until $|\mathcal{I}_{\text{eligible}}| \ge 1$.

### 5.3 Selection
$$\text{Selected Index} = \lfloor r \times |\mathcal{I}_{\text{eligible}}| \rfloor$$

---

## 6. Feedback Vector Perturbation (Learning Loop)

When the user registers a verdict $V \in \{\text{WAS\_WRONG}, \text{HATED\_IT}, \text{WANT\_TO\_FIGHT}\}$, their taste vector $\mathbf{u}$ evolves:

### 6.1 Case 1: "I Was Wrong" ($V = \text{WAS\_WRONG}$)
The user concedes that the algorithm's anti-recommendation was surprisingly enjoyable. The profile pulls towards the assignment vector $\mathbf{v}$:
$$\mathbf{u}_{t+1} = \text{normalize}\left(\mathbf{u}_t + \alpha \cdot (\mathbf{v} - \mathbf{u}_t)\right)$$
Where learning rate $\alpha = 0.20$.

### 6.2 Case 2: "I Hated It" ($V = \text{HATED\_IT}$)
The user rejected the experience as anticipated. To avoid extreme polarization, the algorithm gently contracts the profile towards safe territory:
$$\mathbf{u}_{t+1} = \text{normalize}\left(\mathbf{u}_t - \beta \cdot \mathbf{v}\right)$$
Where regression rate $\beta = 0.08$.

### 6.3 Case 3: "I Want to Fight the Algorithm" ($V = \text{WANT\_TO\_FIGHT}$)
Vector remains unchanged:
$$\mathbf{u}_{t+1} = \mathbf{u}_t$$
The incident is logged in the `disputed_tally` telemetry counter, and the algorithm delivers a maximum-condescension response.

---

## 7. Reference Implementation (TypeScript)

```typescript
/**
 * Vector Math and Anti-Recommendation Selection Engine
 * Pure, deterministic, zero-dependency implementation.
 */

export interface TasteVector {
  adventurousness: number;    // [-1.0, 1.0]
  sensoryIntensity: number;   // [-1.0, 1.0]
  tradition: number;          // [-1.0, 1.0]
  cognitiveEffort: number;    // [-1.0, 1.0]
  absurdity: number;          // [-1.0, 1.0]
}

export interface AssignmentCandidate {
  id: string;
  title: string;
  category: 'music' | 'food' | 'tiny_behavior' | 'literature' | 'digital';
  vector: TasteVector;
  effortMinutes: number;
}

export class AntiRecommendationEngine {
  private static readonly LOWER_BOUND = 0.40;
  private static readonly UPPER_BOUND = 0.75;

  /**
   * Calculates Normalized Cosine Distance between User and Candidate
   * Range: 0.0 (identical) to 1.0 (opposite)
   */
  public static calculateDistance(u: TasteVector, v: TasteVector): number {
    const dot =
      u.adventurousness * v.adventurousness +
      u.sensoryIntensity * v.sensoryIntensity +
      u.tradition * v.tradition +
      u.cognitiveEffort * v.cognitiveEffort +
      u.absurdity * v.absurdity;

    const normU = Math.sqrt(
      u.adventurousness ** 2 +
      u.sensoryIntensity ** 2 +
      u.tradition ** 2 +
      u.cognitiveEffort ** 2 +
      u.absurdity ** 2
    ) || 1e-6;

    const normV = Math.sqrt(
      v.adventurousness ** 2 +
      v.sensoryIntensity ** 2 +
      v.tradition ** 2 +
      v.cognitiveEffort ** 2 +
      v.absurdity ** 2
    ) || 1e-6;

    const cosineSim = dot / (normU * normV);
    // Transform [-1, 1] cosine similarity to [0, 1] distance
    return Math.max(0, Math.min(1, (1 - cosineSim) / 2));
  }

  /**
   * Mulberry32 fast deterministic 32-bit PRNG
   */
  public static mulberry32(seed: number): () => number {
    return () => {
      let t = (seed += 0x6d2b79f5);
      t = Math.imul(t ^ (t >>> 15), t | 1);
      t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }

  /**
   * Selects an assignment strictly within the uncomfortable middle band
   */
  public static selectAssignment(
    userProfile: TasteVector,
    pool: AssignmentCandidate[],
    lastCategory: string | null,
    numericSeed: number
  ): { assignment: AssignmentCandidate; distance: number; matchScoreDisplay: string } {
    // 1. Score all candidates
    const scored = pool.map(item => ({
      item,
      distance: this.calculateDistance(userProfile, item.vector),
    }));

    // 2. Filter for uncomfortable middle band & cooldown
    let eligible = scored.filter(
      s =>
        s.distance >= this.LOWER_BOUND &&
        s.distance <= this.UPPER_BOUND &&
        s.item.category !== lastCategory
    );

    // Fallback: If category cooldown exhausted eligible items, allow any category in band
    if (eligible.length === 0) {
      eligible = scored.filter(
        s => s.distance >= this.LOWER_BOUND && s.distance <= this.UPPER_BOUND
      );
    }

    // Secondary Fallback: Closest to 0.55 if pool empty
    if (eligible.length === 0) {
      scored.sort((a, b) => Math.abs(a.distance - 0.55) - Math.abs(b.distance - 0.55));
      eligible = [scored[0]];
    }

    // 3. Deterministic pick from eligible
    const rng = this.mulberry32(numericSeed);
    const pickIndex = Math.floor(rng() * eligible.length);
    const chosen = eligible[pickIndex];

    // Compute satirical "Match Score" (inverted distance display)
    // A 0.55 distance displays sarcastically as "4.2% Optimal Incompatibility"
    const displayPct = ((1 - chosen.distance) * 8.5).toFixed(1);

    return {
      assignment: chosen.item,
      distance: chosen.distance,
      matchScoreDisplay: `${displayPct}%`,
    };
  }
}
```
