import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { TenancyPageRoutingModule } from './tenancy-routing.module';
import { TenancyFormComponent } from './components/tenancy-form/tenancy-form.component';
import { TenancyListComponent } from './components/tenancy-list/tenancy-list.component';
import { TenancyService } from './service/tenancy.service';

@NgModule({
  imports: [CommonModule, HttpClientModule, FormsModule, ReactiveFormsModule, TenancyPageRoutingModule],
  declarations: [TenancyFormComponent, TenancyListComponent],
  providers: [TenancyService]
})
export class TenancyPageModule {}
