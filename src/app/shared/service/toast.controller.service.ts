import { ToastButton, ToastController } from "@ionic/angular";

export class ToastControllerService{
    toast!: HTMLIonToastElement;

    constructor(private toastController: ToastController){}

    async createToast(sColor:string, sMessage:string, nDuration:number, sButton:(string | ToastButton)[] | undefined):Promise<HTMLIonToastElement>{
        this.toast = await this.toastController.create({
            color:sColor,
            message:sMessage,
            duration:nDuration,
            buttons:sButton
        })

        return this.toast;
    }
}