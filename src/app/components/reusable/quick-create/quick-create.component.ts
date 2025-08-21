import { Component } from '@angular/core';
import { CommsService } from '../../../services/comms.service';
import { SwipeToCloseDirective } from '../../../directives/swipe-to-close';

@Component({
  selector: 'app-quick-create',
  imports: [SwipeToCloseDirective],
  templateUrl: './quick-create.component.html'
})
export class QuickCreateComponent {

  constructor(private comms:CommsService) { }
  showCustomCreate: boolean = false;
  onShowCustomCreateClick() {
    this.comms.showQuickCreatePopup = false;
    this.comms.showCustomCreatePopup = true;
  }

}
