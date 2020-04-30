import { Injectable, InternalServerErrorException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { User } from './auth.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { JwtService } from '@nestjs/jwt';
import { UserJwt, JwtPayload } from './auth.model';
@Injectable()
export class AuthService {

     constructor(@InjectModel('User') private userModel: Model<User>,
     private jwtService: JwtService){

     }

    // 3) Registion 
    // 4) User check , exception handling 
    // 5) if valid password encrypt 5.1
    // //salt - unique    const salt = await bcrypt.genSalt(); 
    // 6) Db save 
    // 7) return 
     async userCreation(user:User):Promise<Boolean>{
       if(user.username && user.password){
            try{
             var salt = await bcrypt.genSalt()
             var password = user.password
             var encPassword = await this.hashpassword(password,salt)
             // Db save
             var newUser = new this.userModel({
                username : user.username,
                password:encPassword,
                salt:salt,
                first_name: user.first_name,
                last_name:user.last_name
            })
            const result = await   newUser.save()
            console.log("count " + result)
            return true;
            }catch(error ){
                console.log(error)
                if(error.code == 11000){
                    throw new InternalServerErrorException("Username invalid");
                }else{
                throw new InternalServerErrorException();
                }
       
            }
   
       }else{
           return false
       } 
     } 

     // login
     // 1) user name , password 
     // data --> user get username 
     // given pass , existing salt =>  hash() enc .. password 1
     // password  ==== password 1
     // user valid 
     // mobile sms --> 1234    otp 
     
   
     // invalid 
     // token ---> permissions , roles , email 
     // return  to client 

    
     async userValidation(user:User):Promise<UserJwt>{
        
        const u_fail = new UserJwt()
        u_fail.status = true
        u_fail.message = "failed"

        if(user.username && user.password){
                var userValid = await this.findUserByName(user.username)
                if(userValid!=null){
                    debugger
                     var passwordGenerated  =  await  this.hashpassword(user.password,userValid.salt)
                     console.log(passwordGenerated)
                     console.log(userValid.password)
                     if(passwordGenerated === userValid.password){
                     var username =    user.username 
                     var first_name = userValid.first_name
                     var last_name = userValid.last_name
                        // token store 
                        // username 
                        // first_name 
                        const body:JwtPayload = { username,first_name,last_name };
                        const accessToken = await this.jwtService.sign(body)
                         const u = new UserJwt()
                         u.token = accessToken;
                         u.first_name = userValid.first_name
                         u.username = userValid.username 
                         u.last_name = userValid.last_name
                         u.status = true
                         u.message = "success"
                        return u;
                     }
                     else{
                        return u_fail
                     }
                }else{
                    return u_fail
                } 
        }else{
            return u_fail
        } 
      } 


    //5.1 
   async hashpassword(password,salt):Promise<String>{
        return  bcrypt.hash(password,salt)
    }

     async findUserByName(username:String):Promise<User>{
        var item = await this.userModel.findOne({username});
        console.log(item)
        return item
     }

    





}
