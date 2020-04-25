import { Injectable, InternalServerErrorException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { User } from './auth.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
@Injectable()
export class AuthService {

     constructor(@InjectModel('User') private userModel: Model<User>){

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



    //5.1 
   async hashpassword(password,salt):Promise<String>{
        return  bcrypt.hash(password,salt)
    }





}
