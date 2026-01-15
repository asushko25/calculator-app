import type { FactoredResult } from '../../types/types';
import './resultsTable.scss';

interface ResultsTableProps {
  results: FactoredResult[];
}

export function ResultsTable({ results }: ResultsTableProps) {
  if (results.length === 0) {
    return (
      <div className="results-table">
        <h2>Factored Loads and Moments</h2>
        <p className="no-results">No results to display. Please define loads and combinations.</p>
      </div>
    );
  }

  return (
    <div className="results-table">
      <h2>Factored Loads and Moments</h2>
      <table>
        <thead>
          <tr>
            <th>Combination</th>
            <th>Pz</th>
            <th>Mx</th>
            <th>My</th>
          </tr>
        </thead>
        <tbody>
          {results.map((result) => (
            <tr key={result.combinationLabel}>
              <td className="combination-label">{result.combinationLabel}</td>
              <td className="result-value">{result.pz.toFixed(2)}</td>
              <td className="result-value">{result.mx.toFixed(2)}</td>
              <td className="result-value">{result.my.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

