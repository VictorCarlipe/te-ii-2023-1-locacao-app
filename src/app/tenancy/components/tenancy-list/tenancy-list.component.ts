import { Component, OnInit, OnDestroy } from '@angular/core';
import { TenancyService } from '../../service/tenancy.service';
import { AlertController, LoadingController, ToastController, ViewDidLeave, ViewWillEnter } from '@ionic/angular';
import { TenancyInterface } from '../../type/tenancy.interface';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-tenancy-list',
  templateUrl: './tenancy-list.component.html',
  styleUrls: ['./tenancy-list.component.scss'],
})
export class TenancyListComponent  implements OnInit, OnDestroy, ViewDidLeave, ViewWillEnter {

  tenancys: TenancyInterface[] = [];
  subscriptions = new Subscription();

  constructor(
    private tenancyService : TenancyService,
    private alertController: AlertController,
    private loadingController: LoadingController,
    private toastController: ToastController,
    ) { }

  ngOnInit() {}

  ionViewDidLeave(): void {
    this.tenancys = [];
  }

  ionViewWillEnter(): void {
    this.list();
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  async list(){
    const busyLoader = await this.loadingController.create({spinner:'circular'})
    busyLoader.present()

    const subscription = this.tenancyService.getTenancys()
      .subscribe(async (tenancys) => {
        this.tenancys = tenancys;
        const toast = await this.toastController.create({
          color: 'success',
          message: 'Lista de locações carregada com sucesso!',
          duration: 600,
          buttons: ['x']
        })
        toast.present()
        busyLoader.dismiss();
      }, async () => {
        const alert = await this.alertController.create({
          header:'Erro',
          message: 'Não foi possível carregar a lista de locações',
          buttons:['Ok']
        })
        alert.present()
        busyLoader.dismiss();
      });
      this.subscriptions.add(subscription);
  }

  async remove(tenancy: TenancyInterface){
    const alert = await this.alertController.create({
      header: 'Confirmação de exclusão',
      message: `Deseja excluir a locação ${tenancy.location.nome} - ${tenancy.render.name}`,
      buttons: [
        {
          text: 'Sim',
          handler:() => {
            this.subscriptions.add(
              this.tenancyService.remove(tenancy).subscribe(() => this.list())
            );
          },
        },
        'Não',
      ],
    });
    alert.present();
  }
}
