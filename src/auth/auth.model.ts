export class UserJwt{
    username:String 
    first_name:String 
    last_name:String
    token:String
    status:Boolean
    message:String
}

export interface JwtPayload{
    username:String
    first_name:String
    last_name:String 
}