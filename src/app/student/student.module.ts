import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { StudentPageRoutingModule } from './student-routing.module';
import { StudentFormComponent } from './components/student-form/student-form.component';
import { StudentListComponent } from './components/student-list/student-list.component';
import { StudentService } from './service/student.service';

@NgModule({
  imports: [CommonModule, HttpClientModule, FormsModule, ReactiveFormsModule, StudentPageRoutingModule],
  declarations: [StudentFormComponent, StudentListComponent],
  providers: [StudentService]
})
export class StudentPageModule {}
