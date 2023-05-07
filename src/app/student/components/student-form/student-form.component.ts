import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { StudentService } from '../../service/student.service';
import { AlertController } from '@ionic/angular';
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
        'Nome qualquer'
      ],
      datebirth: '2000-01-01',
      gender: 'M',
      email: 'nomequalquer@mailto.com',
      fone: '48999999999',
      course: 0,
      phase: 0,
    })
  }
}
