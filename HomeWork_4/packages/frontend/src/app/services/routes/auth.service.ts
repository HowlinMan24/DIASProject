import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable, tap} from 'rxjs';
import {Router} from '@angular/router';
import {envApi} from '../../utils/env.utils';
import {AbstractApiService} from './abstract.api.service';
import {IUser} from '../../../../../shared/models/IUser';

@Injectable({
  providedIn: 'root'
})
export class AuthService extends AbstractApiService {
  private apiUrl = envApi;
  private currentUserSubject: BehaviorSubject<any>;
  public currentUser: Observable<any>;

  constructor(private http: HttpClient, private router: Router) {
    super();
    const token = localStorage.getItem('token');
    this.currentUserSubject = new BehaviorSubject<any>(token ? JSON.parse(token) : null);
    this.currentUser = this.currentUserSubject.asObservable();
  }

  login(username: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login`, {username, password})
      .pipe(
        tap(user => {
          if (user && user.token) {
            localStorage.setItem('token', JSON.stringify(user.token));
            this.currentUserSubject.next(user);
          }
        })
      );
  }

  logout(): void {
    localStorage.removeItem('token');
    this.currentUserSubject.next(null);
    this.router.navigate(['/login']);
  }

  register(username: string, email: string, password: string) {
    console.log(`${this.apiUrl}/create-user`)
    return this.http.post<any>(`http://localhost:3600/api/create-user`, {username, email, password});
  }

  get currentUserValue(): any {
    return this.currentUserSubject.value;
  }

  isLoggedIn(): boolean {
    return this.currentUserSubject.value != null;
  }
}
