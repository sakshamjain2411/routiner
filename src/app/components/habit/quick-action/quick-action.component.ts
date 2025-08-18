import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { Habit, QuickAction, Track } from '../../../interfaces/app.interfaces';
import { QuickActionDirective } from '../../../directives/quick-action.directive';
import { CommsService } from '../../../services/comms.service';
import { Store } from '@ngrx/store';
import { TrackActions } from '../../../store/app.actions';
import { selectSelectedDate } from '../../../store/app.selectors';
import { firstValueFrom } from 'rxjs';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-quick-action',
  imports: [CommonModule, QuickActionDirective, FormsModule],
  templateUrl: './quick-action.component.html'
})
export class QuickActionComponent implements OnInit {

  @Input() habit:Habit = {} as Habit;
  unit:string = "ml"
  quickActions: string[] = [];
  customValue: string = '';
  constructor(private comms:CommsService, private store:Store) { }

  ngOnInit(): void {
    this.unit = this.habit.unit || 'Mililiter'; // Default to 'Mililiter' if unit is not set
    switch (this.habit.unit) {
      case 'Mililiter':
        this.quickActions = ['250', '500', '750', '1000', '1250'];
        break;
      case 'Step':
        this.quickActions = ['1000', '2000', '3000', '4000', '5000'];
        break;
      case 'Hour':
      case 'Time':
      case 'Page':
      case 'Count':
        this.quickActions = ['1', '2', '3', '4', '5'];
        break;
      case 'Minute':
        this.quickActions = ['5', '10', '15', '20', '30'];
        break;
      default:
        this.quickActions = ['250', '500', '750', '1000', '1250'];
        break;
    }
  }

  async onQuickActionClick(action: string) {
    const track:Track = {
      habitId: this.habit.id,
      date: await firstValueFrom(this.store.select(selectSelectedDate)),
      amount: parseInt(action),
      createdOn: new Date().toISOString(),
    } as Track;
    this.store.dispatch(TrackActions.addTrack({ track }));
    this.comms.showQuickActionPopup = false;
  }
}
