import { Directive, ElementRef, HostListener, Renderer2 } from '@angular/core';
import { CommsService } from '../services/comms.service';

@Directive({
  selector: '[QuickAction]'
})
export class QuickCreateDirective {

  constructor(private comms:CommsService, private el: ElementRef, private renderer: Renderer2) {}
  private touchStartY: number = 0;
  private touchEndY: number = 0;

  @HostListener('touchstart', ['$event'])
  onTouchStart(event: TouchEvent) {
    this.touchStartY = event.changedTouches[0].screenY;
  }

  @HostListener('touchend', ['$event'])
  onTouchEnd(event: TouchEvent) {
    this.touchEndY = event.changedTouches[0].screenY;
    this.handleSwipeGesture();
  }

  private handleSwipeGesture() {
    const swipeDistance = this.touchEndY - this.touchStartY;
    if (swipeDistance > 50) { // Adjust the threshold as needed
      this.renderer.removeClass(this.el.nativeElement, 'slide-up');
      this.renderer.addClass(this.el.nativeElement, 'slide-down');
      setTimeout(() => {
        this.comms.showQuickCreatePopup = false; // Swipe down to open popup
      }, 1000); // Adjust the delay as needed
      // this.comms.showCreateHabitPopup = false; // Swipe down to open popup
    }
  }

}
