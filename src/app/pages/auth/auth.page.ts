import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/models/user.model';
import { FirebaseService } from 'src/app/services/firebase.service';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.page.html',
  styleUrls: ['./auth.page.scss'],
})
export class AuthPage implements OnInit {

  // Definición del formulario de autenticación
  form = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]), // Campo de correo electrónico con validación requerida y de formato de correo electrónico
    password: new FormControl('', [Validators.required]), // Campo de contraseña con validación requerida
  });
  
  constructor(
    private firebaseSvc: FirebaseService,
    private utilsSvc: UtilsService 
  ) { }

  ngOnInit() {
  }

  // Método para manejar el envío del formulario
  submit(){
    if(this.form.valid){ // Verificar si el formulario es válido

      // Mostrar un mensaje de carga mientras se autentica al usuario
      this.utilsSvc.presentLoading({message: 'Autenticando...'})

      // Iniciar sesión usando el servicio de Firebase con los valores del formulario
      this.firebaseSvc.login(this.form.value as User).then(async res =>{
        console.log(res); // Imprimir la respuesta de Firebase en la consola

        // Crear un objeto de usuario con la información obtenida de Firebase
        let user: User ={
          uid: res.user.uid,
          name: res.user.displayName,
          email: res.user.email
        }

        // Guardar el objeto de usuario en el almacenamiento local del navegador
        this.utilsSvc.setElementInlocalstorage('user', user);
        
        // Redirigir al usuario a la página de inicio después de iniciar sesión correctamente
        this.utilsSvc.routerLink('/tabs/home')

        // Ocultar el mensaje de carga después de completar la autenticación
        this.utilsSvc.dismissLoading();

        // Mostrar un mensaje de bienvenida al usuario utilizando un Toast
        this.utilsSvc.presentToast({
          message: `Te damos la bienvenida ${user.name}`,
          duration: 1500,
          color: 'warning',
          icon: 'person-outline'
        })

        // Restablecer el formulario después de enviarlo
        this.form.reset()
      }, error => {

        // Ocultar el mensaje de carga si ocurre un error durante la autenticación
        this.utilsSvc.dismissLoading();

        // Mostrar un Toast con el mensaje de error al usuario
        this.utilsSvc.presentToast({
          message: error,
          duration: 5000,
          color: 'warning',
          icon: 'alert-circle-outline'
        })
      
      })
    }
  }
}
