import {mongoose} from '../db';

export interface IUserAddress {
  houseNo: number;
  streetName: string;
  postCode: string;
  city: string;
  user: mongoose.Schema.Types.ObjectId;
}
