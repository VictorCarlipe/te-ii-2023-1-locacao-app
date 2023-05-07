import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { LocationService } from '../../service/location.service';

@Component({
  selector: 'app-location-form',
  templateUrl: './location-form.component.html',
  styleUrls: ['./location-form.component.scss'],
})
export class LocationFormComponent  implements OnInit {

  locationForm!: FormGroup

  createMode: boolean = false;
  editMode: boolean = false;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    private locationService: LocationService,
  ) {
    
   }

  ngOnInit(): void {
    const [url] = this.activatedRoute.snapshot.url;
    this.editMode = url.path === 'edit';
    this.createMode = !this.editMode;

    this.locationForm = this.formBuilder.group({
      name: 'Teste De Local',
      unit: 'XXI',
      capacity: 132,
      attributes:  ''
    })
  }

  save(): void {
    console.log(this.locationForm.value);

    this.locationService.save(this.locationForm.value).subscribe(
      () => {
        // TODO mensagem de sucesso
        this.router.navigate(['./location'])
      }
    )
  }

  cancel(): void {
    this.router.navigate(['./location'])
  }

}