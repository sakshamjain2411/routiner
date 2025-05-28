import { createReducer, on } from "@ngrx/store";
import { AppActions, HabitActions } from "./app.actions";
import { initialState } from "./app.state";

const _appReducer = createReducer(
    initialState,
    on(AppActions.loadAppDataSuccess, (state, { user, habits, tracks }) => ({
        ...state,
        user: {...user},
        habits: [...habits],
        tracks: [...tracks],
    }))
);

export function appReducer(state: any, action: any) {
    return _appReducer(state, action);
}
