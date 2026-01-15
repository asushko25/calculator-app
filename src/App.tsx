import { useCallback } from 'react';
import { LoadsTable } from './components/LoadsTable/LoadsTable';
import { CombinationsTable } from './components/CombinationsTable/CombinationsTable';
import { ResultsTable } from './components/ResultsTable/ResultsTable';
import type { LoadCaseLabel, LoadField } from './types/types';
import { useAppData } from './hooks/useAppData';
import { useKeyboard } from './hooks/useKeyboard';
import { useCalculate } from './hooks/useCalculate';
import { calcAll } from './domain/calc';
import './App.scss';

function App() {
  const { loads, setLoads, combinations, setCombinations } = useAppData();
  const { results, setResults } = useCalculate();
  
  const calculateResults = useCallback(() => {
    if (loads.length > 0 && combinations.length > 0) {
      const calculatedResults = calcAll(loads, combinations);
      setResults(calculatedResults);
    }
  }, [loads, combinations, setResults]);

  useKeyboard(() => {
    calculateResults();
  });

  const handleLoadChange = useCallback(
    (loadCase: LoadCaseLabel, field: LoadField, value: number) => {
      const updatedLoads = loads.map((load) => {
        if (load.loadCase === loadCase) {
          return { ...load, [field]: value };
        }
        return load;
      });
      setLoads(updatedLoads);
    },
    [loads, setLoads]
  );

  const handleCombinationChange = useCallback(
    (label: string, loadCase: LoadCaseLabel, value: number) => {
      const updatedCombinations = combinations.map((combination) => {
        if (combination.label === label) {
          return {
            ...combination,
            factors: { ...combination.factors, [loadCase]: value },
          };
        }
        return combination;
      });
      setCombinations(updatedCombinations);
    },
    [combinations, setCombinations]
  );

  const handleCalculate = useCallback(() => {
    calculateResults();
  }, [calculateResults]);


  return (
    <div className="app">
      <header className="app-header">
        <h1>Column Design Calculator</h1>
        <p className="app-subtitle">
          Calculate factored loads and moments for structural engineering
        </p>
      </header>

      <main className="app-main">
        <div className="app-section">
          <LoadsTable loads={loads} onLoadChange={handleLoadChange} />
        </div>

        <div className="app-section">
          <CombinationsTable
            combinations={combinations}
            onCombinationChange={handleCombinationChange}
          />
        </div>

        <div className="app-section app-actions">
          <button className="calculate-button" onClick={handleCalculate}>
            Calculate
          </button>
        </div>

        <div className="app-section">
          <ResultsTable results={results} />
        </div>
      </main>

      <footer className="app-footer">
        <p>Press F5 or click Calculate button to update results</p>
      </footer>
    </div>
  );
}

export default App;
