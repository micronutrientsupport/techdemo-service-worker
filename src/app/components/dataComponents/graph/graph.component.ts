import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/data.service';

@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.scss']
})
export class GraphComponent implements OnInit {

  public data = Array<object>();
  public graph;
  public showGraph = false;

  constructor(
    private dataService: DataService,
  ) { }

  ngOnInit(): void {
    this.dataService.getData()
      .then((data: Array<object>) => {
        this.data = data;
        this.generateGraph(this.data);
        this.showGraph = true;
      })
      .catch(() => {
        this.showGraph = false;
      });
  }

  public generateGraph(data: Array<object>): void {
    const cityLat = data.map((obj) => obj[2]).filter((lat, i) => { if (i >= 1) { return lat; } });
    const cityLon = data.map((obj) => obj[3]).filter((lat, i) => { if (i >= 1) { return lat; } });
    const citySize = data.map((obj) => (+obj[1]) / 50000).filter((lat, i) => { if (i >= 1) { return lat; } });
    const hoverText = data.map((obj) => `${obj[0]}: ${obj[1]}`).filter((lat, i) => { if (i >= 1) { return lat; } });

    this.graph = {
      data: [{
        type: 'scattergeo',
        locationmode: 'USA-states',
        lat: cityLat,
        lon: cityLon,
        hoverinfo: 'text',
        text: hoverText,
        marker: {
          size: citySize,
          line: {
            color: 'black',
            width: 2
          },
        }
      }],

      layout:
      {
        title: '2014 US City Populations',
        showlegend: false,
        autosize: true,
        height: '200%',
        margin: {
          b: 80,  // space for axis
          t: 40,  //  might need more when there's a title
          pad: 4,
        },
        geo: {
          scope: 'usa',
          projection: {
            type: 'albers usa'
          },
          showland: true,
          landcolor: 'rgb(217, 217, 217)',
          subunitwidth: 1,
          countrywidth: 1,
          subunitcolor: 'rgb(255,255,255)',
          countrycolor: 'rgb(255,255,255)'
        },
      }
    };
  }

}

