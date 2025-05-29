import { Component, Input } from '@angular/core';
import { SwipeToActionDirective } from '../../../directives/swipe-to-action.directive';
import { CommonModule } from '@angular/common';
import { Habit } from '../../../interfaces/app.interfaces';
import { CommsService } from '../../../services/comms.service';
import { Store } from '@ngrx/store';
import { HabitActions, TrackActions } from '../../../store/app.actions';
import { selectAllTracks, selectSelectedDate } from '../../../store/app.selectors';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-swipe-to-action',
  imports: [SwipeToActionDirective, CommonModule],
  templateUrl: './swipe-to-action.component.html',
  styleUrl: './swipe-to-action.component.scss',
})
export class SwipeToActionComponent {

  @Input() habit: Habit = {} as Habit;
  displacement = 0;

  constructor(private comms: CommsService, private store:Store) {}
  setDisplacement(value: number) {
    this.displacement = value;
  }

  onActionClick(habit:Habit) {
    this.comms.quickActionHabit = habit;
    this.comms.showQuickActionPopup = true;
  }

  async onUndoClick(habit:Habit) {
    const selectedDate = await firstValueFrom(this.store.select(selectSelectedDate));
    const tracks = (await firstValueFrom(this.store.select(selectAllTracks))).filter(track => track.habitId === habit.id && track.date === selectedDate).sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    if (tracks.length > 0) {
      this.store.dispatch(TrackActions.deleteTrack({ trackId: tracks[0].id }));
    }
  }

  onDeleteClick(habit:Habit) {
    this.store.dispatch(HabitActions.deleteHabit({ habitId: habit.id }));
  }
}

