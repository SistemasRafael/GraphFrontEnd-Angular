import { TokenResponse } from "./token-response.model";

export interface User {
    userId : string;
    name : string;
    lastName : string;
    age : number;
    rowCreationDateTime : Date;
    rowUpdateDateTime : Date;
    email : string;
    passwordHash : string;
    refreshToken : string;
    refreshTokenExpiryTime : Date;
    tokenResponse: TokenResponse;
}