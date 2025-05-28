import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { Habit, QuickAction, Track } from '../../../interfaces/app.interfaces';
import { QuickActionDirective } from '../../../directives/quick-action.directive';
import { CommsService } from '../../../services/comms.service';
import { Store } from '@ngrx/store';
import { TrackActions } from '../../../store/app.actions';

@Component({
  selector: 'app-quick-action',
  imports: [CommonModule, QuickActionDirective],
  templateUrl: './quick-action.component.html'
})
export class QuickActionComponent implements OnInit {

  @Input() habit:Habit = {} as Habit;
  unit:string = "ml"
  quickActions: string[] = [];
  constructor(private comms:CommsService, private store:Store) { }

  ngOnInit(): void {
    this.unit = this.habit.unit || 'Ml'; // Default to 'Ml' if unit is not set
    switch (this.habit.unit) {
      case 'Ml':
        this.quickActions = ['250', '500', '750', '1000', '1250'];
        break;
      case 'Kg':
        this.quickActions = ['0.5', '1', '2', '3', '4'];
        break;
      case 'Steps':
        this.quickActions = ['1000', '2000', '3000', '4000', '5000'];
        break;
      case 'Hour':
        this.quickActions = ['1', '2', '3', '4', '5'];
        break;
      case 'Minutes':
        this.quickActions = ['5', '10', '15', '20', '30'];
        break;
      case 'Times':
        this.quickActions = ['1', '2', '3', '4', '5'];
        break;
      default:
        this.quickActions = ['250', '500', '750', '1000', '1250'];
        break;
    }
  }

  onQuickActionClick(action: string) {
    const track:Track = {
      habitId: this.habit.id,
      date: this.comms.selectedDate.dateString,
      amount: parseInt(action)
    } as Track;
    this.store.dispatch(TrackActions.addTrack({ track }));
    this.comms.showQuickActionPopup = false;
  }
}
