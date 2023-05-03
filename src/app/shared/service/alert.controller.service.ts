import { AlertButton, AlertController } from "@ionic/angular";
import { Observable } from "rxjs";

export class AlertControlerService{
    alert!: HTMLIonAlertElement;

    constructor(private alertController: AlertController){}

    async createAlert(sHeader:string, sMessage:string, sButton:(string | AlertButton)[] | undefined): Promise<HTMLIonAlertElement>{
        this.alert = await this.alertController.create({
            header: sHeader,
            message: sMessage,
            buttons: sButton
        })

        return this.alert;
    }
}