import { AfterViewInit, Component } from '@angular/core';
import { CytoscapeApp } from '../../../../core/utilities/cytoscape/cytoscape.app';

@Component({
  selector: 'app-cytoscape-app',
  standalone: false,
  templateUrl: './cytoscape-app.component.html',
  styleUrl: './cytoscape-app.component.scss'
})
export class CytoscapeAppComponent implements AfterViewInit {
  cytoscapeApp : CytoscapeApp = new CytoscapeApp();

  ngAfterViewInit(): void {
    this.cytoscapeApp.Init();
  }
}
