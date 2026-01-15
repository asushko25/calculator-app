import type { LoadCaseLabel, LoadCombination, LoadField } from './types';

export const LOAD_CASES: readonly LoadCaseLabel[] = ['A', 'B', 'C', 'D'] as const;

export const DEFAULT_COMBINATION_LABELS = ['U1', 'U2', 'U3'] as const;

export const LOAD_FIELDS: readonly LoadField[] = ['pz', 'mx', 'my'] as const;

export const DEFAULT_LOAD_VALUE = 0;

export const DEFAULT_FACTOR_VALUE = 0;

export const INPUT_STEP = 0.01;

export function createDefaultFactors(): Record<LoadCaseLabel, number> {
  return LOAD_CASES.reduce(
    (acc, label) => {
      acc[label] = DEFAULT_FACTOR_VALUE;
      return acc;
    },
    {} as Record<LoadCaseLabel, number>
  );
}

export function createDefaultCombination(label: string): LoadCombination {
  return {
    label,
    factors: createDefaultFactors(),
  };
}

