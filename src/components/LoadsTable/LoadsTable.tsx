import { useMemo } from 'react';
import type { ConcentratedLoad, LoadCaseLabel, LoadField } from '../../types/types';
import { LOAD_FIELDS, INPUT_STEP } from '../../types/constants';
import './loadsTable.scss';

interface LoadsTableProps {
  loads: ConcentratedLoad[];
  onLoadChange: (loadCase: LoadCaseLabel, field: LoadField, value: number) => void;
}

export function LoadsTable({ loads, onLoadChange }: LoadsTableProps) {
  const sortedLoads = useMemo(() => {
    return [...loads].sort((a, b) => a.loadCase.localeCompare(b.loadCase));
  }, [loads]);

  if (!loads || loads.length === 0) {
    return (
      <div className="loads-table">
        <h2>Concentrated Loads</h2>
        <p>Loading data...</p>
      </div>
    );
  }

  return (
    <div className="loads-table">
      <h2>Concentrated Loads</h2>
      <table>
        <thead>
          <tr>
            <th>Load Case</th>
            <th>Pz (Force)</th>
            <th>Mx (Moment X)</th>
            <th>My (Moment Y)</th>
          </tr>
        </thead>
        <tbody>
          {sortedLoads.map((load) => (
            <tr key={load.loadCase}>
              <td className="load-case-label">{load.loadCase}</td>
              {LOAD_FIELDS.map((field) => (
                <td key={field}>
                  <input
                    type="number"
                    step={INPUT_STEP}
                    value={load[field] || 0}
                    onFocus={(e) => e.target.select()}
                    onChange={(e) =>
                      onLoadChange(load.loadCase, field, parseFloat(e.target.value) || 0)
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

