import { Directive, ElementRef, EventEmitter, HostListener, Output, Renderer2 } from '@angular/core';
import { CommsService } from '../services/comms.service';

@Directive({
  selector: '[SwipeToAction]'
})
export class SwipeToActionDirective {

  constructor(private comms:CommsService, private el: ElementRef, private renderer: Renderer2) {}
  private touchStartX: number = 0;
  private touchEndX: number = 0;
  private touchStartY: number = 0;
  private deltaX: number = 0;
  private isSwiping = false;

  @Output() displacement = new EventEmitter<number>();

  @HostListener('touchstart', ['$event'])
  onTouchStart(event: TouchEvent) {
    this.touchStartX = event.changedTouches[0].screenX;
    this.touchStartY = event.changedTouches[0].screenY;
    this.isSwiping = false;
  }

  @HostListener('touchmove', ['$event'])
  onTouchMove(event: TouchEvent) {
    const touch = event.changedTouches[0];
    const deltaX = touch.screenX - this.touchStartX;
    const deltaY = touch.screenY - this.touchStartY;

    // Detect vertical scroll and ignore if vertical movement is greater
    if (!this.isSwiping && Math.abs(deltaY) > Math.abs(deltaX)) return;

    // Once swiping horizontally, ignore large vertical movement
    if (this.isSwiping && Math.abs(deltaY) > 20) return;

    this.isSwiping = true;
    this.deltaX = Math.max(Math.min(deltaX, 0), -160);
    this.renderer.setStyle(this.el.nativeElement, 'transform', `translateX(${this.deltaX}px)`);
    this.displacement.emit(this.deltaX);
  }

  @HostListener('touchend', ['$event'])
  onTouchEnd(event: TouchEvent) {
    this.touchEndX = event.changedTouches[0].screenX;
    const shouldOpen = this.deltaX <= -100;
    this.deltaX = shouldOpen ? -160 : 0;
    this.renderer.setStyle(this.el.nativeElement, 'transform', `translateX(${this.deltaX}px)`);
    this.displacement.emit(this.deltaX);
    this.comms.setSwipeAction(true);
  }

}
