import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CovidTrackerComponent } from './components/dataComponents/covidTracker/covidTracker.component';
import { GraphComponent } from './components/dataComponents/graph/graph.component';
import { MapComponent } from './components/map/map.component';

const routes: Routes = [
  { path: 'map', component: MapComponent },
  { path: 'graph', component: GraphComponent },
  { path: 'tracker', component: CovidTrackerComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
