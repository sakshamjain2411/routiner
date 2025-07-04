import { createReducer, on } from "@ngrx/store";
import { AppActions, HabitActions, UserActions } from "./app.actions";
import { initialState } from "./app.state";

const _appReducer = createReducer(
    initialState,
    on(AppActions.loadAppDataSuccess, (state, { user, habits, tracks }) => ({
        ...state,
        initialized: true,
        user: {...user},
        habits: [...habits],
        tracks: [...tracks],
    })),
    on(AppActions.setSelectedDate, (state, { date }) => ({
        ...state,
        selectedDate: date,
    })),
);

export function appReducer(state: any, action: any) {
    return _appReducer(state, action);
}
