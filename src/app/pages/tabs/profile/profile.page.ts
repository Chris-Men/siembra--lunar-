import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { FirebaseService } from 'src/app/services/firebase.service';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
// Objeto para almacenar los datos del usuario
user = {} as User

  constructor(
    private firebasSvc: FirebaseService,
    private utilsSvc:   UtilsService
  ) { }

  ngOnInit() {
  }

 // Se ejecuta cada vez que la página se muestra
  ionViewWillEnter() {
    this.getUser() // Obtiene los datos del usuario
  }


 // Método para obtener los datos del usuario
  getUser(){
    return this.user = this.utilsSvc.getElementFromLocalStorage('user')
  }
 // Método para cerrar sesión
  signOuth() {
    this.utilsSvc.presentAlert({
        header: 'Cerrar Sesión',
        message: '¿Quieres cerrar sesión?',
        mode: 'ios',
        buttons: [
          {
            text: 'Cancelar',
            role: 'cancel',
          }, {
            text: 'Si, cerrar',
            handler: () => {
              this.firebasSvc.singOut();
            }
          }
        ]
    })
  }

}
