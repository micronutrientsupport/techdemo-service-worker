import { Component, OnInit } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  public title = 'service-worker';
  public currentRoute;

  constructor(private router: Router) {
    this.router.events.subscribe((val: NavigationStart) => {
      if (val.url != null) {
        this.currentRoute = val.url;
      }
    });
  }

  ngOnInit(): void {
    // this.currentRoute = this.router.url;
  }
}
