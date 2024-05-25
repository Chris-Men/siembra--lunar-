import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { User } from '../models/user.model';
import { getAuth, updateProfile } from "firebase/auth";
import { UtilsService } from './utils.service';
@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  constructor(
    private auth: AngularFireAuth,
    private db: AngularFirestore,
    private utilsSvc: UtilsService
  ) { }

   // Métodos de autenticación

  // Método para iniciar sesión
  login(user: User){
    return this.auth.signInWithEmailAndPassword(user.email, user.password)
  }

  // Método para registrarse
  signUp(user: User){
    return this.auth.createUserWithEmailAndPassword(user.email, user.password)
  }

  updateUser(user: any){
    const auth = getAuth ();
    return updateProfile(auth.currentUser, user)
  }
// Método para obtener el estado de autenticación
  getAuthState(){
    return this.auth.authState
  }
  // Método para cerrar sesión
  async singOut(){
    await this.auth.signOut();
    this.utilsSvc.routerLink('/auth');
    localStorage.removeItem('user');
    
  }
}
