import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Papa } from 'ngx-papaparse';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  public data;

  constructor(
    private http: HttpClient,
    private parser: Papa,
  ) { }

  public getData(): Promise<Array<object>> {
    const url = 'https://raw.githubusercontent.com/plotly/datasets/master/2014_us_cities.csv';
    return this.http.get(url, { responseType: 'text' }).toPromise()
      .then((data) => {
        this.data = this.parser.parse(data).data;
        return this.data;
      })
      .catch((err) => {
        console.log(err);
      });
  }
}
