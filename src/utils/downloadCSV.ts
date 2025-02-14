import { Planet } from '../types';

export const downloadCSV = (checkedPlanets: Planet[]) => {
  const headers: (keyof Planet)[] = [
    'name',
    'terrain',
    'climate',
    'population',
    'diameter',
    'gravity',
    'orbital_period',
  ];

  const csvRows = [
    headers.join(';'),
    ...checkedPlanets.map(planet =>
      headers.map(header => planet[header]).join(';')
    ),
  ];

  const csvContent = csvRows.join('\n');
  const blob = new Blob([csvContent], { type: 'text/csv' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `${checkedPlanets.length}_planets.csv`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
};
