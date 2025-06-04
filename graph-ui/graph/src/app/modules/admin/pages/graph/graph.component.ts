import { AfterViewInit, Component } from '@angular/core';
import cyStyles from '../../../../data/cy-style.json';
import cyData from '../../../../data/data.json';

declare var require: any;

const cytoscape = require('cytoscape');
const fcose = require('cytoscape-fcose');
const gridGuide = require('cytoscape-grid-guide');
const panzoom = require('cytoscape-panzoom');
const edgehandles = require('cytoscape-edgehandles');

@Component({
  selector: 'app-graph',
  standalone: false,
  templateUrl: './graph.component.html',
  styleUrl: './graph.component.scss'
})
export class GraphComponent implements AfterViewInit {
  eh : any;
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

  reciveFromEmit(checked: boolean) {
    if(checked) {
      this.eh.enableDrawMode();
    }
    else {
      this.eh.disableDrawMode();
    }
  }

  ngAfterViewInit(): void {
    this.cytoscapeUse();
    this.cy = this.cytoscapeSetup();
    this.eh = this.cy.edgehandles();
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
    if (typeof cytoscape('core', 'gridGuide') == 'undefined') {
      cytoscape.use( gridGuide );
    }

    if (typeof cytoscape('core', 'panzoom') == 'undefined') {
      cytoscape.use( panzoom );
    }
    
    if (typeof cytoscape('core', 'fcose') == 'undefined') {
      cytoscape.use( fcose );
    }

    if (typeof cytoscape('core', 'edgehandles') == 'undefined') {
      cytoscape.use( edgehandles );
    }
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
