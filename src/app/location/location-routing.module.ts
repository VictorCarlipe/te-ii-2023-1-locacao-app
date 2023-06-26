import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { LocationListComponent } from './components/location-list/location-list.component';
import { LocationFormComponent } from './components/location-form/location-form.component';

const routes: Route[] = [
  {
    path: '',
    redirectTo: 'list',
    pathMatch:'full'
  },
  {
    path:'list',
    component: LocationListComponent
  },
  {
    path:'register',
    component: LocationFormComponent
  },
  {
    path:'edit/:id',
    component: LocationFormComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LocationPageRoutingModule {}
