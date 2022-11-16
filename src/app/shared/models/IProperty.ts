import { IUser,IAddress } from "../models";
export interface IProperty {
    id: string;
    name: string;
    imageUrl: string;
    inviteeCount: number;
    address: IAddress;
    attachements: [];
    user:IUser,
    typename: string;
}
