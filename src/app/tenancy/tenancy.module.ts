import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { TenancyPageRoutingModule } from './tenancy-routing.module';
import { TenancyFormComponent } from './components/tenancy-form/tenancy-form.component';
import { TenancyListComponent } from './components/tenancy-list/tenancy-list.component';
import { TenancyService } from './service/tenancy.service';
import { StudentService } from '../student/service/student.service';
import { LocationService } from '../location/service/location.service';
import { IonicModule } from '@ionic/angular';

@NgModule({
  imports: [CommonModule, HttpClientModule, FormsModule, IonicModule,ReactiveFormsModule, TenancyPageRoutingModule],
  declarations: [TenancyFormComponent, TenancyListComponent],
  providers: [TenancyService, StudentService, LocationService]
})
export class TenancyPageModule {}
