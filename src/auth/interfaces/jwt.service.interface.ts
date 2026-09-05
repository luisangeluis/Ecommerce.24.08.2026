export interface JWTServiceInterface{
    generateToken(userId:string):string;
}