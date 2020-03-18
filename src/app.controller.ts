import { Controller, Get, Param, Post, Body, NotFoundException, Put, Delete } from '@nestjs/common';
import { AppService } from './app.service';
import { Student } from './student.model';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  //   "www.sample.com/testing "

  // Port number 65536 --- > 1024 -- reserverd port 
  // 80 , 21 ,22 -- 1024 
  // 3001,    ---  65536 
  // GET -- limited , exposed  in url , 
  // POST -- stream , not exposed 
  //https://www.w3schools.com/tags/ref_httpmethods.asp
  //  controller(model) --- service (business)(model) --- class(model) --- daabase (model)
    
  @Get("/testing")
  getData(){
    return "Hello world" //string  rare 
  }


  //Data passing from webpages or other resources(mobile,thridparty apps etc )
  // parameter --form 
  // url 
  // raw type --- JSON / xml  -- JSON --- front end -- process Model --- json respond 
  

  
  
  students:Student[] = []
  
  @Post("/create-stu")
  createStudent(@Body() studentDto:Student){
    //console.log(studentDto);
    this.students.push(studentDto)  // DTO - Data transfer object 
    console.log("saved");
    return studentDto
  }

  @Get("/get-stu")
  getStudents(){
    return this.students
  }

  @Get("get-stu/:id")
  getStudent(@Param("id") id:number){
   var found =  this.students.find(i => i.id==id)
   if(found){
     return found
   }else {
    // return "Not item found"
    // This is small change 
     throw new NotFoundException("Item not found")
   }
  }

  //input 
  // update 1  : id  
  //  details  student
  @Put("/update/:id")
  update(@Param("id") id:number,@Body() newStudentDetails:Student){
    var found =  this.students.find(i => i.id==id)
    if(found){
     var items =  this.students.filter(i => i.id != id )
     items.push(newStudentDetails)
     this.students = items
    }else {
     // return "Not item found"
      throw new NotFoundException("Item not found")
    }
  }


  //delete id 
  @Delete("remove-stu/:id")
  deleteStudent(@Param("id") id:number){
   var found =  this.students.find(i => i.id==id)
   if(found){
    var items =  this.students.filter(i => i.id != id )
    this.students = items
   }else {
    // return "Not item found"
     throw new NotFoundException("Item not found")
   }
  }
// This is change 












  // Html --> students 
  // print 


}


