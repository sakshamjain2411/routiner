import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { combineLatest, firstValueFrom, forkJoin, from, of } from 'rxjs';
import { catchError, distinctUntilChanged, map, mergeMap, switchMap, withLatestFrom } from 'rxjs/operators';
import { AppActions, HabitActions, TrackActions, UserActions } from './app.actions';
import { ApiService } from '../services/api.service';
import { Store } from '@ngrx/store';
import { AppState, Track, User } from '../interfaces/app.interfaces';

@Injectable()
export class AppEffects {
    constructor(private actions$: Actions, private api: ApiService, private store: Store<AppState>) { }

    loadAppData$ = createEffect(() =>
        this.actions$.pipe(
            ofType(AppActions.loadAppData),
            switchMap(() => combineLatest([
                firstValueFrom(this.api.getUser()),
                this.api.getHabits(),
                this.api.getTracks(),
            ]).pipe(
                map(([user, habits, tracks]) => {
                    return AppActions.loadAppDataSuccess({ user:user[0], habits, tracks });
                }),
                catchError(error => of(AppActions.loadAppDataFailure({ error })))
            ))
        )
    );

    addUser$ = createEffect(() =>
        this.actions$.pipe(
            ofType(UserActions.addUser),
            switchMap(action => {
                return this.api.postUser(action.user).pipe(
                    map(() => {
                        return UserActions.addUserSuccess();
                    }),
                    catchError(error => of(UserActions.addUserFailure({ error })))
                );
            })
        )
    );

    addHabit$ = createEffect(() =>
        this.actions$.pipe(
            ofType(HabitActions.addHabit),
            switchMap(action => {
                return this.api.postHabit(action.habit).pipe(
                    map(() => {
                        return HabitActions.addHabitSuccess();
                    }),
                    catchError(error => of(HabitActions.addHabitFailure({ error })))
                );
            })
        )
    );

    addTrack$ = createEffect(() =>
        this.actions$.pipe(
            ofType(TrackActions.addTrack),
            switchMap(action => {
                return this.api.postTrack(action.track).pipe(
                    map(() => {
                        return TrackActions.addTrackSuccess();
                    }),
                    catchError(error => of(TrackActions.addTrackFailure({ error })))
                );
            })
        )
    );

    deleteHabit$ = createEffect(() =>
        this.actions$.pipe(
            ofType(HabitActions.deleteHabit),
            switchMap(action => {
                return this.api.deleteHabit(action.habitId).pipe(
                    map(() => {
                        return HabitActions.deleteHabitSuccess();
                    }),
                    catchError(error => of(HabitActions.deleteHabitFailure({ error })))
                );
            })
        )
    );

    deleteTrack$ = createEffect(() =>
        this.actions$.pipe(
            ofType(TrackActions.deleteTrack),
            switchMap(action => {
                return this.api.deleteTrack(action.trackId).pipe(
                    map(() => {
                        return TrackActions.deleteTrackSuccess();
                    }),
                    catchError(error => of(TrackActions.deleteTrackFailure({ error })))
                );
            })
        )
    );

}
