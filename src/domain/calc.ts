import type { ConcentratedLoad, LoadCombination, FactoredResult } from '../types/types';

export function calcAll(
  loads: ConcentratedLoad[],
  combinations: LoadCombination[]
): FactoredResult[] {
  return combinations.map((combination) => {
    let pz = 0;
    let mx = 0;
    let my = 0;

    loads.forEach((load) => {
      const factor = combination.factors[load.loadCase] || 0;
      pz += load.pz * factor;
      mx += load.mx * factor;
      my += load.my * factor;
    });

    return {
      combinationLabel: combination.label,
      pz,
      mx,
      my,
    };
  });
}

export function calculateFactoredPz(
  loads: ConcentratedLoad[],
  combination: LoadCombination
): number {
  return loads.reduce((sum, load) => {
    const factor = combination.factors[load.loadCase] || 0;
    return sum + load.pz * factor;
  }, 0);
}

export function calculateFactoredMx(
  loads: ConcentratedLoad[],
  combination: LoadCombination
): number {
  return loads.reduce((sum, load) => {
    const factor = combination.factors[load.loadCase] || 0;
    return sum + load.mx * factor;
  }, 0);
}

export function calculateFactoredMy(
  loads: ConcentratedLoad[],
  combination: LoadCombination
): number {
  return loads.reduce((sum, load) => {
    const factor = combination.factors[load.loadCase] || 0;
    return sum + load.my * factor;
  }, 0);
}

export function calculateFactoredResults(
  loads: ConcentratedLoad[],
  combinations: LoadCombination[]
): FactoredResult[] {
  return calcAll(loads, combinations);
}
