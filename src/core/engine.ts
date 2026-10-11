import type { TasteVector, Assignment } from '../types';

export class AntiRecommendationEngine {
  public static readonly LOWER_BOUND = 0.40;
  public static readonly UPPER_BOUND = 0.75;

  /**
   * Normalizes a 5D vector to unit Euclidean norm
   */
  public static normalize(v: TasteVector): TasteVector {
    const norm = Math.sqrt(
      v.adventurousness ** 2 +
      v.sensoryIntensity ** 2 +
      v.tradition ** 2 +
      v.cognitiveEffort ** 2 +
      v.absurdity ** 2
    ) || 1e-6;

    return {
      adventurousness: v.adventurousness / norm,
      sensoryIntensity: v.sensoryIntensity / norm,
      tradition: v.tradition / norm,
      cognitiveEffort: v.cognitiveEffort / norm,
      absurdity: v.absurdity / norm,
    };
  }

  /**
   * Calculates Normalized Cosine Distance between user profile and candidate
   * Range: 0.0 (identical tastes) to 1.0 (polar opposite)
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
   * Accumulates user taste vector from answered dilemma deltas
   */
  public static synthesizeTasteVector(deltas: TasteVector[]): TasteVector {
    if (deltas.length === 0) {
      return { adventurousness: 0, sensoryIntensity: 0, tradition: 0, cognitiveEffort: 0, absurdity: 0 };
    }

    const sum = deltas.reduce(
      (acc, d) => ({
        adventurousness: acc.adventurousness + d.adventurousness,
        sensoryIntensity: acc.sensoryIntensity + d.sensoryIntensity,
        tradition: acc.tradition + d.tradition,
        cognitiveEffort: acc.cognitiveEffort + d.cognitiveEffort,
        absurdity: acc.absurdity + d.absurdity,
      }),
      { adventurousness: 0, sensoryIntensity: 0, tradition: 0, cognitiveEffort: 0, absurdity: 0 }
    );

    return this.normalize(sum);
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
   * Hashes a string into a 32-bit integer for PRNG seeding
   */
  public static hashString(str: string): number {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i);
      hash = (hash << 5) - hash + char;
      hash |= 0;
    }
    return Math.abs(hash);
  }

  /**
   * Filters candidates into the Uncomfortable Middle Band (0.40 to 0.75 distance)
   * and picks deterministically based on seed and category history
   */
  public static selectAntiRecommendation(
    userProfile: TasteVector,
    pool: Assignment[],
    lastCategory: string | null,
    seedStr: string
  ): { assignment: Assignment; distance: number; matchPercentageDisplay: string } {
    // 1. Calculate distance for all candidates
    const scored = pool.map(item => ({
      item,
      distance: this.calculateDistance(userProfile, item.vector),
    }));

    // 2. Filter for uncomfortable middle band & avoid category repetition
    let eligible = scored.filter(
      s =>
        s.distance >= this.LOWER_BOUND &&
        s.distance <= this.UPPER_BOUND &&
        s.item.category !== lastCategory
    );

    // Fallback A: Relax category cooldown if band is empty
    if (eligible.length === 0) {
      eligible = scored.filter(
        s => s.distance >= this.LOWER_BOUND && s.distance <= this.UPPER_BOUND
      );
    }

    // Fallback B: If band is somehow completely empty, pick closest to sweet-spot midpoint (0.55)
    if (eligible.length === 0) {
      scored.sort((a, b) => Math.abs(a.distance - 0.55) - Math.abs(b.distance - 0.55));
      eligible = [scored[0]];
    }

    // 3. Deterministic selection using seeded PRNG
    const rng = this.mulberry32(this.hashString(seedStr));
    const selectedIdx = Math.floor(rng() * eligible.length);
    const chosen = eligible[selectedIdx];

    // Sarcastic "Match Score" formula (inverted scale):
    // e.g. Distance of 0.62 generates a fake "3.8% Optimal Match"
    const fakeMatchNum = ((1 - chosen.distance) * 8.2 + 0.9).toFixed(1);

    return {
      assignment: chosen.item,
      distance: chosen.distance,
      matchPercentageDisplay: `${fakeMatchNum}%`,
    };
  }

  /**
   * Updates taste vector post-verdict (learning loop)
   */
  public static perturbVectorOnVerdict(
    current: TasteVector,
    taskVector: TasteVector,
    verdict: 'WAS_WRONG' | 'HATED_IT' | 'FIGHT'
  ): TasteVector {
    if (verdict === 'FIGHT') {
      return current; // Unchanged; user is in active defiance
    }

    if (verdict === 'WAS_WRONG') {
      // User liked it: pull vector toward task (learning rate alpha = 0.20)
      const alpha = 0.20;
      return this.normalize({
        adventurousness: current.adventurousness + alpha * (taskVector.adventurousness - current.adventurousness),
        sensoryIntensity: current.sensoryIntensity + alpha * (taskVector.sensoryIntensity - current.sensoryIntensity),
        tradition: current.tradition + alpha * (taskVector.tradition - current.tradition),
        cognitiveEffort: current.cognitiveEffort + alpha * (taskVector.cognitiveEffort - current.cognitiveEffort),
        absurdity: current.absurdity + alpha * (taskVector.absurdity - current.absurdity),
      });
    }

    // HATED_IT: User rejected it; gently contract away from task vector (beta = 0.08)
    const beta = 0.08;
    return this.normalize({
      adventurousness: current.adventurousness - beta * taskVector.adventurousness,
      sensoryIntensity: current.sensoryIntensity - beta * taskVector.sensoryIntensity,
      tradition: current.tradition - beta * taskVector.tradition,
      cognitiveEffort: current.cognitiveEffort - beta * taskVector.cognitiveEffort,
      absurdity: current.absurdity - beta * taskVector.absurdity,
    });
  }
}
