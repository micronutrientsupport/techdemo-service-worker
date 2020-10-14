import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Papa } from 'ngx-papaparse';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  public popData;

  constructor(
    private http: HttpClient,
    private parser: Papa,
  ) { }

  public getPopulationData(): Promise<Array<object>> {
    const url = 'https://raw.githubusercontent.com/plotly/datasets/master/2014_us_cities.csv';
    return this.http.get(url, { responseType: 'text' }).toPromise()
      .then((data) => {
        this.popData = this.parser.parse(data).data;
        return this.popData;
      })
      .catch((err) => {
        console.log(err);
      });
  }

  public getCovidData(): Promise<Array<object>> {
    const url = 'https://corona-api.com/countries';
    return this.http.get(url, { responseType: 'json' }).toPromise()
      .then((data) => {
        // tslint:disable-next-line: no-string-literal
        return data['data'];
      }).catch((err) => {
        console.log(err);
      });
  }
}
