import { AppState, User } from "../interfaces/app.interfaces";

export const initialState: AppState = {
    initialized: false,
    user: {} as User,
    selectedDate: '',
    habits: [],
    tracks: [],
    routines: [],
    routineTracks: [],
    challenges: []
}