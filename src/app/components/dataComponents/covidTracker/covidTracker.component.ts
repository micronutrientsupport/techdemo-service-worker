import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/data.service';

@Component({
  selector: 'app-table',
  templateUrl: './covidTracker.component.html',
  styleUrls: ['./covidTracker.component.scss']
})
export class CovidTrackerComponent implements OnInit {

  public data = Array<object>();
  public graph;
  public showGraph = false;

  constructor(
    private dataService: DataService,
  ) { }

  ngOnInit(): void {
    this.dataService.getCovidData()
      .then((data) => {
        // console.debug('data:', data);
        this.generateGraph(data);
        this.showGraph = true;
      });
  }

  public generateGraph(data: Array<object>): void {
    // tslint:disable-next-line: no-string-literal
    const latitude = data.map((obj) => obj['coordinates']['latitude']);
    // tslint:disable-next-line: no-string-literal
    const longitude = data.map((obj) => obj['coordinates']['longitude']);
    // tslint:disable-next-line: no-string-literal
    const totalCases = data.map((obj) => (obj['latest_data']['confirmed']) / 100000);
    const hoverText = data.map((obj) =>
    // tslint:disable-next-line: no-string-literal
      `${obj['name']}: ${obj['latest_data']['confirmed']}`);

    this.graph = {
      data: [{
        type: 'scattergeo',
        // locationmode: 'USA-states',
        lat: latitude,
        lon: longitude,
        hoverinfo: 'text',
        text: hoverText,
        marker: {
          size: totalCases,
          line: {
            color: 'black',
            width: 2
          },
        }
      }],

      layout:
      {
        title: 'Confirmed Covid-19 Cases',
        showlegend: false,
        autosize: true,
        margin: {
          b: 80,  // space for axis
          t: 40,  //  might need more when there's a title
          pad: 4,
        },
        geo: {
          scope: 'world',
          projection: {
            // type: 'albers usa'
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
