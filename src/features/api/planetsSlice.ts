import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Planet } from '../../types';

interface PlanetsState {
  planets: Planet[];
  selectedPlanet: Planet | null;
  next: string | null;
  prev: string | null;
}

const initialState: PlanetsState = {
  planets: [],
  selectedPlanet: null,
  next: null,
  prev: null,
};

const planetsSlice = createSlice({
  name: 'planets',
  initialState,
  reducers: {
    setPlanets: (state, action: PayloadAction<Planet[]>) => {
      state.planets = action.payload;
    },
    setPagination(
      state,
      action: PayloadAction<{ next: string | null; prev: string | null }>
    ) {
      state.next = action.payload.next;
      state.prev = action.payload.prev;
    },
    setSelectedPlanet: (state, action: PayloadAction<Planet>) => {
      state.selectedPlanet = action.payload;
    },
  },
});

export const { setPlanets, setPagination, setSelectedPlanet } =
  planetsSlice.actions;
export default planetsSlice.reducer;
