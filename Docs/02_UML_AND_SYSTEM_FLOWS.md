# UML & System Behavioral Models
**Project:** The Algorithm Knows Best  
**Document Version:** 1.0.0  
**Status:** Approved Engineering Specification  

---

## 1. Domain Class & Entity Model

The following Class Diagram specifies the core domain abstractions, value objects, and service contracts for the engine.

```mermaid
classDiagram
    direction TB

    class TasteVector {
        +Float adventurousness
        +Float organicVsSynthetic
        +Float traditionalVsModern
        +Float cognitiveEffort
        +Float sensoryIntensity
        +normalize() TasteVector
        +euclideanDistance(other: TasteVector) Float
        +cosineSimilarity(other: TasteVector) Float
    }

    class DilemmaQuestion {
        +UUID id
        +String prompt
        +String category
        +DilemmaOption optionA
        +DilemmaOption optionB
    }

    class DilemmaOption {
        +String label
        +TasteVector vectorDelta
    }

    class Assignment {
        +UUID id
        +String title
        +String instruction
        +String category
        +Int durationSeconds
        +Boolean isSoloOnly
        +TasteVector attributeVector
        +PersonalityReactionBundle reactions
    }

    class PersonalityReactionBundle {
        +List~String~ onUserAdmittedWrong
        +List~String~ onUserHatedIt
        +List~String~ onUserWantsToFight
    }

    class UserSession {
        +UUID sessionId
        +String clientFingerprint
        +TasteVector currentTasteProfile
        +List~UUID~ completedQuestionIds
        +UUID activeAssignmentId
        +String activeAssignmentHmac
        +DateTime assignmentIssuedAt
        +TallyRecord localTally
    }

    class TallyRecord {
        +Int algorithmRight
        +Int userRight
        +Int disputed
        +Int streakDays
        +DateTime lastPlayedDate
    }

    class AntiRecommendationEngine {
        +calculateProfile(answers: List~SelectedOption~) TasteVector
        +scoreAssignments(profile: TasteVector, candidates: List~Assignment~) List~ScoredAssignment~
        +filterMiddleBand(scored: List~ScoredAssignment~, lowerPct: Float, upperPct: Float) List~Assignment~
        +selectDailyAssignment(profile: TasteVector, history: List~UUID~, dateSeed: String) Assignment
    }

    class VerdictSecurityService {
        +generateVerdictToken(sessionId: UUID, assignmentId: UUID, issuedAt: DateTime) String
        +verifyVerdictToken(token: String, sessionId: UUID, assignmentId: UUID) Boolean
    }

    DilemmaQuestion "1" *-- "2" DilemmaOption : contains
    DilemmaOption --> TasteVector : mutates
    Assignment --> TasteVector : has
    Assignment --> PersonalityReactionBundle : contains
    UserSession --> TasteVector : maintains
    UserSession --> TallyRecord : maintains
    AntiRecommendationEngine ..> TasteVector : operates on
    AntiRecommendationEngine ..> Assignment : selects from
    VerdictSecurityService ..> UserSession : validates
```

---

## 2. Sequence Diagrams

### 2.1 Daily Loop: Initialization & Dilemma Fetching

```mermaid
sequenceDiagram
    autonumber
    actor User as Human Player
    participant UI as Web Client (Next.js/React)
    participant LocalStore as Browser LocalStorage
    participant Edge as Edge API Gateway
    participant Cache as Redis (Daily Question Cache)

    User->>UI: Visits Application
    UI->>LocalStore: Read `user_seed`, `last_played_utc`, `local_tally`
    alt User already completed assignment for today
        LocalStore-->>UI: Return Today's Completed State
        UI->>User: Display "Tally & Resting Algorithm" Dashboard (Next drop countdown)
    else First visit today
        UI->>Edge: GET /api/daily/questions?tzOffset=X
        Edge->>Cache: Fetch active question set for current UTC date
        Cache-->>Edge: Return 5 canonical dilemma questions
        Edge-->>UI: 200 OK [Questions JSON]
        UI->>User: Render Dilemma Card 1 of 5
    end
```

### 2.2 Recommendation Generation & Token Issuance

```mermaid
sequenceDiagram
    autonumber
    actor User as Human Player
    participant UI as Web Client
    participant Engine as Anti-Recommendation Engine
    participant Crypto as Edge Token Signer
    participant DB as Assignment Database / Store

    User->>UI: Selects 5th "This or That" dilemma option
    UI->>UI: Compute user's temporary taste vector in memory
    UI->>UI: Transition to "Computing Mathematical Tragedy..." animation
    UI->>Engine: POST /api/engine/recommend { answers, userSeed, categoryHistory }
    
    Engine->>DB: Query active assignment pool (excluding cooldown categories)
    DB-->>Engine: 30 candidate assignments with attribute vectors
    Engine->>Engine: Calculate distance metrics for all candidates
    Engine->>Engine: Discard bottom 25% (too familiar) and top 20% (extreme hate)
    Engine->>Engine: Seeded deterministic selection from 55%-80% middle band
    
    Engine->>Crypto: Sign assignment payload with secret HMAC key
    Crypto-->>Engine: Returns signed `verdict_claim_token` (valid 15 mins)
    Engine-->>UI: 200 OK { assignment, matchPercentage: "3.4%", token }
    
    UI->>User: Display smug reveal: "Based on your choices, you need this: [Assignment]"
```

### 2.3 Verdict Submission & Tamper-Proof Tally Update

```mermaid
sequenceDiagram
    autonumber
    actor User as Human Player
    participant UI as Web Client
    participant LocalStore as LocalStorage
    participant Edge as Edge API (`POST /api/verdict`)
    participant Limiter as Redis Rate Limiter
    participant DB as Postgres / Telemetry DB
    participant Cache as Redis Atomic Scoreboard

    User->>UI: Taps verdict button (e.g., "I was wrong" / "I hated it" / "I want to fight")
    UI->>Edge: POST /api/verdict { token, verdictChoice, userSeed }
    
    Edge->>Limiter: Check sliding window limit (max 5/day per IP/Fingerprint)
    alt Rate Limit Exceeded
        Limiter-->>Edge: Denied (HTTP 429)
        Edge-->>UI: 429 Too Many Requests ("The Algorithm limits human complaints")
    else Allowed
        Limiter-->>Edge: Token Granted
        Edge->>Edge: Cryptographic Verification: Verify HMAC signature & timestamp (<15m)
        alt Invalid Token or Tampered
            Edge-->>UI: 403 Forbidden ("Invalid mathematical verification")
        else Valid Token
            Edge->>Cache: Atomic HINCRBY `global_tally` (algorithm_score / human_score)
            Edge->>DB: Asynchronously log anonymized verdict record
            Edge-->>UI: 200 OK { status: "recorded", globalStats: { algo: 14209, human: 1104 } }
            UI->>LocalStore: Increment local counter & set `daily_completed_date = TODAY`
            UI->>User: Display Algorithm's Sarcastic Reaction + Update Local vs Global Counter
        end
    end
```

### 2.4 Dynamic Social Share Card Generation

```mermaid
sequenceDiagram
    autonumber
    actor User as Human Player
    participant UI as Web Client
    participant EdgeOG as Edge OG Worker (`/api/og`)
    participant Social as Social Platform Crawler (X / Discord / Bluesky)

    User->>UI: Clicks "Share Tragic Results"
    UI->>UI: Generate shareable URL `https://.../share?a=34&v=wrong&score=3-1`
    User->>Social: Pastes link in post / tweet
    Social->>EdgeOG: GET /api/og?a=34&v=wrong&score=3-1
    EdgeOG->>EdgeOG: Render SVG layout (dark brutalist card, match %, quote, stamp)
    EdgeOG->>EdgeOG: Convert SVG to PNG at 1200x630 via Satori/Resvg
    EdgeOG-->>Social: 200 OK (Content-Type: image/png, Cache-Control: public, max-age=86400)
    Social-->>User: High-resolution dynamic image preview shown in feed
```

---

## 3. State Machine Model

### 3.1 User Session State Transition Diagram

```mermaid
stateDiagram-v2
    [*] --> Idle_Uninitialized

    Idle_Uninitialized --> Checking_Daily_Status: App Loaded
    Checking_Daily_Status --> Daily_Already_Completed: Today's date matches last_played
    Checking_Daily_Status --> Presenting_Dilemmas: Date > last_played OR First Visit

    state Presenting_Dilemmas {
        [*] --> Question_1
        Question_1 --> Question_2: Select Option
        Question_2 --> Question_3: Select Option
        Question_3 --> Question_4: Select Option
        Question_4 --> Question_5: Select Option
        Question_5 --> Answers_Complete
    }

    Answers_Complete --> Computing_Anti_Recommendation: Trigger Math Engine
    Computing_Anti_Recommendation --> Displaying_Assignment: Assignment & HMAC Received

    state Displaying_Assignment {
        [*] --> Reading_Task
        Reading_Task --> Task_Timer_Running: Start 5-min timer
        Task_Timer_Running --> Task_Timer_Complete: 00:00 reached
        Task_Timer_Running --> Task_Premature_Action: User clicks early
        Task_Timer_Complete --> Ready_For_Verdict
        Task_Premature_Action --> Ready_For_Verdict
    }

    Displaying_Assignment --> Submitting_Verdict: Click Verdict ("Hated It" | "Was Wrong" | "Fight")
    Submitting_Verdict --> Processing_Security_Check: Validate HMAC Token
    
    Processing_Security_Check --> Submitting_Verdict: Retry on network glitch
    Processing_Security_Check --> Verdict_Recorded: Signature Verified & Tally Incremented

    Verdict_Recorded --> Displaying_Sarcastic_Reaction: Personality Engine Returns Quip
    Displaying_Sarcastic_Reaction --> Daily_Already_Completed: User reviews score & share options

    Daily_Already_Completed --> Presenting_Dilemmas: Next UTC Day arrives
```

---

## 4. Activity Diagram: Anti-Recommendation Pipeline

```mermaid
flowchart TD
    Start([User Completes 5 Dilemmas]) --> VectorAccum[Accumulate 5D Taste Vector:<br>V = Sum(delta_i) / 5]
    VectorAccum --> FetchCandidates[Fetch Candidate Pool from DB/Store<br>Exclude category from yesterday]
    FetchCandidates --> DistanceLoop[Calculate Cosine & Euclidean Distances<br>D = 1 - CosineSimilarity(V, TaskVector)]
    
    DistanceLoop --> SortList[Sort Candidates by Distance Ascending]
    SortList --> TierSplit[Partition into 3 Tiers:<br>Tier 1: 0% to 35% Nearest<br>Tier 2: 36% to 75% Middle Band<br>Tier 3: 76% to 100% Extreme Outliers]
    
    TierSplit --> DropTier1[Drop Tier 1: Too Familiar / Boring]
    TierSplit --> DropTier3[Drop Tier 3: Known Hatred / Non-constructive]
    
    DropTier1 & DropTier3 --> RetainMiddle[Retain Tier 2: The Uncomfortable Middle Band]
    
    RetainMiddle --> SeededSelect{Multiple options in Tier 2?}
    SeededSelect -- Yes --> HashPick[Deterministic PRNG Selection:<br>Index = PRNG(UserSeed + Date) % Tier2.length]
    SeededSelect -- No --> FallbackPick[Take Nearest Available to 55th Percentile]
    
    HashPick --> PackageAssignment[Construct Assignment Payload]
    FallbackPick --> PackageAssignment
    
    PackageAssignment --> GenerateHmac[Sign with Server Secret:<br>Token = HMAC-SHA256(Payload + Expiry)]
    GenerateHmac --> ReturnPayload([Return Assignment + Token to Client])
```

---

## 5. Architectural Quality Checks for Models

- **Pure Functions:** Vector transformations and distance math are strictly stateless and deterministic.
- **Fail-Safe Fallbacks:** If the server API fails, the client uses an embedded bundle of 30 assignments and does vector filtering entirely inside the browser's JavaScript runtime.
- **Zero Race Conditions:** Score updates use Redis atomic operations (`HINCRBY`) rather than read-modify-write patterns, eliminating data corruption under viral traffic.
