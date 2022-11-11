import { IAddress } from "./IAddress";
import { IProfile } from "./IProfile";


export interface IProperty {
    id: string;
    name: string;
    imageUrl: string;
    inviteeCount: number;
    address: IAddress;
    attachements: [];
    user: {
        profile: IProfile;
        usertype: string;
        typename: string;
    },
    typename: string;
}
