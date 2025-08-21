import { Component, Input, OnInit } from '@angular/core';
import { SwipeToActionDirective } from '../../../directives/swipe-to-action.directive';
import { CommonModule } from '@angular/common';
import { Habit, Routine, RoutineTrack } from '../../../interfaces/app.interfaces';
import { CommsService } from '../../../services/comms.service';
import { Store } from '@ngrx/store';
import { HabitActions, RoutineActions, RoutineTrackActions, TrackActions } from '../../../store/app.actions';
import { selectAllRoutineTrackss, selectAllTracks, selectSelectedDate } from '../../../store/app.selectors';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-swipe-to-action',
  imports: [SwipeToActionDirective, CommonModule],
  templateUrl: './swipe-to-action.component.html',
  styleUrl: './swipe-to-action.component.scss',
})
export class SwipeToActionComponent implements OnInit {

  @Input() habit:Habit = {} as Habit;
  @Input() routine:Routine = {} as Routine;
  @Input() type:string = 'Habit';
  isHabit = false;
  displacement = 0;

  ngOnInit() {
    if (this.type === 'Routine') {
      this.isHabit = false;
    } else {
      this.isHabit = true;
    }
  }

  constructor(private comms: CommsService, private store:Store) {}
  setDisplacement(value: number) {
    this.displacement = value;
  }

  onActionClick(item:Habit | Routine) {
    if(this.isHabit) {
      this.comms.quickActionHabit = item;
      this.comms.showQuickActionPopup = true;
    } else {
      const routineTrack:RoutineTrack = {
        routineId: item.id,
        date: new Date().toISOString(),
        createdOn: new Date().toISOString()
      } as RoutineTrack;
      this.store.dispatch(RoutineActions.updateRoutine({ id: item.id, updatedOn: new Date().toISOString() }));
      this.store.dispatch(RoutineTrackActions.addRoutineTrack({ routineTrack }));
    }
  }

  async onUndoClick(item:Habit | Routine) {
    if(this.isHabit) {
      const selectedDate = await firstValueFrom(this.store.select(selectSelectedDate));
      const tracks = (await firstValueFrom(this.store.select(selectAllTracks))).filter(track => track.habitId === item.id && track.date === selectedDate).sort((a, b) => new Date(b.createdOn).getTime() - new Date(a.createdOn).getTime());
      if (tracks.length > 0) {
        this.store.dispatch(TrackActions.deleteTrack({ trackId: tracks[0].id }));
      }
    } else {
      const tracks = (await firstValueFrom(this.store.select(selectAllRoutineTrackss))).filter(track => track.routineId === item.id).sort((a, b) => new Date(b.createdOn).getTime() - new Date(a.createdOn).getTime());
      if (tracks.length > 0) {
        this.store.dispatch(RoutineTrackActions.deleteRoutineTrack({ routineTrackId: tracks[0].id }));
        let updatedOn = tracks[1]?.createdOn || (item as Routine).createdOn;
        this.store.dispatch(RoutineActions.updateRoutine({ id: item.id, updatedOn }));
      }
    }
  }

  onDeleteClick(item:Habit | Routine) {
    if(this.isHabit) this.store.dispatch(HabitActions.deleteHabit({ habitId: item.id }));
     else this.store.dispatch(RoutineActions.deleteRoutine({ routineId: item.id }));
  }
}

