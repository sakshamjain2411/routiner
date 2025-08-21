import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, Renderer2, ViewChild, viewChild } from '@angular/core';
import { NavbarComponent } from "../navbar/navbar.component";
import { CommsService } from '../../services/comms.service';
import { CommonModule } from '@angular/common';
import { DateNavigator, Habit, User } from '../../interfaces/app.interfaces';
import { CompletedCountPipe } from '../../pipes/completed-count.pipe';
import { CompletedPercentagePipe } from '../../pipes/completed-percentage.pipe';
import { Store } from '@ngrx/store';
import { selectAppState, selectInitialized } from '../../store/app.selectors';
import { cloneDeep } from 'lodash';
import { HammerModule } from '@angular/platform-browser';
import { SwipeToActionComponent } from "../reusable/swipe-to-action/swipe-to-action.component";
import { AppActions } from '../../store/app.actions';
import { SplashComponent } from '../splash/splash.component';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-home',
  imports: [NavbarComponent, CommonModule, CompletedCountPipe, CompletedPercentagePipe, HammerModule, SwipeToActionComponent, SplashComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit, AfterViewInit, OnDestroy {

  @ViewChild('DateNavigator') dateNavigator!: ElementRef;
  user:User = {} as User;
  tracks: any[] = [];
  dailyHabits:Habit[] = [];
  weeklyHabits:Habit[] = [];
  selectedDate:string = new Date().toDateString();
  days = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
  dates: string[] = [];
  showSplashScreen$ = this.store.select(selectInitialized);
  onDestroy$ = new Subject<void>();
  constructor(private store:Store, public comms:CommsService) {}

  ngOnInit(): void {
    this.store.select(selectAppState).pipe(
      takeUntil(this.onDestroy$)
    ).subscribe((state) => {
      this.user = state.user;
      this.dailyHabits = cloneDeep(state.habits.filter(habit => habit.frequency === 'Daily'));
      this.weeklyHabits = cloneDeep(state.habits.filter(habit => habit.frequency === 'Weekly'));
      this.tracks = cloneDeep(state.tracks);
      this.mapDailyHabits();
      this.mapWeeklyHabits();
    });

    // Date Navigator Initialization
    const date = new Date();
    this.store.dispatch(AppActions.setSelectedDate({ date: this.selectedDate }));
    for(let i=date.getDate() - 10; i <= date.getDate() + 10; i++) {
      const currentDate = new Date(date.getFullYear(), date.getMonth(), i);
      this.dates.push(currentDate.toDateString());
      if(currentDate.getDate() === date.getDate()) {
        this.selectedDate = currentDate.toDateString();
      }
    }

  }
  
  ngAfterViewInit(): void {
    this.scrollToSelectedDate();
  }

  scrollToSelectedDate(): void {
    const index = this.dates.findIndex(date => date === this.selectedDate);
    if (index !== -1) {
      const element = this.dateNavigator.nativeElement.children[index];
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', inline: 'center' });
      }
    }
  }

  onDateClick(date: string): void {
    this.selectedDate = date;
    this.store.dispatch(AppActions.setSelectedDate({ date: this.selectedDate }));
    this.scrollToSelectedDate();
    this.mapDailyHabits();
    this.mapWeeklyHabits();
  }

  mapDailyHabits(): void {
    this.dailyHabits.forEach((habit: Habit) => {
      habit.progress = this.tracks.reduce((acc, track) => {
        if (track.habitId === habit.id && track.date === this.selectedDate) {
          return acc + track.amount;
        }
        return acc;
      }, 0);
    });
  }

  mapWeeklyHabits(): void {
    this.weeklyHabits.forEach((habit: Habit) => {
      habit.progress = this.tracks.reduce((acc, track) => {
        const trackDate = new Date(track.date);
        const selected = new Date(this.selectedDate);
        const startOfWeek = new Date(selected);
        startOfWeek.setDate(selected.getDate() - selected.getDay());
        const endOfWeek = new Date(selected);
        endOfWeek.setDate(selected.getDate() + (6 - selected.getDay()));

        if (
          track.habitId === habit.id &&
          trackDate >= startOfWeek &&
          trackDate <= endOfWeek
        ) {
          return acc + track.amount;
        }
        return acc;
      }, 0);
    });
  }

  ngOnDestroy(): void {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }
}
