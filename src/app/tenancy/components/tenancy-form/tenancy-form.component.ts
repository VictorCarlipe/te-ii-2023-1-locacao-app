import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TenancyService } from '../../service/tenancy.service';
import { AlertController, LoadingController } from '@ionic/angular';
import { StudentService } from 'src/app/student/service/student.service';
import { LocationService } from 'src/app/location/service/location.service';
import { FormBuilder, FormGroup, Validators, ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';
import { Subscription } from 'rxjs';
import { StudentInterface } from 'src/app/student/type/student.interface';
import { LocationInterface } from 'src/app/location/type/location.interface';

@Component({
  selector: 'app-tenancy-form',
  templateUrl: './tenancy-form.component.html',
  styleUrls: ['./tenancy-form.component.scss'],
})
export class TenancyFormComponent  implements OnInit {

  tenancyForm!: FormGroup;
  subscription = new Subscription()
  createMode: boolean = false;
  editMode: boolean = false;
  id!: string | null;
  students: StudentInterface[]=[];
  locals: LocationInterface[]=[];
  initialDate!: string;

  minute = 1000 * 60;
  hour = this.minute * 60;
  day = this.hour * 24;
  year = this.day * 365;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    private tenancyService: TenancyService,
    private alertController: AlertController,
    private renderService: StudentService,
    private locationService: LocationService,
    private loadingController: LoadingController
  ) { }

  ngOnInit() {
    this.initializeForm();
    this.loadRenders();
    this.loadLocations();
    this.loadTenancyOnEditMode();
  }

  save(): void {
    if(this.createMode){
      this.subscription.add(
        this.tenancyService.save(this.tenancyForm.value).subscribe(
          () => {
            this.router.navigate(['./tenancy'])
          },
          async () => {
            const alert = await this.alertController.create({
              header: 'Erro',
              message: 'Não foi possível salvar os dados da locação',
              buttons:['OK']
            })
            alert.present()
          }
        )
      )
    }else{
      this.tenancyService.update({
        ...this.tenancyForm.value,
        id: this.id
      }).subscribe({
        next:() => {
          this.router.navigate(['./tenancy'])
        },
        error: async () => {
          const alerta = await this.alertController.create({
            header: 'Erro',
            message: 'Não foi possível salvar os dados da locação',
            buttons: ['Ok']
          })
          alerta.present()
        }
      })
    }
  }

  cancel():void{
    this.router.navigate(['./tenancy'])
  }

  private async loadRenders(){
    //const busyLoader = await this.loadingController.create({spinner:'circular'})
    //busyLoader.present()

    this.subscription.add(
      this.renderService.getStudents().subscribe((response) => {
        this.students = response;
        //busyLoader.dismiss();
      })
    );
  }


  private async loadLocations(){
    //const busyLoader = await this.loadingController.create({spinner:'circular'})
    //busyLoader.present()

    this.subscription.add(
      this.locationService.getLocations().subscribe((response) => {
        this.locals = response;
      })
      );
    //busyLoader.dismiss();
  }

  private async loadTenancyOnEditMode(){
    const busyLoader = await this.loadingController.create({spinner:'circular'})
    const [url] = this.activatedRoute.snapshot.url;
    this.editMode = url.path === 'edit';
    this.createMode = !this.editMode;

    if(this.editMode){
      this.id = this.activatedRoute.snapshot.paramMap.get('id');

      if(this.id !== undefined){
        busyLoader.present()
        this.tenancyService.getTenancy(this.id).subscribe((tenancy) => {
          this.tenancyForm.patchValue({
            student: tenancy.student,
            local: tenancy.local,
            initialDate: tenancy.initialDate,
            finalDate: tenancy.finalDate,
            objective: tenancy.objective,
            description: tenancy.description
          })
          this.initialDate = tenancy.initialDate;
          busyLoader.dismiss();
        })
      }
    }
  }

  private initializeForm(){
    this.tenancyForm = this.formBuilder.group({
      student: '',
      local: '',
      initialDate: [
        '2023-06-27',
        this.validInitialDate(),
      ],
      finalDate: [
        '2023-06-30',
        this.validFinalDate(this.initialDate),
      ],
      objective: 'MON',
      description:[
        '',
        Validators.maxLength(300),
      ]
    })
  }

  validInitialDate(): ValidatorFn {
    return (control:AbstractControl): ValidationErrors | null => {
      
      const inital = new Date(control.value)
      const now = new Date(Date.now())

      if(inital.getTime() < (now.getTime() - 1*this.day)){
        return { invalidIntialDate : 'invaliDate'}
      }
      return null;
    }
  }

  validFinalDate(initial: string): ValidatorFn{
    return (control:AbstractControl): ValidationErrors | null => {
      const inDate = new Date(initial)
      const fiDate = new Date(control.value)

      if(fiDate.getTime() < inDate.getTime()){
        return {invalidFinalDate:'invaliDate'}
      }
      return null;
    }
  }

  compareWith(o1: any, o2: any) {
    return o1 && o2 ? o1.id === o2.id : o1 === o2;
  }  
}
