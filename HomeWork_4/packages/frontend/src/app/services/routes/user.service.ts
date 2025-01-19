import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {AbstractApiService} from "./abstract.api.service";
import {IUser} from '../../../../../shared/models/IUser';
import {envApi} from '../../utils/env.utils';

@Injectable()
export class UserService extends AbstractApiService {

  private URL = `${envApi}/user`;

  constructor(private http: HttpClient) {
    super()
  }

  createUser(user: IUser) {
    return this.http.post<IUser>(`${this.URL}`, user, {headers: this.getAuthHeaders()});
  }
}
