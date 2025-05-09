import cytoscape from 'cytoscape';
import fcose from 'cytoscape-fcose';
import cyStyles from '../../../data/cy-style.json';
import cyData from '../../../data/data.json';

export class CytoscapeApp {
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
  
  Init() {
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
    });
  }

  private cytoscapeUse() {
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

