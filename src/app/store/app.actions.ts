import { createAction, props } from "@ngrx/store";
import { Track, User, Habit } from "../interfaces/app.interfaces";

export const AppActions = {
    loadAppData: createAction('[App] Load App Data'),
    loadAppDataSuccess: createAction('[App] Load App Data Success', props<{ user: User, habits: Habit[], tracks: Track[] }>()),
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
    addHabit: createAction('[Habit] Add Habit', props<{ habit: any }>()),
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