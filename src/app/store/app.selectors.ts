import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AppState } from '../interfaces/app.interfaces';

export const selectAppState = createFeatureSelector<AppState>('app');

// Initialized
export const selectInitialized = createSelector(
  selectAppState,
  (state: AppState) => state.initialized
);

// Selected Date
export const selectSelectedDate = createSelector(
  selectAppState,
  (state: AppState) => state.selectedDate
);

// User
export const selectUser = createSelector(
  selectAppState,
  (state: AppState) => state.user
);

// Habits
export const selectDailyHabits = createSelector(
  selectAppState,
  (state: AppState) => state.habits.filter(habit => habit.frequency === 'Daily')
);
export const selectWeeklyHabits = createSelector(
  selectAppState,
  (state: AppState) => state.habits.filter(habit => habit.frequency === 'Weekly')
);

// Tracks
export const selectAllTracks = createSelector(
  selectAppState,
  (state: AppState) => state.tracks
);