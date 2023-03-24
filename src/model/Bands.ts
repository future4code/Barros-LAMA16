import { AuthenticatorData } from "./User";

export interface RegisterBands{
    nameBand: string,
    musicGenre:string,
    responsible:string,
    authToken:AuthenticatorData
}