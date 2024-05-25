import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { AlertController, AlertOptions, LoadingController, LoadingOptions, ToastController, ToastOptions } from "@ionic/angular";
 
@Injectable({
    providedIn: 'root'

})
export class UtilsService{
    constructor(
        private loadingController: LoadingController,
        private router: Router,
        private toastController: ToastController,
        private alertController: AlertController
    ){}

// Método para mostrar un mensaje de carga
    async presentLoading(opts?: LoadingOptions) {
        const loading = await this.loadingController.create(opts);
        await loading.present();
    }
// Método para ocultar el mensaje de carga
    async dismissLoading(){
        return await this.loadingController.dismiss()
    }
// Métodos para trabajar con el almacenamiento local

    // Método para guardar un elemento en el almacenamiento local
    setElementInlocalstorage(key: string, element: any){
        return localStorage.setItem(key, JSON.stringify(element))

    }
 // Método para obtener un elemento del almacenamiento local
    getElementFromLocalStorage(key: string){
        return JSON.parse(localStorage.getItem(key));
    }

    async presentToast(opts: ToastOptions) {
        const toast = await this.toastController.create(opts);
        toast.present();
    }

    // Método para redirigir a una ruta específica
    routerLink(url: string){
        return this.router.navigateByUrl(url);
    }

 // Método para mostrar un cuadro de diálogo de alerta
    async presentAlert(opts: AlertOptions) {
        const alert = await this.alertController.create(opts);
    
        await alert.present();
    }
}