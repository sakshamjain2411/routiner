import { createAction, props } from "@ngrx/store";
import { Track, User, Habit, Routine, RoutineTrack } from "../interfaces/app.interfaces";

export const AppActions = {
    loadAppData: createAction('[App] Load App Data'),
    loadAppDataSuccess: createAction('[App] Load App Data Success', props<{ user: User, habits: Habit[], tracks: Track[], routines: Routine[], routineTracks: RoutineTrack[] }>()),
    loadAppDataFailure: createAction('[App] Load App Data Failure', props<{ error: any }>()),

    setSelectedDate: createAction('[App] Set Selected Date', props<{ date: string }>()),
}

export const UserActions = {
    addUser: createAction('[User] Add User', props<{ user: User }>()),
    addUserSuccess: createAction('[User] Add User Success'),
    addUserFailure: createAction('[User] Add User Failure', props<{ error: any }>()),

    updateUserPushNotificationPrefrence: createAction('[User] Update Push Notification Prefrence', props<{ enablePushNotification: boolean}>()),
    updateUserPushNotificationPrefrenceSuccess: createAction('[User] Update Push Notification Prefrence Success')
}

export const HabitActions = {
    addHabit: createAction('[Habit] Add Habit', props<{ habit: Habit }>()),
    addHabitSuccess: createAction('[Habit] Add Habit Success'),
    addHabitFailure: createAction('[Habit] Add Habit Failure', props<{ error: any }>()),

    deleteHabit: createAction('[Habit] Delete Habit', props<{ habitId: string }>()),
    deleteHabitSuccess: createAction('[Habit] Delete Habit Success'),
    deleteHabitFailure: createAction('[Habit] Delete Habit Failure', props<{ error: any }>()),
}

export const TrackActions = {
    addTrack: createAction('[Track] Add Track', props<{ track: Track }>()),
    addTrackSuccess: createAction('[Track] Add Track Success'),
    addTrackFailure: createAction('[Track] Add Track Failure', props<{ error: any }>()),

    deleteTrack: createAction('[Track] Delete Track', props<{ trackId: string }>()),
    deleteTrackSuccess: createAction('[Track] Delete Track Success'),
    deleteTrackFailure: createAction('[Track] Delete Track Failure', props<{ error: any }>()),
}

export const RoutineActions = {
    addRoutine: createAction('[Routine] Add Routine', props<{ routine: Routine }>()),
    addRoutineSuccess: createAction('[Routine] Add Routine Success'),
    addRoutineFailure: createAction('[Routine] Add Routine Failure', props<{ error: any }>()),

    deleteRoutine: createAction('[Routine] Delete Routine', props<{ routineId: string }>()),
    deleteRoutineSuccess: createAction('[Routine] Delete Routine Success'),
    deleteRoutineFailure: createAction('[Routine] Delete Routine Failure', props<{ error: any }>()),

    updateRoutine: createAction('[Routine] Update Routine', props<{ id:string, updatedOn: string }>()),
    updateRoutineSuccess: createAction('[Routine] Update Routine Success'),
    updateRoutineFailure: createAction('[Routine] Update Routine Failure', props<{ error: any }>()),
}

export const RoutineTrackActions = {
    addRoutineTrack: createAction('[RoutineTrack] Add RoutineTrack', props<{ routineTrack: RoutineTrack }>()),
    addRoutineTrackSuccess: createAction('[RoutineTrack] Add RoutineTrack Success'),
    addRoutineTrackFailure: createAction('[RoutineTrack] Add RoutineTrack Failure', props<{ error: any }>()),

    deleteRoutineTrack: createAction('[RoutineTrack] Delete RoutineTrack', props<{ routineTrackId: string }>()),
    deleteRoutineTrackSuccess: createAction('[RoutineTrack] Delete RoutineTrack Success'),
    deleteRoutineTrackFailure: createAction('[RoutineTrack] Delete RoutineTrack Failure', props<{ error: any }>()),
}