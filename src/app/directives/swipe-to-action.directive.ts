import { Directive, ElementRef, EventEmitter, HostListener, Output, Renderer2 } from '@angular/core';
import { CommsService } from '../services/comms.service';

@Directive({
  selector: '[SwipeToAction]'
})
export class SwipeToActionDirective {

  constructor(private comms:CommsService, private el: ElementRef, private renderer: Renderer2) {}
  private touchStartX: number = 0;
  private touchEndX: number = 0;
  private deltaX: number = 0;

  @Output() displacement = new EventEmitter<number>();

  @HostListener('touchstart', ['$event'])
  onTouchStart(event: TouchEvent) {
    this.touchStartX = event.changedTouches[0].screenX;
  }

  @HostListener('touchmove', ['$event'])
  onTouchMove(event: TouchEvent) {
    const currentX = event.changedTouches[0].screenX;
    this.deltaX = Math.max(Math.min(currentX - this.touchStartX, 0), -80);
    this.renderer.setStyle(this.el.nativeElement, 'transform', `translateX(${this.deltaX}px)`);
    this.displacement.emit(this.deltaX);
  }

  @HostListener('touchend', ['$event'])
  onTouchEnd(event: TouchEvent) {
    this.touchEndX = event.changedTouches[0].screenX;
    if(this.deltaX != -80) {
      this.renderer.setStyle(this.el.nativeElement, 'transform', `translateX(0px)`);
      this.displacement.emit(0);
    }
  }

}
