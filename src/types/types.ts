export type LoadCaseLabel = 'A' | 'B' | 'C' | 'D';

export type LoadField = 'pz' | 'mx' | 'my';

export interface ConcentratedLoad {
  loadCase: LoadCaseLabel;
  pz: number;
  mx: number;
  my: number;
}

export interface LoadCombination {
  label: string;
  factors: Record<LoadCaseLabel, number>;
}

export interface FactoredResult {
  combinationLabel: string;
  pz: number;
  mx: number;
  my: number;
}

export interface AppData {
  loads: ConcentratedLoad[];
  combinations: LoadCombination[];
}
