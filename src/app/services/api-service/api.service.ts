import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {TOption} from '../../models/option.type';
import {IResponseSuccess, ISignUpPayload, IWinner} from './api.interfaces';
import {environment} from '../../../environments/environment';
import {ApiPath} from './paths';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  /**
   * Base server url based on the environment: production/dev
   */
  baseServerUrl = environment.baseServerUrl;

  /**
   * Used to performed http requests
   */
  private readonly http = inject(HttpClient);

  determineWinner(userOption: TOption): Observable<IWinner> {
    return this.http.post<IWinner>(
      `${this.baseServerUrl}${ApiPath.winnerEndpoint}`,
      {userOption: userOption}
    )
  }

  signup(signUpData: ISignUpPayload): Observable<IResponseSuccess> {
    return this.http.post<IResponseSuccess>(
      `${this.baseServerUrl}${ApiPath.signupEndpoint}`,
      signUpData
    )
  }
}
