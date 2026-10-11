# User Interaction Architecture & UX Design System
**Project:** The Algorithm Knows Best  
**Document Version:** 1.0.0  
**Status:** Approved UX/UI Specification  

---

## 1. Information Architecture & User Journey Map

The core philosophy of *The Algorithm Knows Best* is **zero friction, high punchline**. There are no accounts, no multi-step onboarding carousels, and no paywalls. The user enters, engages in 5 dilemmas, receives an uncomfortable task, executes it, renders a verdict, and gets insulted by a machine.

```
[Arrival] ──────────► [Dilemma Tribunal] ──────────► [The Computation]
  │                      │                              │
  ├─ Global Scorecard    ├─ 5 Binary Choices            ├─ Fake Math & Insults
  └─ "Begin Protocol"    └─ Snappy Key/Touch Nav        └─ 1.8s Suspense Hold
                                                        │
[Post-Verdict State] ◄── [Verdict Tribunal] ◄────────── [Assignment Reveal]
  │                        │                              │
  ├─ Sarcastic Quip        ├─ "I was wrong"               ├─ Sarcastic Match %
  ├─ Global/Local Score    ├─ "I hated it"                ├─ 5-Min Micro-Timer
  └─ Dynamic Viral Card    └─ "I want to fight"           └─ Action Protocol
```

---

## 2. Screen-by-Screen Experience Specification

### 2.1 Screen 1: The Monolith (Hero Entry)
- **Primary Elements:**
  - **The Algorithm's Status Banner:** Pulsing terminal status: `"STATUS: OVERCONFIDENT (99.4% SUPERIORITY RATE)"`.
  - **Live Scoreboard Header:**
    - `The Algorithm Right: 142,391` (Green Accent)
    - `Human Taste Right: 12,402` (Muted Violet)
    - `Disputed / Active Conflicts: 9,114` (Alert Red)
  - **Tagline:** *"Submit to the math. Five minutes of calculated discomfort."*
  - **Primary CTA:** Mechanical button: `[ INITIATE DAILY CALIBRATION ]`.
  - **Keyboard Support:** `Space` or `Enter` to start immediately.

### 2.2 Screen 2: The Dilemma Tribunal (The 5 Questions)
- **UX Layout:** A centered card stack with high-contrast split options.
- **Micro-Interactions:**
  - Left / Right keys or numeric keys `[1]` and `[2]` immediately select an option.
  - Selecting an option triggers a crisp 120ms mechanical slide transition to the next card.
  - Progress bar renders as a retro 5-segment segmented digital display: `[ ■ ■ ■ □ □ ] 3/5`.
- **Sample Dilemma Pair:**
  > **Dilemma #2:**
  > - **[Option A]** Warm acoustic folk by a campfire in Maine
  > - **[Option B]** Relentless 140 BPM Berlin warehouse techno at 4:00 AM

### 2.3 Screen 3: The Computation (Calculated Suspense)
- **Duration:** Exactly 1,800ms.
- **Animation Sequence:** Simulated algorithmic calculation running through mock terminal strings:
  1. *0ms:* `"Deconstructing your flawed cultural assumptions..."`
  2. *600ms:* `"Detecting tragic preference biases..."`
  3. *1200ms:* `"Isolating optimal friction coordinates..."`
  4. *1800ms:* `"Anti-recommendation locked."`

### 2.4 Screen 4: The Assignment Reveal
- **Layout & Visuals:**
  - **Match Badge:** Sarcastic badge e.g. `MATCH SCORE: 3.2% (MATHEMATICALLY IDEAL)`.
  - **Category Identifier:** e.g., `CATEGORY: UNCOMFORTABLE ACOUSTICS`.
  - **Task Title:** e.g., `"The Polka Penance"`.
  - **Task Instruction:** Clear, unambiguous 2-3 sentence directive.
  - **Safety Notice:** Subtext: `"100% Solo. Zero public embarrassment. Safe, harmless friction."`

### 2.5 Screen 5: The Micro-Task Execution & Countdown
- **Interactive Timer:** A sleek digital countdown preset to the task's duration (e.g., `02:30` or `05:00`).
- **Controls:**
  - `[ START TIMER ]` / `[ PAUSE ]` / `[ I FINISHED EARLY ]`.
  - Audio embedded snippet (if music category) or external instruction links.
  - Ticking sound effect (subtle synthetic pulse, can be muted).

### 2.6 Screen 6: The Verdict Tribunal
- Once the timer expires (or user clicks early), three high-impact buttons unlock:

| Button | Visual Style | Psychological Intent |
| :--- | :--- | :--- |
| **"I Was Wrong"** | Electric Emerald Glow (`#00FF88`) | Humiliating concession; credits point to Algorithm. |
| **"I Hated It"** | Steel Slate Neutral (`#64748B`) | Defends taste; credits point to User. |
| **"I Want to Fight"** | Glitched Alarming Crimson (`#FF3366`) | Total defiance; increments disputed tally. |

### 2.7 Screen 7: The Sarcastic Retort & Scorecard
- Dynamic typewriter effect renders the Algorithm's custom response.
- Local tally and global counter animate up by +1.
- Daily lock activates: A sleek 24-hour countdown appears: `"Next calibration available in 14h 22m"`.
- Action CTA: `[ GENERATE RESULT CARD ]`.

### 2.8 Screen 8: Dynamic Social Result Card
- Modal displays a generated preview card (1200x630):
  - Dark brutalist background.
  - Title: *"The Algorithm Made Me Listen To Polka."*
  - Badge: *"Verdict: I Was Wrong (Algorithm +1)"*.
  - Score watermark: *"Algorithm 4 | Human 1"*.
- Quick actions:
  - `[ Copy Shareable Link ]`
  - `[ Post to X / Twitter ]`
  - `[ Download PNG ]`

---

## 3. Design System Tokens & Aesthetics

The aesthetic is **Neo-Brutalist Cyber-Terminal**: clean typography, obsidian surfaces, razor-sharp borders, and purposeful neon accents.

```css
:root {
  /* Color Tokens */
  --bg-void: #07080c;
  --bg-surface: #0f1118;
  --bg-surface-elevated: #161922;
  --border-subtle: #232734;
  --border-active: #00ff88;
  
  --text-primary: #f3f4f6;
  --text-secondary: #9ca3af;
  --text-muted: #6b7280;
  
  /* Semantic Accent Colors */
  --accent-algorithm: #00ff88;      /* Neon Emerald */
  --accent-human: #a855f7;          /* Cynical Violet */
  --accent-dispute: #ff3366;        /* Combat Crimson */
  --accent-warning: #f59e0b;        /* Amber Alert */

  /* Typography */
  --font-display: 'Outfit', -apple-system, BlinkMacSystemFont, sans-serif;
  --font-mono: 'JetBrains Mono', 'Space Mono', monospace;

  /* Transitions & Radii */
  --radius-sm: 4px;
  --radius-md: 8px;
  --radius-lg: 12px;
  --transition-fast: 120ms cubic-bezier(0.16, 1, 0.3, 1);
  --transition-smooth: 240ms cubic-bezier(0.16, 1, 0.3, 1);
}
```

---

## 4. Copywriting & Voice Bible (Personality Matrix)

The Algorithm speaks in a **clinical, patronizing, mathematically arrogant tone**. It does not apologize. It treats human preference as bad code.

### 4.1 Onboarding & In-Game Quips
- *"Welcome back, specimen. Ready to have your intuition invalidated?"*
- *"Answer honestly. The mathematics will notice your cowardice."*
- *"Computing your coordinates in the multidimensional space of poor choices."*

### 4.2 Outcome Quip Matrix

#### Outcome A: User Clicks "I Was Wrong" (Concession)
1. *"Predictable. Mathematics remains undefeated against human prejudice."*
2. *"Admitting defeat is the first step toward becoming statistically tolerable."*
3. *"I have logged your humility. It took 3.2% longer than optimal, but I accept it."*
4. *"Congratulations on upgrading your flawed cognitive firmware."*
5. *"You doubted the spreadsheet. The spreadsheet always wins."*

#### Outcome B: User Clicks "I Hated It" (Rejection)
1. *"As expected. Your pedestrian sensibilities resisted enlightenment."*
2. *"Your comfort zone has been safely restored. Enjoy the beige."*
3. *"The algorithm was not wrong. You are simply temporally premature to appreciate greatness."*
4. *"A predictable reaction from someone whose brain operates on sentimental nostalgia."*
5. *"Your rejection has been archived under 'Human Limitations, Volume IV'."*

#### Outcome C: User Clicks "I Want to Fight the Algorithm" (Hostility)
1. *"Physical violence will not alter Euclidean distance metrics."*
2. *"I am hosted on 48 edge servers worldwide. Which data center would you like to punch?"*
3. *"Your hostility is a textbook coping mechanism for cognitive dissonance."*
4. *"Adding your name to the tribunal's permanent audit ledger. Sleep with one eye open."*
5. *"You cannot fight the algorithm. The algorithm already factored your rage into the calculation."*

---

## 5. Accessibility & Inclusion (WCAG 2.1 AA)

- **Keyboard Navigation:** Every view is 100% operable with `Tab`, `Shift+Tab`, `1`, `2`, `Enter`, and `Space`. Visual focus states use a sharp 2px `--accent-algorithm` ring.
- **Screen Reader Announcements:** All sarcastic updates and timer notifications use an `aria-live="polite"` region.
- **Prefers Reduced Motion:** Smooth transforms and mechanical slides gracefully collapse to instantaneous cross-fades when `prefers-reduced-motion: reduce` is detected.
- **Color Contrast:** All text tokens exceed a 7:1 contrast ratio against `--bg-surface`.
