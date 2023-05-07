import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { StudentInterface } from '../../type/student.interface';
import { Subscription } from 'rxjs';
import { AlertController, LoadingController, ToastController, ViewDidLeave, ViewWillEnter } from '@ionic/angular';
import { StudentService } from '../../service/student.service';
import { LoadingService } from 'src/app/shared/service/loader.service';

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
})
export class StudentListComponent  implements ViewDidLeave, ViewWillEnter, OnDestroy{
  students: StudentInterface[] = [];
  busyLoader!: LoadingService;

  subscriptions = new Subscription();

  constructor(
    private alertController: AlertController,
    private toastController:ToastController,
    private studentService: StudentService,
    private loadingController: LoadingController
  ) { }

  ionViewDidLeave(): void {
      this.students = []
  }

  ionViewWillEnter(): void {
      this.list();
  }

  ngOnDestroy(): void {
      this.subscriptions.unsubscribe();
  }

  async list(){
    const busyLoader = await this.loadingController.create({ spinner: 'circular' })
    busyLoader.present()

    const subscription = this.studentService.getStudents()
      .subscribe(async (students) => {
        
        this.students = students;
        
        const toast = await this.toastController.create({
          color:'success',
          message:'Lista de Alunos carregada com sucesso',
          duration:600,
          buttons:['x']
        })
        toast.present();
        busyLoader.dismiss()
      }, async() => {
        const alert = await this.alertController.create({
          header:'Erro!',
          message:'Não foi possível carregar a lista de Alunos',
          buttons:['Ok']
        })
        alert.present();
        busyLoader.dismiss()
      });
      this.subscriptions.add(subscription);
  }

  async remove(student: StudentInterface){
    const alert = await this.alertController.create({
      header: 'Confirmação de Exclusão',
      message: `Deseja realmente excluir o aluno ${student.name}?`,
      buttons: [
        {
          text: 'Sim',
          handler:() => {
          this.subscriptions.add(
            this.studentService.remove(student).subscribe(() => this.list())
          );
         },
        },
        'Não',
      ],
    });
    alert.present();
  }
}
