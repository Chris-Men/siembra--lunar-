import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/models/user.model';
import { FirebaseService } from 'src/app/services/firebase.service';
import { UtilsService } from 'src/app/services/utils.service';
import { CustomValidatros } from 'src/app/utils/custom-validators';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.page.html',
  styleUrls: ['./sign-up.page.scss'],
})
export class SignUpPage implements OnInit {

  // Definición del formulario de registro
  form = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(4)]), // Campo de nombre con validación requerida y longitud mínima
    email: new FormControl('', [Validators.required, Validators.email]), // Campo de correo electrónico con validación requerida y de formato de correo electrónico
    password: new FormControl('', [Validators.required]), // Campo de contraseña con validación requerida
    confirmPassword: new FormControl(''), // Campo de confirmación de contraseña
  });
  
  constructor(
    private firebaseSvc: FirebaseService,
    private utilsSvc: UtilsService 
  ) { }

  ngOnInit() {
    this.confirmPasswordValidator(); // Llama a la función para validar la confirmación de la contraseña
  }

  // Función para validar la confirmación de la contraseña
  confirmPasswordValidator(){
    this.form.controls.confirmPassword.setValidators([
      Validators.required,
      CustomValidatros.matchValues(this.form.controls.password) // Utiliza un validador personalizado para comparar con la contraseña
    ]);

    this.form.controls.confirmPassword.updateValueAndValidity(); // Actualiza la validez del control de confirmación de contraseña
  }

  // Método para manejar el envío del formulario
  submit(){
    if(this.form.valid){ // Verificar si el formulario es válido

      // Mostrar un mensaje de carga mientras se registra al usuario
      this.utilsSvc.presentLoading({message: 'Registrando...'})

      // Registrar al usuario usando el servicio de Firebase con los valores del formulario
      this.firebaseSvc.signUp(this.form.value as User).then(async res =>{
        console.log(res); // Imprimir la respuesta de Firebase en la consola

        // Actualizar el nombre de usuario en Firebase
        await this.firebaseSvc.updateUser({ displayName: this.form.value.name })

        // Crear un objeto de usuario con la información obtenida de Firebase
        let user: User ={
          uid: res.user.uid,
          name: res.user.displayName,
          email: res.user.email
        }

        // Guardar el objeto de usuario en el almacenamiento local del navegador
        this.utilsSvc.setElementInlocalstorage('user', user);
        
        // Redirigir al usuario a la página de inicio después de registrarse correctamente
        this.utilsSvc.routerLink('/tabs/home')

        // Ocultar el mensaje de carga después de completar el registro
        this.utilsSvc.dismissLoading();

        // Mostrar un mensaje de bienvenida al usuario utilizando un Toast
        this.utilsSvc.presentToast({
          message: `Te damos la bienvenida ${user.name}`,
          duration: 1500,
          color: 'primary',
          icon: 'person-outline'
        })

        // Restablecer el formulario después de enviarlo
        this.form.reset();
      }, error => {

        // Ocultar el mensaje de carga si ocurre un error durante el registro
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
