import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { LocationInterface } from '../../type/location.interface';
import { Subscription } from 'rxjs';
import { AlertController, LoadingController, ToastController, ViewDidLeave, ViewWillEnter } from '@ionic/angular';
import { LocationService } from '../../service/location.service';
import { LoaderIndicatorService } from 'src/app/shared/service/loader.inidcator.service';

@Component({
  selector: 'app-location-list',
  templateUrl: './location-list.component.html',
  styleUrls: ['./location-list.component.scss'],
})
export class LocationListComponent  implements ViewDidLeave, ViewWillEnter, OnDestroy {

  locations: LocationInterface[] = [];
  busyloader!: LoaderIndicatorService;

  subscriptions = new Subscription();

  constructor(
    private alertController: AlertController,
    private toastController:ToastController,
    private locationService: LocationService,
    private loadingController: LoadingController
  ) { }

  ionViewDidLeave(): void {
      this.locations = []
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

    this.subscriptions.add(
      this.locationService.getLocations().subscribe(async (locations) => {
        
        this.locations = locations;
        
        const toast = await this.toastController.create({
          color:'success',
          message:'Lista de locais carregada com sucesso',
          duration:600,
          buttons:['x']
        })
        toast.present();
        busyLoader.dismiss();
      }, async() => {
        const alert = await this.alertController.create({
          header:'Erro!',
          message:'Não foi possível carregar a lista de Locais',
          buttons:['Ok']
        })
        alert.present();
        busyLoader.dismiss();
      })
    )
  }

  async remove(location: LocationInterface){
    const alert = await this.alertController.create({
      header: 'Confirmação de Exclusão',
      message: `Deseja realmente excluir o local ${location.nome}?`,
      buttons: [
        {
          text: 'Sim',
          handler:() => {
          this.subscriptions.add(
            this.locationService.remove(location).subscribe(() => this.list())
          );
         },
        },
      ],
    });
    alert.present();
  }
}