import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'completedCount'
})
export class CompletedCountPipe implements PipeTransform {

  transform(habits: Array<any>, ...args: unknown[]): unknown {
    return habits.reduce((count, habit) => {
      if (habit.target === habit.progress) {
        return count + 1;
      }
      return count;
    }, 0);
  }

}
