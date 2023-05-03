import { LoadingController } from "@ionic/angular";

export class LoaderIndicatorService{
    busyLoader!: HTMLIonLoadingElement;

    constructor(private loadingController: LoadingController){}

    async on() {
        if(!this.busyLoader){
            this.busyLoader = await this.loadingController.create({
                spinner:'dots'
            });
        }

        if (this.busyLoader){
            this.busyLoader.present();
            return;
        }
    }

    off(){
        if(this.busyLoader){
            this.busyLoader.dismiss()
        }
    }
}