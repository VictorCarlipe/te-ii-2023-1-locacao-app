import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { LocationPageRoutingModule } from './location-routing.module';
import { LocationFormComponent } from './components/location-form/location-form.component';
import { LocationListComponent } from './components/location-list/location-list.component';
import { LocationService } from './service/location.service';

@NgModule({
  imports: [CommonModule, HttpClientModule, FormsModule, ReactiveFormsModule, LocationPageRoutingModule],
  declarations: [LocationFormComponent, LocationListComponent],
  providers: [LocationService]
})
export class LocationPageModule {}
