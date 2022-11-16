import { IContact,IProperty } from "../models";

export interface INode {
    id: string;
    date: string;
    maxInviteeCount: number;
    attendeeCount: number;
    showContactInformation: boolean;
    contact: IContact;
    property: IProperty;
    typename: string;
}




