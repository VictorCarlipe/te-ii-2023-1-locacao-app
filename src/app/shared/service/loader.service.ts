import { Injectable } from "@angular/core";
import { LoadingController } from "@ionic/angular";


@Injectable({ providedIn: 'root' })
export class LoadingService {

  busyLoader: HTMLIonLoadingElement | undefined = undefined;

  constructor(private loadingController: LoadingController) { }

  on() {
    if (!this.busyLoader) {
      this.loadingController.create({
        spinner: 'dots',
      }).then((b) => {
        this.busyLoader = b;
      });
    }
    if (this.busyLoader) {
      this.busyLoader.present();
    }
  }

  off() {
    if (this.busyLoader) {
      this.busyLoader.dismiss();
    }
  }
}