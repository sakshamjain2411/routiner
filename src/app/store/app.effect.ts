import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { combineLatest, firstValueFrom, forkJoin, from, of } from 'rxjs';
import { catchError, distinctUntilChanged, map, mergeMap, switchMap, withLatestFrom } from 'rxjs/operators';
import { AppActions, ChallengeActions, HabitActions, RoutineActions, RoutineTrackActions, TrackActions, UserActions } from './app.actions';
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
                this.api.getRoutines(),
                this.api.getRoutineTracks(),
            ]).pipe(
                map(([user, habits, tracks, routines, routineTracks]) => {
                    return AppActions.loadAppDataSuccess({ user:user[0], habits, tracks, routines, routineTracks });
                }),
                catchError(error => of(AppActions.loadAppDataFailure({ error })))
            ))
        )
    );

    loadChallenges$ = createEffect(() =>
        this.actions$.pipe(
            ofType(ChallengeActions.loadChallenges),
            switchMap(() => {
                return this.api.getChallenges().pipe(
                    map(challenges => {
                        return ChallengeActions.loadChallengesSuccess({ challenges });
                    }),
                    catchError(error => of(ChallengeActions.loadChallengesFailure({ error })))
                );
            })
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

    addRoutine$ = createEffect(() =>
        this.actions$.pipe(
            ofType(RoutineActions.addRoutine),
            switchMap(action => {
                return this.api.postRoutine(action.routine).pipe(
                    map(() => {
                        return RoutineActions.addRoutineSuccess();
                    }),
                    catchError(error => of(RoutineActions.addRoutineFailure({ error })))
                );
            })
        )
    );

    addRoutineTrack$ = createEffect(() =>
        this.actions$.pipe(
            ofType(RoutineTrackActions.addRoutineTrack),
            switchMap(action => {
                return this.api.postRoutineTrack(action.routineTrack).pipe(
                    map(() => {
                        return RoutineTrackActions.addRoutineTrackSuccess();
                    }),
                    catchError(error => of(RoutineTrackActions.addRoutineTrackFailure({ error })))
                );
            })
        )
    );

    addChallenge$ = createEffect(() =>
        this.actions$.pipe(
            ofType(ChallengeActions.addChallenge),
            switchMap(action => {
                return this.api.postChallenge(action.challenge).pipe(
                    map(() => {
                        return ChallengeActions.addChallengeSuccess();
                    }),
                    catchError(error => of(ChallengeActions.addChallengeFailure({ error })))
                );
            })
        )
    );

    updateRoutine$ = createEffect(() =>
        this.actions$.pipe(
            ofType(RoutineActions.updateRoutine),
            switchMap(action => {
                return this.api.patchRoutine(action.id, { updatedOn: action.updatedOn }).pipe(
                    map(() => {
                        return RoutineActions.updateRoutineSuccess();
                    }),
                    catchError(error => of(RoutineActions.updateRoutineFailure({ error })))
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

    deleteRoutine$ = createEffect(() =>
        this.actions$.pipe(
            ofType(RoutineActions.deleteRoutine),
            switchMap(action => combineLatest([
                this.api.deleteRoutine(action.routineId),
                this.api.deleteRoutineTracks(action.routineId)
            ]).pipe(
                map(() => {
                    return RoutineActions.deleteRoutineSuccess();
                }),
                catchError(error => of(RoutineActions.deleteRoutineFailure({ error })))
            ))
        )
    );

    deleteRoutineTrack$ = createEffect(() =>
        this.actions$.pipe(
            ofType(RoutineTrackActions.deleteRoutineTrack),
            switchMap(action => {
                return this.api.deleteRoutineTrack(action.routineTrackId).pipe(
                    map(() => {
                        return RoutineTrackActions.deleteRoutineTrackSuccess();
                    }),
                    catchError(error => of(RoutineTrackActions.deleteRoutineTrackFailure({ error })))
                );
            })
        )
    );

}
