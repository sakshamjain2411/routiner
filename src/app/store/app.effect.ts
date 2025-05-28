import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { combineLatest, firstValueFrom, forkJoin, from, of } from 'rxjs';
import { catchError, distinctUntilChanged, map, mergeMap, switchMap, withLatestFrom } from 'rxjs/operators';
import { AppActions, HabitActions, TrackActions } from './app.actions';
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

}
