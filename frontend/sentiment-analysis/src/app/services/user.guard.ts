import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class UserGuard implements CanActivate {
  constructor(private afAuth: AngularFireAuth, private router: Router) { }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    
      var loggedIn;;
      this.afAuth.authState.subscribe(user => {
        if(user) {
          loggedIn = true;
        } else {
          loggedIn = false;
          //redirect to login
          this.router.navigate(['/login']);
        }
      });

    if(loggedIn) {
      return true;
    }
    return false;
  }
  
}
