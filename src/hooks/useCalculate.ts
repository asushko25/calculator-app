import { useState } from 'react';
import type { FactoredResult } from '../types/types';

export function useCalculate() {
  const [results, setResults] = useState<FactoredResult[]>([]);
  const [isCalculated, setIsCalculated] = useState(false);

  return {
    results,
    setResults,
    isCalculated,
    setIsCalculated,
  };
}

