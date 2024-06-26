import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, map } from 'rxjs';
import { FirebaseService } from '../services/firebase.service';
import { UtilsService } from '../services/utils.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {


constructor(
  private firebaseSvc: FirebaseService,
  private utilSvc: UtilsService
){

}
// Si existe un usuario autenticado, permite la navegación
       
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
   
      return this.firebaseSvc.getAuthState().pipe(map(auth => {

// Si existe un usuario autenticado, permite la navegación
              if(auth){
            return true;
        }else{
          // Si no hay un usuario autenticado, redirige a la página de autenticación y bloquea la navegación
          this.utilSvc.routerLink('/auth')
          return false
        }


      }))

  }
  
}
