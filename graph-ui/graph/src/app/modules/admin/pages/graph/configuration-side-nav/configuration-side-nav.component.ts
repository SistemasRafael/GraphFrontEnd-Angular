import { Component, EventEmitter, Output } from '@angular/core';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';

@Component({
  selector: 'app-configuration-side-nav',
  standalone: false,
  templateUrl: './configuration-side-nav.component.html',
  styleUrl: './configuration-side-nav.component.scss'
})
export class ConfigurationSideNavComponent {
  
  @Output() actionDrawEdge = new EventEmitter<boolean>();
  @Output() actionDrawNode = new EventEmitter<boolean>();

  onDrawEdgeChange(event: MatSlideToggleChange) {
    const checked : boolean = event.checked;
    this.actionDrawEdge.emit(checked);
  }

  onDrawNodeChange(event: MatSlideToggleChange) {
    const checked : boolean = event.checked;
    this.actionDrawNode.emit(checked);
  }
}
