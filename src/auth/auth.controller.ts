import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { User } from './auth.schema';

@Controller('auth')
export class AuthController {

  //Registation
  //1)  Username , password , first_name,last_name , role etc  
  //2)  service pass valid 
  //  
     constructor(private authService:AuthService){

     }

     @Post("/registration")
     async  registion(@Body() user:User):Promise<Boolean>{
       return await this.authService.userCreation(user)
     }



}
