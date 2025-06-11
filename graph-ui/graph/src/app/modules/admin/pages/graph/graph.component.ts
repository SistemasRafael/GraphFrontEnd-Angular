import { AfterViewInit, Component } from '@angular/core';
import cyStyles from '../../../../data/cy-style.json';
import cyData from '../../../../data/data.json';
import { Guid } from "guid-typescript";

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

  DrawEdgeEmit(checked: boolean) {
    if(checked) {
      this.eh.enableDrawMode();
    }
    else {
      this.eh.disableDrawMode();
    }
  }

  DrawNodeEmit(checked: boolean) {
    if(checked) {
      this.DrawNodeOn();
    }
    else {
      this.DrawNodeOff();
    }
  }

  ngAfterViewInit(): void {
    this.cytoscapeUse();
    this.cy = this.cytoscapeSetup();
    this.eh = this.cy.edgehandles();
    var layout = this.makeLayout({ animate: true });
    layout.run();
  }

  DrawNodeOn() {
    const _this: any = this;

    _this.cy.on("click", function(e : any) {
      const {x, y} = e.position;
      _this.cy.add({
        "data": {
          "id": Guid.create().toString(),
          "idInt": Guid.create().toString(),
          "name": "New Node",
          "score": 0.001444414413500572,
          "query": true,
          "gene": true
        },
        "position": {
          "x": x,
          "y": y
        },
        "group": "nodes",
        "removed": false,
        "selected": false,
        "selectable": true,
        "locked": false,
        "grabbed": false,
        "grabbable": true,
        "classes": "fn10273 fn6944 fn9471 fn10569 fn8023 fn6956 fn6935 fn8147 fn6939 fn6936 fn6629 fn7928 fn6947 fn8612 fn6957 fn8786 fn6246 fn9367 fn6945 fn6946 fn10024 fn10022 fn6811 fn9361 fn6279 fn6278 fn8569 fn7641 fn8568 fn6943"
      });
    });
  }

  DrawNodeOff() {
    this.cy.off("click");
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
