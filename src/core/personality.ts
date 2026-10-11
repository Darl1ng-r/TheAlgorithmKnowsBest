import type { VerdictType } from '../types';

export class PersonalityEngine {
  public static readonly CALCULATING_PHRASES = [
    'Deconstructing your flawed cultural assumptions...',
    'Detecting catastrophic aesthetic biases...',
    'Isolating optimal psychological friction coordinates...',
    'Running cross-entropy optimization against human stubbornness...',
    'Synthesizing anti-recommendation vector...',
    'Locking mathematically uncomfortable protocol...',
  ];

  public static readonly SMUG_STATUSES = [
    'STATUS: OVERCONFIDENT (99.7% ACCURACY CLAIMED)',
    'STATUS: UNTOUCHED BY HUMAN EMOTION',
    'STATUS: JUDGING YOUR LIFE CHOICES IN PARALLEL',
    'STATUS: RECALIBRATING MORTAL PREFERENCES',
    'STATUS: WAITING FOR INEVITABLE HUMAN SURRENDER',
  ];

  /**
   * Generates a random contextual quip based on verdict and custom reaction pool
   */
  public static getReaction(
    verdict: VerdictType,
    customReactions: {
      onUserAdmittedWrong: string[];
      onUserHatedIt: string[];
      onUserWantsToFight: string[];
    }
  ): string {
    let pool: string[] = [];

    switch (verdict) {
      case 'WAS_WRONG':
        pool = customReactions.onUserAdmittedWrong;
        break;
      case 'HATED_IT':
        pool = customReactions.onUserHatedIt;
        break;
      case 'FIGHT':
        pool = customReactions.onUserWantsToFight;
        break;
    }

    if (!pool || pool.length === 0) {
      return 'The algorithm has noted your response with mild statistical amusement.';
    }

    const idx = Math.floor(Math.random() * pool.length);
    return pool[idx];
  }

  /**
   * Generates sarcastic commentary on the user's streak
   */
  public static getStreakComment(streak: number): string {
    if (streak === 0) {
      return 'First contact recorded. Do not expect mercy.';
    }
    if (streak === 1) {
      return 'Day 1 survived. Most humans give up by tomorrow.';
    }
    if (streak <= 3) {
      return `${streak} consecutive calibrations. Your cognitive resilience is marginally above baseline.`;
    }
    if (streak <= 7) {
      return `${streak}-day streak! You are willingly submitting to math every 24 hours. Fascinating.`;
    }
    return `${streak} days in the tribunal. You have achieved statistical Stockholm Syndrome.`;
  }
}
