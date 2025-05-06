import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {TOption} from '../../models/option.type';
import {IWinner} from './api.interfaces';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  baseServerUrl = environment.baseServerUrl;
  winnerEndpoint = 'api/winner';
  signupEndpoint = 'api/auth/signup';
  http = inject(HttpClient);

  determineWinner(userOption: TOption): Observable<IWinner> {
    return this.http.post<IWinner>(
      `${this.baseServerUrl}${this.winnerEndpoint}`,
      {userOption: userOption}
    )
  }

  signup(username: string, password: string): Observable<{message: string}> {
    return this.http.post<{message: string}>(
      `${this.baseServerUrl}${this.signupEndpoint}`,
      {username, password}
    )
  }
}
