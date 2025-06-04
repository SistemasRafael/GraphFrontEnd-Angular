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

  onToggleChange(event: MatSlideToggleChange) {
    const checked : boolean = event.checked;
    this.actionDrawEdge.emit(checked);
  }
}
