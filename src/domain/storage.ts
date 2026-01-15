import type { AppData, ConcentratedLoad } from '../types/types';
import {
  LOAD_CASES,
  DEFAULT_COMBINATION_LABELS,
  DEFAULT_LOAD_VALUE,
  createDefaultCombination,
} from '../types/constants';

const STORAGE_KEY = 'column-design-app-data';

export function createDefaultData(): AppData {
  const defaultLoads: ConcentratedLoad[] = LOAD_CASES.map((label) => ({
    loadCase: label,
    pz: DEFAULT_LOAD_VALUE,
    mx: DEFAULT_LOAD_VALUE,
    my: DEFAULT_LOAD_VALUE,
  }));

  const defaultCombinations = DEFAULT_COMBINATION_LABELS.map((label) =>
    createDefaultCombination(label)
  );

  return {
    loads: defaultLoads,
    combinations: defaultCombinations,
  };
}

export function loadData(): AppData {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored) as AppData;
      if (
        parsed.loads && 
        Array.isArray(parsed.loads) && 
        parsed.loads.length > 0 &&
        parsed.combinations && 
        Array.isArray(parsed.combinations) && 
        parsed.combinations.length > 0
      ) {
        return parsed;
      }
    }
  } catch (error) {
    console.error('Error loading data from localStorage:', error);
  }
  return createDefaultData();
}

export function saveData(data: AppData): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (error) {
    console.error('Error saving data to localStorage:', error);
  }
}
