import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Planet } from '../../types';

interface PlanetsState {
  planets: Planet[];
  isLoading: boolean;
  selectedPlanet: Planet | null;
  checkedPlanets: Planet[];
  next: string | null;
  prev: string | null;
}

const initialState: PlanetsState = {
  planets: [],
  isLoading: false,
  selectedPlanet: null,
  checkedPlanets: [],
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
    setLoading(state, action: PayloadAction<boolean>) {
      state.isLoading = action.payload;
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
    setCheckedPlanets: (state, action: PayloadAction<Planet[]>) => {
      state.checkedPlanets = action.payload;
    },
  },
});

export const {
  setPlanets,
  setPagination,
  setSelectedPlanet,
  setCheckedPlanets,
  setLoading,
} = planetsSlice.actions;
export default planetsSlice.reducer;
