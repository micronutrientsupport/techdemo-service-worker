import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GraphComponent } from './components/graph/graph.component';
import { MapComponent } from './components/map/map.component';

const routes: Routes = [
  { path: 'map', component: MapComponent },
  { path: 'graph', component: GraphComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
