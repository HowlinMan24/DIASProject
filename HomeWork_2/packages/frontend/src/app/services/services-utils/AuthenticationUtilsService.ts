import {Injectable} from "@angular/core";

@Injectable()
export class AuthenticationUtilsService {


  logout(): void {
    localStorage.removeItem('token'); // Remove token from local storage on logout
    window.location.href = 'login'
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token'); // Check if token exists in local storage
  }
}
