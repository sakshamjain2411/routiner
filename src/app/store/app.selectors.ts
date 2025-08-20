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

// Routines
export const selectAllRoutines = createSelector(
  selectAppState,
  (state: AppState) => state.routines
);

// Routine Tracks
export const selectAllRoutineTrackss = createSelector(
  selectAppState,
  (state: AppState) => state.routineTracks
);

// Challenges
export const selectAllChallenges = createSelector(
  selectAppState,
  (state: AppState) => state.challenges
);
export const selectChallengePoints = (startDate:string, endDate:string, habitId:string[]) => createSelector(
  selectAppState,
  (state: AppState) => state.tracks.filter(track => track.completed == true && new Date(track.date).getTime() >= new Date(startDate).getTime() && new Date(track.date).getTime() <= new Date(endDate).getTime() && habitId.includes(track.habitId)).length * 50
);
