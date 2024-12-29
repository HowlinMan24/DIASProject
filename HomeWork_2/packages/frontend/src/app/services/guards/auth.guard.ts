import {Injectable} from '@angular/core';
import {CanActivate, Router} from '@angular/router';
import {AuthenticationUtilsService} from '../services-utils/AuthenticationUtilsService';


@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {
    constructor(
        private router: Router,
        private authUtils: AuthenticationUtilsService
    ) {}
    canActivate(): boolean {
        if (this.authUtils.isLoggedIn()) {
            return true; // User is logged in, allow access to the route
        } else {
            this.router.navigate(['/login']); // User is not logged in, redirect to login page
            return false;
        }
    }
}
