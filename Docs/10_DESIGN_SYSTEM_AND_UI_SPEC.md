# 10 · Design System, Visual Identity & UI Blueprint
**Project:** The Algorithm Knows Best  
**Version:** 2.0 (Redesign)  
**Implementation:** Tailwind CSS v4 (`@theme` tokens in [`src/index.css`](../src/index.css)), React 19, Radix primitives, Lucide icons, Framer Motion  
**Companion:** [09_UX_AUDIT_AND_REDESIGN.md](./09_UX_AUDIT_AND_REDESIGN.md)

---

## 1. Visual Identity

**Direction: "Clinical Editorial."** The algorithm is a flawless, faintly condescending specialist. The UI should feel like a premium pharmacy label printed by a Swiss design studio. It's calm, precise, typographic and confident. The humor comes from the **copy**, not from visual noise.

| Principle | Means | Rejects (from v1) |
|:--|:--|:--|
| **Quiet surfaces, loud words** | Warm paper / deep ink neutrals; a serif display face carries personality | Matrix rain, scanlines, neon glows everywhere |
| **One accent per moment** | *Signal* (lime/olive) = the Algorithm. *Pulse* (rose) = the Human. Never both at full strength in the same element. | Three competing neon accents |
| **Data is honest and legible** | Mono, tabular numerals for distances, scores and timers | Decorative fake percentages |
| **Motion explains, never decorates** | Springs on state changes only. Everything collapses to opacity under reduced motion. | Constant ambient animation |

---

## 2. Color System

All text pairings were **machine-checked against WCAG 2.x** (script: `brain/…/scratch/contrast.mjs`). Every text/background pair below meets **AAA (≥ 7:1)**. Non-text UI boundaries meet 1.4.11 (≥ 3:1).

### 2.1 Light mode

| Token | Hex | HSL | Role | Key contrast |
|:--|:--|:--|:--|:--|
| `--bg` | `#F7F6F2` | `hsl(48 24% 96%)` | App canvas (warm paper) | fg 17.18:1 |
| `--surface` | `#FFFFFF` | `hsl(0 0% 100%)` | Cards, sheets | fg 18.58:1 |
| `--surface-raised` | `#FFFFFF` | `hsl(0 0% 100%)` | Popovers (elevation via shadow) | — |
| `--surface-sunken` | `#EFEDE6` | `hsl(47 22% 92%)` | Wells, table headers, segmented track | fg-muted 8.23:1 |
| `--fg` | `#111318` | `hsl(223 17% 8%)` | Primary text | — |
| `--fg-muted` | `#3F4550` | `hsl(219 12% 28%)` | Secondary text (still AAA) | 9.64:1 on surface |
| `--border` | `#D9D6CC` | `hsl(46 15% 83%)` | Hairlines (decorative) | — |
| `--border-strong` | `#8A8578` | `hsl(43 7% 51%)` | Input/control outlines | 3.68:1 (1.4.11 ✓) |
| `--primary` (*Signal*) | `#2E4600` | `hsl(81 100% 14%)` | Algorithm, primary CTA fill | white label 10.54:1 |
| `--primary-soft` | `#EAF1D6` | — | Badge/tint bg | primary text 9.06:1 |
| `--secondary` (*Pulse*) | `#8A1F3D` | `hsl(343 63% 33%)` | Human side | white label 8.96:1 |
| `--secondary-soft` | `#F8E4EA` | — | Tint bg | 7.37:1 |
| `--success` | `#14532D` | `hsl(144 61% 20%)` | Success text/icons | 9.11:1 on surface |
| `--success-soft` | `#DCF2E3` | — | | 7.75:1 |
| `--warning` | `#713F12` | `hsl(28 73% 26%)` | Warnings | 8.67:1 |
| `--warning-soft` | `#F8EAD8` | — | | 7.33:1 |
| `--danger` | `#8F1D1D` | `hsl(0 66% 34%)` | Errors, destructive | 8.89:1 / white label 8.89:1 |
| `--danger-soft` | `#F9E0E0` | — | | 7.10:1 |
| `--info` | `#1E3A8A` | `hsl(224 64% 33%)` | Info | 10.36:1 |
| `--info-soft` | `#E0E8F8` | — | | 8.42:1 |

### 2.2 Dark mode

| Token | Hex | HSL | Key contrast |
|:--|:--|:--|:--|
| `--bg` | `#0B0C0F` | `hsl(225 15% 5%)` | fg 17.60:1 |
| `--surface` | `#131519` | `hsl(220 14% 9%)` | fg 16.45:1 |
| `--surface-raised` | `#1A1D22` | `hsl(218 13% 12%)` | fg-muted 8.89:1 |
| `--surface-sunken` | `#08090B` | `hsl(220 16% 4%)` | — |
| `--fg` | `#F4F3EE` | `hsl(50 21% 95%)` | — |
| `--fg-muted` | `#B8BCC6` | `hsl(223 11% 75%)` | 9.61:1 on surface |
| `--border` | `#2A2E36` | `hsl(220 13% 19%)` | decorative |
| `--border-strong` | `#6B717D` | `hsl(220 8% 45%)` | 3.73:1 (1.4.11 ✓) |
| `--primary` (*Signal*) | `#D4F55C` | `hsl(73 88% 66%)` | ink label 15.85:1 |
| `--primary-soft` | `#232A0E` | — | 12.08:1 |
| `--secondary` (*Pulse*) | `#FFB4C2` | `hsl(349 100% 85%)` | ink label 11.70:1 |
| `--secondary-soft` | `#3A1E25` | — | 9.02:1 |
| `--success` / soft | `#86EFAC` / `#0F2A1A` | `hsl(142 77% 73%)` | 13.02 / 10.95:1 |
| `--warning` / soft | `#FCD34D` / `#2E2408` | `hsl(46 97% 65%)` | 12.68 / 10.61:1 |
| `--danger` / soft | `#FCA5A5` / `#341616` | `hsl(0 94% 82%)` | 9.63 / 8.70:1 |
| `--info` / soft | `#93C5FD` / `#13233A` | `hsl(212 96% 78%)` | 10.14 / 8.76:1 |

> [!NOTE]
> The primary hue changes lightness across modes: deep olive in light mode, bright lime in dark mode. That's the only way to keep AAA labels on a filled button in both modes. A single brand hex can't do it.

### 2.3 Semantic mapping (product meaning)
| Concept | Token | Icon (Lucide) |
|:--|:--|:--|
| Algorithm was right | `primary` | `Cpu` |
| Human was right | `secondary` | `Brain` |
| Objection / disputed | `warning` | `Gavel` |
| Unranked round | `info` | `FlaskConical` |
| Streak | `warning` text on `warning-soft` | `Flame` |

---

## 3. Typography

| Role | Family | Why |
|:--|:--|:--|
| Display | **Instrument Serif** (400, italic) | Editorial, wry, instantly distinct from every SaaS dashboard |
| UI / Body | **Inter** (400/500/600) | Best-in-class screen legibility, wide language support |
| Data / Mono | **JetBrains Mono** (400/500) | Tabular numerals for timer, distances, scores |

### Type scale (4px baseline, rem @ 16px)

| Token | Size / Line | Weight | Tracking | Usage |
|:--|:--|:--|:--|:--|
| `text-display` | 44 / 48 (2.75rem / 3rem) | 400 serif | -0.02em | Prescription title |
| `text-display-sm` | 32 / 36 | 400 serif | -0.015em | Dilemma prompt, ruling quote |
| `text-h1` | 24 / 32 | 600 | -0.01em | Sheet titles |
| `text-h2` | 20 / 28 | 600 | -0.005em | Section heads |
| `text-h3` | 16 / 24 | 600 | 0 | Card heads, option labels |
| `text-body-lg` | 18 / 28 | 400 | 0 | Prescription instructions |
| `text-body` | 16 / 24 | 400 | 0 | Default |
| `text-sm` | 14 / 20 | 400/500 | 0 | Secondary copy, buttons |
| `text-caption` | 12 / 16 | 500 | 0.04em, uppercase | Eyebrows, table headers |
| `text-mono` | 13 / 20 | 500 mono, `tabular-nums` | 0 | Numbers, timers, distances |

Rules: max line length is 62ch for body. Uppercase only at caption size. Never use the serif below 24px.

---

## 4. Space, Shape, Depth

### 4.1 Spacing: 4px base, 8px rhythm
`1=4 · 2=8 · 3=12 · 4=16 · 5=20 · 6=24 · 8=32 · 10=40 · 12=48 · 16=64` (Tailwind defaults align with this.)
- Card padding: `24` on mobile, `32` on ≥ md
- Gap between stacked controls: `12`; between sections: `32`
- Touch targets ≥ 44×44 (WCAG 2.5.5 AAA)

### 4.2 Radius
| Token | Value | Use |
|:--|:--|:--|
| `rounded-sm` | 6px | Badges, kbd |
| `rounded-md` | 10px | Buttons, inputs |
| `rounded-lg` | 14px | Option tiles, table container |
| `rounded-xl` | 20px | Main card |
| `rounded-2xl` | 28px | Bottom sheet top corners |
| `rounded-full` | — | Chips, avatar, timer ring |

### 4.3 Borders
- 1px `--border` hairline on every surface (decorative).
- Interactive outlines use `--border-strong` (3:1+).
- Focus: 2px `--ring` (= primary) offset 2px, on `:focus-visible` only.

### 4.4 Elevation
| Level | Light | Dark | Use |
|:--|:--|:--|:--|
| `shadow-e0` | none | none | Flat |
| `shadow-e1` | `0 1px 2px rgb(17 19 24 / .06), 0 1px 1px rgb(17 19 24 / .04)` | `0 0 0 1px rgb(255 255 255 / .04)` | Tiles |
| `shadow-e2` | `0 8px 24px -8px rgb(17 19 24 / .12), 0 2px 6px rgb(17 19 24 / .05)` | `0 12px 32px -12px rgb(0 0 0 / .7), 0 0 0 1px rgb(255 255 255 / .05)` | Main card |
| `shadow-e3` | `0 24px 64px -16px rgb(17 19 24 / .22)` | `0 24px 64px -16px rgb(0 0 0 / .85)` | Sheets, popovers |

Dark mode relies on **lighter surfaces + 1px inner highlights** rather than shadows. Shadows are nearly invisible on near-black.

### 4.5 Glass (used sparingly)
Only on the **sticky top bar** and the **sheet overlay**, where content scrolls underneath:
`bg-[color-mix(in_oklab,var(--bg)_72%,transparent)] backdrop-blur-xl backdrop-saturate-150` with a bottom hairline. Never glass on reading surfaces; it reduces contrast.

---

## 5. Layout Blueprint

### 5.1 Today (the only route)
```
┌─────────────────────────────────────────────────────────────┐
│  ◆ The Algorithm            🔥 3     [Record]  [◐ Theme]    │ ← sticky glass bar, 56px
├─────────────────────────────────────────────────────────────┤
│                                                             │
│        caption: DAY 14 · TODAY'S DIAGNOSIS                  │
│        Display serif headline (diagnose stage only)         │
│                                                             │
│   ┌───────────────────────────────────────────────────┐     │
│   │  ▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬ ── progress (5 segments)│     │
│   │                                                   │     │
│   │  STAGE CONTENT (morphs, height-animated)          │     │ ← max-w 640px, rounded-xl, e2
│   │   • diagnose: prompt + 2 option tiles             │     │
│   │   • computing: skeleton + reasoning lines         │     │
│   │   • prescription: title, why, axes, timer, ruling │     │
│   │   • ruled: stamp, quote, share, countdown         │     │
│   │                                                   │     │
│   └───────────────────────────────────────────────────┘     │
│        footer hint: keyboard shortcuts / privacy line       │
└─────────────────────────────────────────────────────────────┘
```
- **Mobile (< 640px):** the card goes full-bleed with 16px gutters. Option tiles stack. The ruling row is sticky to the bottom safe area (thumb zone).
- **Desktop:** centered column, max 640px. Option tiles side by side.

### 5.2 Record sheet (Radix Dialog)
- **≥ md:** right side sheet, 440px, full height.
- **< md:** bottom sheet, max 88vh, 28px top radius, drag-handle affordance.
- Content order: **Score** (3 stat tiles) → **Streak** → **Taste profile** (5 bipolar axes) → **History** (filter chips + table).

### 5.3 Modals
Only one modal-class surface exists: the Record sheet. Confirmations are inline, never modal. Destructive "Reset all data" lives at the bottom of the sheet and uses an inline two-step confirm (button turns into "Confirm reset" for 4s).

---

## 6. Component Anatomy

### 6.1 Button (`src/components/ui/button.tsx`)
| Variant | Rest | Hover | Active | Disabled |
|:--|:--|:--|:--|:--|
| **Primary** | `bg-primary text-on-primary` e1 | brightness 1.08 (dark) / 1.15 (light), lift -1px | scale .98, no lift | 50% opacity, no pointer |
| **Secondary** | `bg-surface border-strong text-fg` | `bg-surface-sunken` | scale .98 | same |
| **Ghost** | transparent `text-fg-muted` | `bg-surface-sunken text-fg` | scale .98 | same |
| **Destructive** | `bg-danger text-on-danger` | brightness | scale .98 | same |

Sizes: `sm` 36px h, `md` 44px h (default), `lg` 52px h, `icon` 44×44. Loading: the label stays visible for width stability, a spinner is prepended, and `aria-busy`. Focus ring is on `:focus-visible` only.

### 6.2 Option tile (dilemma choice)
- Full-width button, `rounded-lg`, 1px `border-strong`, padding 20.
- Anatomy: `Kbd` (A/B) top-left → label (h3) → tagline (sm, muted).
- Hover: border → primary, bg → primary-soft at 40%. Press: scale .985. Selection: a 120ms primary fill flash, then the next step slides in.

### 6.3 Inputs (spec only; there is no free-text input in the v2 core flow)
Height 44, `rounded-md`, `bg-surface`, 1px `border-strong`, `text-body`. Label above (sm/500), helper below (sm, muted). Error: border + helper in `danger`, with an icon (`CircleAlert`) and `aria-describedby`. Focus: 2px ring.

### 6.4 Data table (History, in the Record sheet)
- Container `rounded-lg border`. Header row `bg-surface-sunken text-caption`.
- Columns: Date (mono) · Prescription · Distance (mono, right) · Ruling (badge).
- Row height 48, hover `bg-surface-sunken/60`. Zebra striping off (hairline separators instead).
- **< sm:** collapses to stacked rows (prescription + badge on line 1, date + distance on line 2).
- Empty and empty-filtered states are defined in doc 09 §4.

### 6.5 Filter chips (segmented control)
`role="radiogroup"` track in `surface-sunken`, `rounded-full`. Selected chip gets `bg-surface shadow-e1`. A shared-layout spring moves the selected background between chips. Each chip shows a count.

### 6.6 Badge
`rounded-sm px-2 h-6 text-caption` in `{tone}-soft` bg with `{tone}` text. Tones: neutral, primary, secondary, success, warning, danger, info. Always icon + text, never color alone.

### 6.7 Tooltip (Radix)
`surface-raised`, e3, `rounded-md`, `text-sm`, 6px offset, 300ms delay, instant on keyboard focus. Used only for icon-only buttons and the distance explainer.

### 6.8 Timer chip
Pill with a 20px SVG progress ring + mono `mm:ss`. States: idle ("Start 2:00 timer"), running (ring animates, pause on click), done ("Time's up", success tone). The timestamp is persisted.

### 6.9 Taste axis
Bipolar bar: left label · track (sunken) · right label. A primary dot marks *you*. On the prescription view, a hollow secondary ring marks *the task*, so the distance is visible at a glance.

---

## 7. Motion

| Token | Spec | Use |
|:--|:--|:--|
| `spring.snappy` | `{ type: "spring", stiffness: 520, damping: 38, mass: 0.8 }` | Chips, tiles, buttons |
| `spring.gentle` | `{ type: "spring", stiffness: 260, damping: 30 }` | Card height, stage morphs |
| `spring.sheet` | `{ type: "spring", stiffness: 340, damping: 36 }` | Sheet enter/exit |
| `duration.micro` | 120ms `cubic-bezier(.2,.8,.2,1)` | Hover color, focus |
| `duration.standard` | 200ms | Fades |
| Stage transition | exit: fade + y −8 (150ms); enter: fade + y 12 → 0 (`gentle`) | Dilemma → next, stage → stage |
| Ruling stamp | scale 1.15 → 1, rotate −4° → −2°, `snappy` | Ruled stage |
| Reduced motion | `MotionConfig reducedMotion="user"`: transforms disabled, opacity only; shimmer off | Global |

Rules: animate **one** thing per interaction. Nothing loops except the timer ring and the skeleton shimmer (both disabled under reduced motion).

---

## 8. Accessibility Checklist
- [x] AAA text contrast in both themes (verified above)
- [x] 44px minimum targets
- [x] Full keyboard path: `A`/`B` or `1`/`2` choose, `Backspace` undoes, `1`/`2`/`3` rule. Keys are scoped to the active stage and ignored while focus is in an input or the sheet.
- [x] Focus is moved to each new stage's heading (`tabIndex=-1`) and announced via `aria-live="polite"`
- [x] Radix Dialog provides focus trap, `Esc`, and scroll lock
- [x] Theme follows `prefers-color-scheme` until overridden. No flash of the wrong theme (inline boot script).
- [x] Color is never the only signal (badges carry icons + text)
