import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { StudentListComponent } from './components/student-list/student-list.component';
import { StudentFormComponent } from './components/student-form/student-form.component';

const routes: Route[] = [
  {
    path: '',
    redirectTo: 'list',
    pathMatch:'full'
  },
  {
    path:'list',
    component:StudentListComponent
  },
  {
    path:'register',
    component: StudentFormComponent
  },
  {
    path:'edit/:id',
    component: StudentFormComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StudentPageRoutingModule {}
