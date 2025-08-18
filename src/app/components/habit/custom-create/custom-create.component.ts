import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CustomCreateDirective } from '../../../directives/custom-create.directive';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { HabitActions, RoutineActions } from '../../../store/app.actions';
import { CommsService } from '../../../services/comms.service';
import { Habit, Routine } from '../../../interfaces/app.interfaces';

@Component({
  selector: 'app-custom-create',
  imports: [FormsModule, ReactiveFormsModule, CustomCreateDirective, CommonModule],
  templateUrl: './custom-create.component.html'
})
export class CustomCreateComponent {
  habitForm: FormGroup;
  routineForm: FormGroup;
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

  selectedFrequency: string = 'Daily';
  selectedIcon: {name:string, icon:string} = {name: 'Walking', icon: '🚶'};
  selectedUnit: string = 'Steps';
  isHabit: boolean = true;

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

    if(this.comms.customCreateType === 'Routine') {
      this.isHabit = false;
    }
  }

  onSelectFrequency(frequency: string) {
    this.selectedFrequency = frequency;
    this.habitForm.patchValue({ frequency });
  }
  onSelectIcon(icon: {name:string, icon:string}) {
    this.selectedIcon = icon;
    if(this.isHabit) this.habitForm.patchValue({ icon:icon.icon })
      else this.routineForm.patchValue({ icon:icon.icon });
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
    } else {
      this.store.dispatch(RoutineActions.addRoutine({
        routine: {
          name: this.routineForm.value.name,
          frequency: this.routineForm.value.frequency,
          createdOn: new Date(this.routineForm.value.dueOn).toISOString(),
          updatedOn: new Date(this.routineForm.value.dueOn).toISOString(),
          icon: this.routineForm.value.icon,
        } as Routine
      }));
    }
    this.comms.showCustomCreatePopup = false;
  }


}
