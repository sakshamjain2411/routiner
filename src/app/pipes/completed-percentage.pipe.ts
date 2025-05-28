import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'completedPercentage'
})
export class CompletedPercentagePipe implements PipeTransform {

  transform(habits: Array<any>, ...args: unknown[]): unknown {
    const percentage = habits.reduce((count, habit) => {
      if (habit.target === habit.progress) {
        return count + 1;
      }
      return count;
    }, 0) / habits.length * 100 || 0;
    return percentage.toFixed(0);
  }

}
