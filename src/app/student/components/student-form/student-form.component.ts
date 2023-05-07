import { Component, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { StudentService } from '../../service/student.service';
import { AlertController, IonDatetime } from '@ionic/angular';
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
  id!: number

  constructor(
    private activateRoute: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    private studentService: StudentService,
    private alertController: AlertController,
    private loadingService: LoadingService
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

  private loadStudentOnEditMode(){
    const [url] = this.activateRoute.snapshot.url;
    this.editMode = url.path === 'edit';
    this.createMode = !this.editMode;

    if(this.editMode){
      const id = this.activateRoute.snapshot.paramMap.get('id');
      this.id = id ? parseInt(id):-1;

      if(this.id !== -1){
        //this.loadingService.on();
        this.studentService.getStudent(this.id).subscribe((student) => {
          this.studentForm.patchValue({
            id: student.id,
            name: student.name,
            datebirth: student.datebirth,
            gender: student.gender,
            email: student.email,
            fone: student.fone,
            course: student.course,
            phase: student.phase.toString()
          })
        })
        //this.loadingService.off();
      }
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe()
  }

  private initializeForm(){
    this.studentForm = this.formBuilder.group({
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
      fone: [
        '48999999999',
        [ Validators.required,
          Validators.minLength(11),
        ]
      ],
      course: 'adm',
      phase: '1',
    })
  }

  validMinAge(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const minute = 1000 * 60;
      const hour = minute * 60;
      const day = hour * 24;
      const year = day * 365;
      
      const value =  new Date(control.value)
      const now = new Date(Date.now())
      const diff = (now.getTime() / year - value.getTime() / year)
      if (diff < 16){
        return {invalidAge: value}
      }else if(diff > 150){
        return {invalidAge: value}
      }
      return null;
    };
  }
}
