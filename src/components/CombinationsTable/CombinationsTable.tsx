import { useMemo } from 'react';
import type { LoadCombination, LoadCaseLabel } from '../../types/types';
import { LOAD_CASES, INPUT_STEP } from '../../types/constants';
import './combinationsTable.scss';

interface CombinationsTableProps {
  combinations: LoadCombination[];
  onCombinationChange: (
    label: string,
    loadCase: LoadCaseLabel,
    value: number
  ) => void;
}

export function CombinationsTable({
  combinations,
  onCombinationChange,
}: CombinationsTableProps) {
  const sortedCombinations = useMemo(() => {
    return [...combinations].sort((a, b) => a.label.localeCompare(b.label));
  }, [combinations]);

  if (!combinations || combinations.length === 0) {
    return (
      <div className="combinations-table">
        <h2>Load Combinations</h2>
        <p>Loading data...</p>
      </div>
    );
  }

  return (
    <div className="combinations-table">
      <h2>Load Combinations</h2>
      <table>
        <thead>
          <tr>
            <th>Label</th>
            {LOAD_CASES.map((lc) => (
              <th key={lc}>{lc}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {sortedCombinations.map((combination) => (
            <tr key={combination.label}>
              <td className="combination-label">{combination.label}</td>
              {LOAD_CASES.map((loadCase) => (
                <td key={loadCase}>
                  <input
                    type="number"
                    step={INPUT_STEP}
                    value={combination.factors[loadCase] || 0}
                    onFocus={(e) => e.target.select()}
                    onChange={(e) =>
                      onCombinationChange(
                        combination.label,
                        loadCase,
                        parseFloat(e.target.value) || 0
                      )
                    }
                  />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

