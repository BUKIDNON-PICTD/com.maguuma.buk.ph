import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(private router: Router, public authService: AuthService) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const roles = route.data.roles;
    if (this.authService.isAuthenticated() && roles.includes(this.authService.user.role.code)) {
      return true;
    }
    return false;
  }
}
