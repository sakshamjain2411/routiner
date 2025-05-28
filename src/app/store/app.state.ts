import { AppState, User } from "../interfaces/app.interfaces";

export const initialState: AppState = {
    user: {} as User,
    habits: [],
    tracks: [],
}