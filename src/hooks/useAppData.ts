import { useState, useEffect } from 'react';
import type { ConcentratedLoad, LoadCombination } from '../types/types';
import { loadData, saveData, createDefaultData } from '../domain/storage';

export function useAppData() {
  const initialData = loadData();
  const defaultData = createDefaultData();
  
  const [loads, setLoads] = useState<ConcentratedLoad[]>(
    initialData.loads.length > 0 ? initialData.loads : defaultData.loads
  );
  const [combinations, setCombinations] = useState<LoadCombination[]>(
    initialData.combinations.length > 0 ? initialData.combinations : defaultData.combinations
  );

  useEffect(() => {
    const defaultData = createDefaultData();
    if (loads.length === 0) {
      setLoads(defaultData.loads);
    }
    if (combinations.length === 0) {
      setCombinations(defaultData.combinations);
    }
  }, []);

  useEffect(() => {
    if (loads.length > 0 && combinations.length > 0) {
      saveData({ loads, combinations });
    }
  }, [loads, combinations]);

  useEffect(() => {
    const handleBeforeUnload = () => {
      saveData({ loads, combinations });
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
      saveData({ loads, combinations });
    };
  }, [loads, combinations]);

  return {
    loads,
    setLoads,
    combinations,
    setCombinations,
  };
}

