import {TOption} from '../../models/option.type';

export interface IWinner {
  computerOption: TOption;
  result: 'user' | 'computer' | 'tie';
}

export interface IResponseError {
  error: {
    errorCode: string;
    message: string;
  }
}

export interface IResponseSuccess {
  response: {
    message: string;
  }
}

export interface ISignUpPayload {
  username: string;
  password: string;
}
