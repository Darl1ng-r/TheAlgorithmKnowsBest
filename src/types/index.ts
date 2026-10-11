export interface TasteVector {
  adventurousness: number;  // [-1.0, 1.0]: Routine-seeking vs Novelty-seeking
  sensoryIntensity: number; // [-1.0, 1.0]: Mild/Bland vs Maximum Stimulus
  tradition: number;        // [-1.0, 1.0]: Classical/Predictable vs Counter-culture/Niche
  cognitiveEffort: number;  // [-1.0, 1.0]: Passive consumption vs Focus-intensive
  absurdity: number;        // [-1.0, 1.0]: Utilitarian vs Dadaist/Nonsensical
}

export type Category = 'music' | 'food' | 'tiny_behavior' | 'literature' | 'digital';

export interface DilemmaOption {
  id: 'A' | 'B';
  label: string;
  tagline: string;
  vectorDelta: TasteVector;
}

export interface DilemmaQuestion {
  id: string;
  category: Category;
  prompt: string;
  optionA: DilemmaOption;
  optionB: DilemmaOption;
}

export interface PersonalityReactions {
  onUserAdmittedWrong: string[];
  onUserHatedIt: string[];
  onUserWantsToFight: string[];
}

export interface Assignment {
  id: string;
  title: string;
  category: Category;
  categoryDisplay: string;
  instruction: string;
  durationSeconds: number;
  isSoloSafe: boolean;
  vector: TasteVector;
  reactions: PersonalityReactions;
  simulatedAudio?: {
    artist: string;
    track: string;
    bpm: number;
    genre: string;
  };
  checklist?: string[];
}

export type VerdictType = 'WAS_WRONG' | 'HATED_IT' | 'FIGHT';

export interface TallyRecord {
  algorithmRight: number;
  userRight: number;
  disputed: number;
  streakDays: number;
  lastPlayedDate: string | null; // YYYY-MM-DD
}

export interface GlobalScore {
  algoRight: number;
  userRight: number;
  disputed: number;
}

export interface VerdictTokenClaim {
  token: string;
  nonce: string;
  assignmentId: string;
  issuedAt: number;
  expiresAt: number;
}

export type GamePhase =
  | 'HERO'
  | 'DILEMMAS'
  | 'CALCULATING'
  | 'ASSIGNMENT'
  | 'EXECUTION'
  | 'VERDICT'
  | 'RETORT';
