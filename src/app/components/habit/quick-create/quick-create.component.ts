import { Component } from '@angular/core';
import { QuickCreateDirective } from '../../../directives/quick-create.directive';
import { CommsService } from '../../../services/comms.service';

@Component({
  selector: 'app-quick-create',
  imports: [QuickCreateDirective],
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
