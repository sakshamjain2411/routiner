import { Component, Input } from '@angular/core';
import { SwipeToActionDirective } from '../../directives/swipe-to-action.directive';
import { CommonModule } from '@angular/common';
import { Habit } from '../../interfaces/app.interfaces';
import { CommsService } from '../../services/comms.service';
import { Store } from '@ngrx/store';
import { HabitActions } from '../../store/app.actions';

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

  onDeleteClick(habit:Habit) {
    this.store.dispatch(HabitActions.deleteHabit({ habitId: habit.id }));
  }
}

