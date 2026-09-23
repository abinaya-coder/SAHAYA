import type { IndicatorType } from '../types';

export interface SviConfig {
  weights: Record<IndicatorType, number>;
  bands: { max: number; label: 'LOW' | 'MODERATE' | 'HIGH' | 'CRITICAL'; color: string }[];
  disclaimer: string;
}

export const DEFAULT_SVI_CONFIG: SviConfig = {
  weights: {
    IMMEDIATE_SAFETY: 30,
    THREAT: 25,
    FEAR_DISTRESS: 15,
    URGENCY: 10,
    REPEATED_INCIDENT: 10,
    VIOLENCE: 5,
    EMOTIONAL_INTENSITY: 5,
    SOCIAL_ISOLATION: 5
  },
  bands: [
    { max: 25, label: 'LOW', color: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40' },
    { max: 50, label: 'MODERATE', color: 'bg-amber-500/20 text-amber-400 border-amber-500/40' },
    { max: 75, label: 'HIGH', color: 'bg-orange-500/20 text-orange-400 border-orange-500/40' },
    { max: 100, label: 'CRITICAL', color: 'bg-rose-500/20 text-rose-400 border-rose-500/40' }
  ],
  disclaimer: 'AI-assisted indicator — final assessment and action remain with the authorized human officer.'
};
