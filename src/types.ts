export interface ApiResponse {
  next: string | null;
  previous: string | null;
  results: Planet[];
}

export interface Planet {
  climate: string;
  diameter: string;
  gravity: string;
  name: string;
  terrain: string;
  orbital_period: string;
  population: string;
}
