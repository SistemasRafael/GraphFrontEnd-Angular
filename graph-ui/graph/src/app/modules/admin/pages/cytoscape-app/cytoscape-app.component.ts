import { AfterViewInit, Component } from '@angular/core';
import cyStyles from '../../../../data/cy-style.json';
import cyData from '../../../../data/data.json';

declare var require: any;

const cytoscape = require('cytoscape');
const fcose = require('cytoscape-fcose');
const gridGuide = require('cytoscape-grid-guide');
const panzoom = require('cytoscape-panzoom');

@Component({
  selector: 'app-cytoscape-app',
  standalone: false,
  templateUrl: './cytoscape-app.component.html',
  styleUrl: './cytoscape-app.component.scss'
})
export class CytoscapeAppComponent implements AfterViewInit {
  private readonly nodeRepulsionVal : number = 4500;
  private readonly idealEdgeLengthVal : number = 1;
  private cy : any;
  private params : any= {
    name: 'fcose',
    nodeRepulsion: (n:any) => this.nodeRepulsionVal,
    idealEdgeLength: (e:any) => this.idealEdgeLengthVal / e.data('weight'),
    animate: true,
    randomize: false
  };

  ngAfterViewInit(): void {
    this.cytoscapeUse();
    this.cy = this.cytoscapeSetup();
    var layout = this.makeLayout({ animate: true });
    layout.run();
  }

  private cytoscapeSetup() : any {
    return cytoscape({
              container: document.getElementById('cy'),
              style: cyStyles as any,
              elements: cyData as any,
              layout: { name: 'grid' }
            })
            .gridGuide()
            .panzoom();
  }

  private cytoscapeUse() {
    cytoscape.use( gridGuide );
    cytoscape.use( panzoom );
    cytoscape.use( fcose );
  }

  private makeLayout( opts: any ){ 
    this.params.randomize = (opts || {}).randomize || false;

    for(var key in opts)
    {
      this.params[key] = opts[key];
    }

    return this.cy.layout( Object.assign({}, this.params) );
  }
}
