import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { QuickCreateComponent } from "../habit/quick-create/quick-create.component";
import { CommonModule } from '@angular/common';
import { CommsService } from '../../services/comms.service';
import { Store } from '@ngrx/store';
import { selectAppState } from '../../store/app.selectors';
import { Subject, takeUntil } from 'rxjs';
import { Routine, RoutineTrack } from '../../interfaces/app.interfaces';
import { cloneDeep } from 'lodash';
import { SwipeToActionComponent } from '../habit/swipe-to-action/swipe-to-action.component';

@Component({
  selector: 'app-routines',
  imports: [NavbarComponent, CommonModule, SwipeToActionComponent],
  templateUrl: './routines.component.html'
})
export class RoutinesComponent implements OnInit {
  routines:Routine[] = [];
  routineTracks:RoutineTrack[] = [];
  onDestroy$ = new Subject<void>();
  constructor(private comms:CommsService, private store:Store) {}
  ngOnInit(): void {
    this.store.select(selectAppState).pipe(
      takeUntil(this.onDestroy$)
    ).subscribe((state) => {
      this.routines = cloneDeep(state.routines);
      this.routineTracks = cloneDeep(state.routineTracks);
      const today = new Date();
      this.routines.forEach((routine) => {
        const dueDate = new Date(routine.updatedOn);
        dueDate.setDate(dueDate.getDate() + Number(routine.frequency));
        routine.dueIn = Math.floor((dueDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
      });
    });
  }

  openCreateRoutinePopup() {
    this.comms.showCustomCreatePopup = true;
    this.comms.customCreateType = 'Routine'
  }
}
