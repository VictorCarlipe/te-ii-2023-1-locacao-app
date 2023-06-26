import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { LocationService } from '../../service/location.service';
import { AlertController, LoadingController } from '@ionic/angular';
import { Subscription, empty } from 'rxjs';


@Component({
  selector: 'app-location-form',
  templateUrl: './location-form.component.html',
  styleUrls: ['./location-form.component.scss'],
})
export class LocationFormComponent  implements OnInit {

  locationForm!: FormGroup
  subscriptions = new Subscription();
  createMode: boolean = false;
  editMode: boolean = false;
  id!: string | null;

  constructor(
    private activateRoute: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    private locationService: LocationService,
    private loadingController: LoadingController,
    private alertController: AlertController
  ) {
    
   }

  ngOnInit(): void {
    const [url] = this.activateRoute.snapshot.url;
    this.editMode = url.path === 'edit';
    this.createMode = !this.editMode;
    this.initializeForm();
    this.loadLocationOnEditMode();

    //this.locationForm = this.formBuilder.group({
      //name: 'Teste De Local',
      //unit: 'XXI',
      //capacity: 132,
      //attributes:  ''
    //})
  }

  save(): void {
    if(this.createMode){
      this.subscriptions.add(
        this.locationService.save(this.locationForm.value).subscribe(
          () => {
            this.router.navigate(['./location'])
          },
          async () => {
            const alert = await this.alertController.create({
              header: 'Erro',
              message: 'Não foi possível salvar os dados do aluno',
              buttons:['OK']
            })
            alert.present()
          }
        )
      )
    }else{
      this.locationService.update({
        ...this.locationForm.value,
        id: this.id
      }).subscribe({
        next:() => {
          this.router.navigate(['./location'])
        },
        error: async () => {
          const alerta = await this.alertController.create({
            header: 'Erro',
            message: 'Não foi possível salvar os dados do local',
            buttons: ['Ok']
          })
          alerta.present()
        }
      })
    }
  }

  cancel(): void {
    this.router.navigate(['./location'])
  }

  private async loadLocationOnEditMode(){
    const [url] = this.activateRoute.snapshot.url;
    this.editMode = url.path === 'edit';
    this.createMode = !this.editMode;
    
    if(this.editMode){
      this.id = this.activateRoute.snapshot.paramMap.get('id');
      
      if(this.id !== undefined){
        //this.loadingService.on()
        const busyLoader = await this.loadingController.create({spinner:'circular'})
        //busyLoader.present()        
        //busyLoader.dismiss()
        this.locationService.getLocation(this.id).subscribe((location) => {
          this.locationForm.patchValue({
            id: location.id,         
            nome: location.nome,
            unit: location.unit,
            capacity: location.capacity,
            attributes: location.attributes,
          })
          //this.loadingService.off()
        })
      }
    }
  }

  private initializeForm(){
    this.locationForm = this.formBuilder.group({
      nome: [
        'Local para cadastro',
        [
          Validators.required,
          Validators.maxLength(70)
        ]
      ],
      unit: 'I',
      capacity: [
        0,
        [
          Validators.required
        ]
      ],
      attributes: [
        'Informações sobre o local...',
        [
          Validators.maxLength(250)
        ]
      ]
    })
  }
}