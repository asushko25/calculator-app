import { describe, it, expect } from 'vitest';
import { calcAll } from './calc';
import type { ConcentratedLoad, LoadCombination } from '../types/types';

describe('Factored Loads and Moments Calculation', () => {
  it('should calculate U1 combination correctly: -120 / 219 / 308', () => {
    const loads: ConcentratedLoad[] = [
      { loadCase: 'A', pz: 0, mx: 0, my: 0 },
      { loadCase: 'B', pz: -100, mx: 20, my: 40 },
      { loadCase: 'C', pz: 0, mx: 150, my: 200 },
      { loadCase: 'D', pz: 0, mx: 0, my: 0 },
    ];

    const combinations: LoadCombination[] = [
      {
        label: 'U1',
        factors: { A: 1.1, B: 1.2, C: 1.3, D: 1.4 },
      },
    ];

    const results = calcAll(loads, combinations);

    expect(results[0]).toEqual({
      combinationLabel: 'U1',
      pz: -120,
      mx: 219,
      my: 308,
    });
  });

  it('should return 0 when all values are zero', () => {
    const zeroLoads: ConcentratedLoad[] = [
      { loadCase: 'A', pz: 0, mx: 0, my: 0 },
      { loadCase: 'B', pz: 0, mx: 0, my: 0 },
      { loadCase: 'C', pz: 0, mx: 0, my: 0 },
      { loadCase: 'D', pz: 0, mx: 0, my: 0 },
    ];

    const combinations: LoadCombination[] = [
      {
        label: 'U1',
        factors: { A: 1.1, B: 1.2, C: 1.3, D: 1.4 },
      },
    ];

    const results = calcAll(zeroLoads, combinations);

    expect(results[0]).toEqual({
      combinationLabel: 'U1',
      pz: 0,
      mx: 0,
      my: 0,
    });
  });
});
