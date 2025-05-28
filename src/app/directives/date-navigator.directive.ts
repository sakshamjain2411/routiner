import { Directive, HostListener } from '@angular/core';

@Directive({
  selector: '[appDateNavigator]'
})
export class DateNavigatorDirective {

  constructor() { }
  @HostListener('scroll')
  onScroll() {
    // Handle scroll event
  }

}
