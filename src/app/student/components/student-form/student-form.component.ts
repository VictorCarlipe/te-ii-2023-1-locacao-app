import { Component, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription, empty } from 'rxjs';
import { StudentService } from '../../service/student.service';
import { AlertController, LoadingController } from '@ionic/angular';
import { LoadingService } from 'src/app/shared/service/loader.service';

@Component({
  selector: 'app-student-form',
  templateUrl: './student-form.component.html',
  styleUrls: ['./student-form.component.scss'],
})
export class StudentFormComponent  implements OnInit, OnDestroy {

  studentForm!:FormGroup;
  subscriptions = new Subscription();
  createMode: boolean = false;
  editMode: boolean = false;
  id!: string | null

  constructor(
    private activateRoute: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    private studentService: StudentService,
    private alertController: AlertController,
    private loadingService: LoadingService,
    private loadingController: LoadingController
  ) { }

  ngOnInit():void {
    this.loadingService
    this.initializeForm();
    this.loadStudentOnEditMode();
  }

  save(): void {
    if(this.createMode){
      this.subscriptions.add(
        this.studentService.save(this.studentForm.value).subscribe(
          () => {
            this.router.navigate(['./student'])
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
      this.studentService.update({
        ...this.studentForm.value,
        id: this.id
      }).subscribe({
        next:() => {
          this.router.navigate(['./student'])
        },
        error: async () => {
          const alerta = await this.alertController.create({
            header: 'Erro',
            message: 'Não foi possível salvar os dados do aluno',
            buttons: ['Ok']
          })
          alerta.present()
        }
      })
    }
  }

  cancel():void{
    this.router.navigate(['./student'])
  }

  private async loadStudentOnEditMode(){
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
        this.studentService.getStudent(this.id).subscribe((student) => {
          this.studentForm.patchValue({
            id: student.id,
            registration: student.registration,
            name: student.name,
            datebirth: student.datebirth,
            gender: student.gender,
            email: student.email,
            phone: student.phone,
            course: student.course,
            phase: student.phase
          })
          //this.loadingService.off()
        })
      }
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe()
  }

  private initializeForm(){
    this.studentForm = this.formBuilder.group({
      registration: [
        100000000,
        [ Validators.required,
          Validators.min(100000000),
          Validators.max(999999999)
        ]
      ],
      name: [
        'Nome qualquer',
        [
          Validators.required,
          Validators.maxLength(80)
        ]
      ],
      datebirth: [
        '2000-01-01',
        this.validMinAge()
      ],
      gender: 'M',
      email: [
        'nomequalquer@mailto.com',
        Validators.email
      ],
      phone: [
        48999999999,
        [ Validators.required,
          Validators.min(10000000000),
          Validators.max(99999999999)
        ]
      ],
      course: 'adm',
      phase: '1',
    })
  }

  validMinAge(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      let minute = 1000 * 60;
      let hour = minute * 60;
      let day = hour * 24;
      let year = day * 365;
      
      let value =  new Date(control.value)
      let now = new Date(Date.now())
      let diff: number = (now.getTime() / year - value.getTime() / year)
      if (diff < 16){
        return {invalidAge: diff}
      }else if(diff > 150){
        return {invalidAge: diff}
      }
      return null;
    };
  }
}
