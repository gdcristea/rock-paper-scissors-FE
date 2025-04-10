import {TOption} from '../../models/option.type';

export interface IWinner {
  computerOption: TOption;
  result: 'user' | 'computer' | 'tie';
}
