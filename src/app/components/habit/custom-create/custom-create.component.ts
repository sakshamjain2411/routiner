import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CustomCreateDirective } from '../../../directives/custom-create.directive';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { HabitActions } from '../../../store/app.actions';
import { CommsService } from '../../../services/comms.service';

@Component({
  selector: 'app-custom-create',
  imports: [FormsModule, ReactiveFormsModule, CustomCreateDirective, CommonModule],
  templateUrl: './custom-create.component.html'
})
export class CustomCreateComponent {
  habitForm: FormGroup;
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
    }
  ];
  unitOptions = ["Times", "Minutes", "Hours", "Kilograms", "Liters", "Steps"];

  selectedFrequency: string = 'Daily';
  selectedIcon: {name:string, icon:string} = {name: 'Walking', icon: '🚶'};
  selectedUnit: string = 'Steps';

  constructor(private fb: FormBuilder, private store:Store, private comms:CommsService) { // Replace 'any' with your actual store type
    this.habitForm = this.fb.group({
      name: ['', Validators.required],
      frequency: ['Daily', Validators.required],
      target: ['', Validators.required],
      icon: ['🚶', Validators.required],
      unit: ['Steps', Validators.required],
    });
  }

  onSelectFrequency(frequency: string) {
    this.selectedFrequency = frequency;
    this.habitForm.patchValue({ frequency });
  }
  onSelectIcon(icon: {name:string, icon:string}) {
    this.selectedIcon = icon;
    this.habitForm.patchValue({ icon:icon.icon });
  }
  onSelectUnit(unit: string) {
    this.selectedUnit = unit;
    this.habitForm.patchValue({ unit });
  }
  onSubmit() {
    this.store.dispatch(HabitActions.addHabit({
      habit: {
        name: this.habitForm.value.name,
        frequency: this.habitForm.value.frequency,
        target: this.habitForm.value.target,
        icon: this.habitForm.value.icon,
        unit: this.habitForm.value.unit
      }
    }));
    this.comms.showCustomCreatePopup = false;
  }


}
