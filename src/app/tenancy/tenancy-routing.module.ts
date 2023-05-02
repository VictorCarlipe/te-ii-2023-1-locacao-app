import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { TenancyFormComponent } from './components/tenancy-form/tenancy-form.component';
import { TenancyListComponent } from './components/tenancy-list/tenancy-list.component';

const routes: Route[] = [
  {
    path: '',
    redirectTo: 'list',
    pathMatch: 'full'
  },
  {
    path: 'list',
    component: TenancyListComponent
  },
  {
    path: 'register',
    component: TenancyFormComponent
  },
  {
    path: 'edit/:id',
    component: TenancyFormComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TenancyPageRoutingModule {}
