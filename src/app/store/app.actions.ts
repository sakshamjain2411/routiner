import { createAction, props } from "@ngrx/store";
import { Track, User, Habit } from "../interfaces/app.interfaces";

export const AppActions = {
    loadAppData: createAction('[App] Load App Data'),
    loadAppDataSuccess: createAction('[App] Load App Data Success', props<{ user: User, habits: Habit[], tracks: Track[] }>()),
    loadAppDataFailure: createAction('[App] Load App Data Failure', props<{ error: any }>()),
}

export const HabitActions = {
    addHabit: createAction('[Habit] Add Habit', props<{ habit: any }>()),
    addHabitSuccess: createAction('[Habit] Add Habit Success'),
    addHabitFailure: createAction('[Habit] Add Habit Failure', props<{ error: any }>()),
}

export const TrackActions = {
    addTrack: createAction('[Track] Add Track', props<{ track: Track }>()),
    addTrackSuccess: createAction('[Track] Add Track Success'),
    addTrackFailure: createAction('[Track] Add Track Failure', props<{ error: any }>()),
}