import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CustomCreateDirective } from '../../../directives/custom-create.directive';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { ChallengeActions, HabitActions, RoutineActions } from '../../../store/app.actions';
import { CommsService } from '../../../services/comms.service';
import { Challenge, Habit, Routine } from '../../../interfaces/app.interfaces';
import { selectDailyHabits } from '../../../store/app.selectors';

@Component({
  selector: 'app-custom-create',
  imports: [FormsModule, ReactiveFormsModule, CustomCreateDirective, CommonModule],
  templateUrl: './custom-create.component.html'
})
export class CustomCreateComponent {
  habitForm: FormGroup;
  routineForm: FormGroup;
  challengeForm: FormGroup;
  frequencyOptions = ["Daily", "Weekly"];
  iconOptions = [
    {
      name: 'Water',
      icon: '💧'
    },
    {
      name: 'Exercise',
      icon: '🏋️'
    },
    {
      name: 'Sleep',
      icon: '😴'
    },
    {
      name: 'Meditation',
      icon: '🧘'
    },
    {
      name: 'Walking',
      icon: '🚶'
    },
    {
      name: 'Reading',
      icon: '📚'
    },
    {
      name: 'Cooking',
      icon: '🍳'
    },
    {
      name: 'Journaling',
      icon: '📝'
    },
    {
      name: 'Medication',
      icon: '💊 '
    },
    {
      name: 'Sports',
      icon: '🏸'
    }
  ];
  unitOptions = ["Time", "Minute", "Hour", "Page", "Step", "Count", "Mililiter"];

  habits: Habit[] = [];
  selectedFrequency: string = 'Daily';
  selectedIcon: {name:string, icon:string} = {name: 'Walking', icon: '🚶'};
  selectedUnit: string = 'Steps';
  isHabit: boolean = false;
  isRoutine: boolean = false;
  isChallenge: boolean = false;

  constructor(private fb: FormBuilder, private store:Store, private comms:CommsService) { // Replace 'any' with your actual store type
    this.habitForm = this.fb.group({
      name: ['', Validators.required],
      frequency: ['Daily', Validators.required],
      target: ['', Validators.required],
      icon: ['🚶', Validators.required],
      unit: ['Steps', Validators.required],
    });

    this.routineForm = this.fb.group({
      name: ['', Validators.required],
      frequency: ['Daily', Validators.required],
      icon: ['🚶', Validators.required],
      dueOn: ['', Validators.required]
    });

    this.challengeForm = this.fb.group({
      name: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      habits: [[], Validators.required] // Assuming habits will be selected from a list
    });

    if(this.comms.customCreateType === 'Routine') this.isRoutine = true;
      else if(this.comms.customCreateType === 'Challenge') {
        this.isChallenge = true;
        this.store.select(selectDailyHabits).subscribe(habits => {
          this.habits = habits;
        });
      } else this.isHabit = true;
  }

  onSelectFrequency(frequency: string) {
    this.selectedFrequency = frequency;
    this.habitForm.patchValue({ frequency });
  }
  onSelectIcon(icon: {name:string, icon:string}) {
    this.selectedIcon = icon;
    if(this.isHabit) this.habitForm.patchValue({ icon:icon.icon })
      else if(this.isRoutine) this.routineForm.patchValue({ icon:icon.icon });
        // else this.challengeForm.patchValue({ icon:icon.icon });
  }
  onSelectUnit(unit: string) {
    this.selectedUnit = unit;
    this.habitForm.patchValue({ unit });
  }
  onSubmit() {
    if(this.isHabit) {
      this.store.dispatch(HabitActions.addHabit({
        habit: {
          name: this.habitForm.value.name,
          frequency: this.habitForm.value.frequency,
          target: this.habitForm.value.target,
          icon: this.habitForm.value.icon,
          unit: this.habitForm.value.unit
        } as Habit
      }));
    } else if(this.isRoutine) {
      this.store.dispatch(RoutineActions.addRoutine({
        routine: {
          name: this.routineForm.value.name,
          frequency: this.routineForm.value.frequency,
          createdOn: new Date(this.routineForm.value.dueOn).toISOString(),
          updatedOn: new Date(this.routineForm.value.dueOn).toISOString(),
          icon: this.routineForm.value.icon,
        } as Routine
      }));
    } else {
      this.store.dispatch(ChallengeActions.addChallenge({
        challenge: {
          name: this.challengeForm.value.name,
          startDate: this.challengeForm.value.startDate,
          endDate: this.challengeForm.value.endDate,
          habits: this.challengeForm.value.habits
        } as Challenge
      }));
    }
    this.comms.showCustomCreatePopup = false;
  }


}
