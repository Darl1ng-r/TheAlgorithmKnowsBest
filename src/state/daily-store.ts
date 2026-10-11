import type {
  TasteVector,
  DilemmaOption,
  Assignment,
  VerdictType,
  Category,
} from '../types';

export type { VerdictType };
import { DILEMMA_POOL, ASSIGNMENT_POOL } from '../core/seed-data';
import { AntiRecommendationEngine } from '../core/engine';
import { PersonalityEngine } from '../core/personality';

export type Stage = 'diagnose' | 'computing' | 'prescription' | 'ruled';

export interface HistoryEntry {
  id: string;
  date: string;
  assignmentId: string;
  title: string;
  category: Category;
  categoryDisplay: string;
  distance: number;
  verdict: VerdictType;
  retort: string;
  isPractice: boolean;
}

export interface DailyState {
  stage: Stage;
  currentDilemmaIndex: number;
  selectedChoices: Array<{
    questionId: string;
    choice: DilemmaOption;
  }>;
  activeAssignment: Assignment | null;
  distanceScore: number;
  reasoningNotes: string[];
  timerEndsAt: number | null; // epoch ms if timer running
  timerDurationSeconds: number;
  verdict: VerdictType | null;
  retort: string | null;
  isPracticeRound: boolean;
}

export interface UserRecord {
  algoWins: number;
  humanWins: number;
  disputed: number;
  streakDays: number;
  lastRankedDate: string | null; // YYYY-MM-DD
  tasteProfile: TasteVector;
  history: HistoryEntry[];
}

const STORAGE_KEYS = {
  DAILY_STATE: 'the_algo_daily_state_v2',
  USER_RECORD: 'the_algo_user_record_v2',
  THEME: 'the_algo_theme',
};

const INITIAL_PROFILE: TasteVector = {
  adventurousness: 0,
  sensoryIntensity: 0,
  tradition: 0,
  cognitiveEffort: 0,
  absurdity: 0,
};

const INITIAL_RECORD: UserRecord = {
  algoWins: 0,
  humanWins: 0,
  disputed: 0,
  streakDays: 0,
  lastRankedDate: null,
  tasteProfile: INITIAL_PROFILE,
  history: [],
};

export class DailyStore {
  public static getTodayUTCString(): string {
    return new Date().toISOString().split('T')[0];
  }

  /**
   * Selects 5 deterministic questions for the given date seed
   */
  public static getDailyQuestions(dateSeed: string) {
    const hash = AntiRecommendationEngine.hashString(dateSeed);
    const rng = AntiRecommendationEngine.mulberry32(hash);

    // Shuffle pool copies deterministically
    const poolCopy = [...DILEMMA_POOL];
    for (let i = poolCopy.length - 1; i > 0; i--) {
      const j = Math.floor(rng() * (i + 1));
      [poolCopy[i], poolCopy[j]] = [poolCopy[j], poolCopy[i]];
    }

    return poolCopy.slice(0, 5);
  }

  /**
   * Loads persisted User Record (scores, streaks, history)
   */
  public static getUserRecord(): UserRecord {
    try {
      const raw = localStorage.getItem(STORAGE_KEYS.USER_RECORD);
      if (!raw) return { ...INITIAL_RECORD };
      const parsed = JSON.parse(raw);
      return {
        ...INITIAL_RECORD,
        ...parsed,
        tasteProfile: { ...INITIAL_PROFILE, ...(parsed.tasteProfile || {}) },
        history: Array.isArray(parsed.history) ? parsed.history : [],
      };
    } catch {
      return { ...INITIAL_RECORD };
    }
  }

  public static saveUserRecord(record: UserRecord): void {
    try {
      localStorage.setItem(STORAGE_KEYS.USER_RECORD, JSON.stringify(record));
    } catch (e) {
      console.warn('Storage unavailable:', e);
    }
  }

  /**
   * Loads current daily session state, or initializes a clean one
   */
  public static getDailyState(): DailyState {
    const today = this.getTodayUTCString();
    const record = this.getUserRecord();
    const isTodayAlreadyRanked = record.lastRankedDate === today;

    const defaultState: DailyState = {
      stage: isTodayAlreadyRanked ? 'ruled' : 'diagnose',
      currentDilemmaIndex: 0,
      selectedChoices: [],
      activeAssignment: null,
      distanceScore: 0.55,
      reasoningNotes: [],
      timerEndsAt: null,
      timerDurationSeconds: 180,
      verdict: null,
      retort: null,
      isPracticeRound: false,
    };

    try {
      const raw = localStorage.getItem(STORAGE_KEYS.DAILY_STATE);
      if (!raw) {
        // If today is completed, load last ruling from history if available
        if (isTodayAlreadyRanked && record.history.length > 0) {
          const lastEntry = record.history[record.history.length - 1];
          const assignment = ASSIGNMENT_POOL.find(a => a.id === lastEntry.assignmentId) || ASSIGNMENT_POOL[0];
          return {
            ...defaultState,
            stage: 'ruled',
            activeAssignment: assignment,
            distanceScore: lastEntry.distance,
            verdict: lastEntry.verdict,
            retort: lastEntry.retort,
          };
        }
        return defaultState;
      }

      const parsed = JSON.parse(raw);
      // Check date validity
      if (parsed.date !== today && !parsed.isPracticeRound) {
        return defaultState;
      }

      return {
        ...defaultState,
        ...parsed.state,
      };
    } catch {
      return defaultState;
    }
  }

  public static saveDailyState(state: DailyState): void {
    try {
      const payload = {
        date: this.getTodayUTCString(),
        state,
      };
      localStorage.setItem(STORAGE_KEYS.DAILY_STATE, JSON.stringify(payload));
    } catch (e) {
      console.warn('Storage unavailable:', e);
    }
  }

  /**
   * Computes mathematical reasoning notes based on user choices
   */
  public static generateReasoning(choices: Array<{ questionId: string; choice: DilemmaOption }>): string[] {
    const notes: string[] = [];
    if (choices.length > 0) {
      notes.push(`You selected "${choices[0].choice.label}" over its antithesis.`);
    }
    if (choices.length > 2) {
      notes.push(`Choice #${choices[2].choice.id} amplified your statistical aesthetic bias.`);
    }
    notes.push('Calculated friction coordinates in middle band (0.40 – 0.75 distance).');
    return notes;
  }

  /**
   * Commits ruling with optimistic UI updates, streak protection, and taste perturbation
   */
  public static commitRuling(
    verdict: VerdictType,
    state: DailyState,
    record: UserRecord
  ): { updatedState: DailyState; updatedRecord: UserRecord } {
    if (!state.activeAssignment) {
      return { updatedState: state, updatedRecord: record };
    }

    const today = this.getTodayUTCString();
    const isRanked = !state.isPracticeRound;

    // 1. Synthesize retort
    const retort = PersonalityEngine.getReaction(
      verdict,
      state.activeAssignment.reactions
    );

    // 2. Clone record
    const newRecord: UserRecord = {
      ...record,
      history: [...record.history],
      tasteProfile: AntiRecommendationEngine.perturbVectorOnVerdict(
        record.tasteProfile,
        state.activeAssignment.vector,
        verdict
      ),
    };

    // 3. Update scores only if ranked
    if (isRanked) {
      if (verdict === 'WAS_WRONG') {
        newRecord.algoWins += 1;
      } else if (verdict === 'HATED_IT') {
        newRecord.humanWins += 1;
      } else if (verdict === 'FIGHT') {
        newRecord.disputed += 1;
      }

      // Calculate streak
      if (record.lastRankedDate) {
        const last = new Date(record.lastRankedDate);
        const curr = new Date(today);
        const diffDays = Math.round((curr.getTime() - last.getTime()) / (1000 * 3600 * 24));
        if (diffDays === 1) {
          newRecord.streakDays += 1;
        } else if (diffDays > 1) {
          newRecord.streakDays = 1;
        }
      } else {
        newRecord.streakDays = 1;
      }

      newRecord.lastRankedDate = today;
    }

    // 4. Append to history ledger
    const historyEntry: HistoryEntry = {
      id: crypto.randomUUID(),
      date: today,
      assignmentId: state.activeAssignment.id,
      title: state.activeAssignment.title,
      category: state.activeAssignment.category,
      categoryDisplay: state.activeAssignment.categoryDisplay,
      distance: state.distanceScore,
      verdict,
      retort,
      isPractice: !isRanked,
    };
    newRecord.history.push(historyEntry);

    // 5. Update state
    const newState: DailyState = {
      ...state,
      stage: 'ruled',
      verdict,
      retort,
      timerEndsAt: null,
    };

    this.saveUserRecord(newRecord);
    this.saveDailyState(newState);

    return { updatedState: newState, updatedRecord: newRecord };
  }

  /**
   * Starts an unranked practice round without erasing streak or daily record
   */
  public static startUnrankedRound(): DailyState {
    const practiceState: DailyState = {
      stage: 'diagnose',
      currentDilemmaIndex: 0,
      selectedChoices: [],
      activeAssignment: null,
      distanceScore: 0.55,
      reasoningNotes: [],
      timerEndsAt: null,
      timerDurationSeconds: 180,
      verdict: null,
      retort: null,
      isPracticeRound: true,
    };
    this.saveDailyState(practiceState);
    return practiceState;
  }

  /**
   * Resets all history and scores (with explicit user confirmation)
   */
  public static clearAllData(): { clearedState: DailyState; clearedRecord: UserRecord } {
    localStorage.removeItem(STORAGE_KEYS.DAILY_STATE);
    localStorage.removeItem(STORAGE_KEYS.USER_RECORD);
    const clearedRecord = { ...INITIAL_RECORD };
    const clearedState: DailyState = {
      stage: 'diagnose',
      currentDilemmaIndex: 0,
      selectedChoices: [],
      activeAssignment: null,
      distanceScore: 0.55,
      reasoningNotes: [],
      timerEndsAt: null,
      timerDurationSeconds: 180,
      verdict: null,
      retort: null,
      isPracticeRound: false,
    };
    return { clearedState, clearedRecord };
  }
}
