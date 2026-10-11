import type { TallyRecord, GlobalScore, TasteVector, VerdictType } from '../types';

const STORAGE_KEYS = {
  LOCAL_TALLY: 'the_algo_local_tally',
  GLOBAL_SCORE: 'the_algo_global_score',
  TASTE_VECTOR: 'the_algo_taste_vector',
  LAST_CATEGORY: 'the_algo_last_category',
};

const DEFAULT_GLOBAL: GlobalScore = {
  algoRight: 142391,
  userRight: 12402,
  disputed: 9114,
};

const DEFAULT_TALLY: TallyRecord = {
  algorithmRight: 0,
  userRight: 0,
  disputed: 0,
  streakDays: 0,
  lastPlayedDate: null,
};

export class SessionStore {
  public static getTodayUTCString(): string {
    const d = new Date();
    return d.toISOString().split('T')[0];
  }

  public static getLocalTally(): TallyRecord {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.LOCAL_TALLY);
      if (!data) return { ...DEFAULT_TALLY };
      return JSON.parse(data);
    } catch {
      return { ...DEFAULT_TALLY };
    }
  }

  public static getGlobalScore(): GlobalScore {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.GLOBAL_SCORE);
      if (!data) return { ...DEFAULT_GLOBAL };
      return JSON.parse(data);
    } catch {
      return { ...DEFAULT_GLOBAL };
    }
  }

  public static getPersistedTasteVector(): TasteVector {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.TASTE_VECTOR);
      if (!data) {
        return { adventurousness: 0, sensoryIntensity: 0, tradition: 0, cognitiveEffort: 0, absurdity: 0 };
      }
      return JSON.parse(data);
    } catch {
      return { adventurousness: 0, sensoryIntensity: 0, tradition: 0, cognitiveEffort: 0, absurdity: 0 };
    }
  }

  public static getLastCategory(): string | null {
    return localStorage.getItem(STORAGE_KEYS.LAST_CATEGORY);
  }

  public static isTodayCompleted(): boolean {
    const tally = this.getLocalTally();
    return tally.lastPlayedDate === this.getTodayUTCString();
  }

  /**
   * Commits verdict outcome to both local tally and simulated global scoreboard
   */
  public static recordVerdict(
    verdict: VerdictType,
    category: string,
    updatedTasteVector: TasteVector
  ): { local: TallyRecord; global: GlobalScore } {
    const today = this.getTodayUTCString();
    const local = this.getLocalTally();
    const global = this.getGlobalScore();

    // 1. Update streak
    if (local.lastPlayedDate) {
      const last = new Date(local.lastPlayedDate);
      const curr = new Date(today);
      const diffDays = Math.round((curr.getTime() - last.getTime()) / (1000 * 3600 * 24));

      if (diffDays === 1) {
        local.streakDays += 1;
      } else if (diffDays > 1) {
        local.streakDays = 1;
      }
    } else {
      local.streakDays = 1;
    }

    local.lastPlayedDate = today;

    // 2. Increment tallies
    if (verdict === 'WAS_WRONG') {
      local.algorithmRight += 1;
      global.algoRight += 1;
    } else if (verdict === 'HATED_IT') {
      local.userRight += 1;
      global.userRight += 1;
    } else if (verdict === 'FIGHT') {
      local.disputed += 1;
      global.disputed += 1;
    }

    // 3. Persist
    localStorage.setItem(STORAGE_KEYS.LOCAL_TALLY, JSON.stringify(local));
    localStorage.setItem(STORAGE_KEYS.GLOBAL_SCORE, JSON.stringify(global));
    localStorage.setItem(STORAGE_KEYS.TASTE_VECTOR, JSON.stringify(updatedTasteVector));
    localStorage.setItem(STORAGE_KEYS.LAST_CATEGORY, category);

    return { local, global };
  }

  /**
   * Resets today's completion for replay/testing demonstration
   */
  public static resetTodayForTesting(): void {
    const local = this.getLocalTally();
    local.lastPlayedDate = null;
    localStorage.setItem(STORAGE_KEYS.LOCAL_TALLY, JSON.stringify(local));
  }
}
