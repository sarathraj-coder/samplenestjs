import { Controller, Get, Post, Body, Delete, Param } from '@nestjs/common';
import { Task } from './task.model';
import { TaskService } from './task.service';


@Controller('task')
export class TaskController {

    //
    //https://angular.io/guide/dependency-injection
    constructor(private taskService:TaskService){}

    @Get("/")
    testing(){
        return "Hello world"
    }



    //API 

    @Post("/")
    createTask(@Body() requestBodyDto:Task  ){
     return  this.taskService.createTask(requestBodyDto)
    }

    @Get("/list")
    async listTasks(){
     return  this.taskService.listTask()
    }

    @Post("/list-search")
    async listTasksSearch(@Body() requestBodyDto:Task ){
     return  this.taskService.listTaskSearch(requestBodyDto)
    }

    @Get("/:id")
    async listTasks1(@Param("id") id:string){
     return  this.taskService.viewTaskById(id)
    }


    @Delete("/:id")
    deleteTasksById(@Param("id") id:string){
     return  this.taskService.deleteById(id)
    }

    

    // Create a module named task 
    //   #nest g  module task
   // Controller and Service inside a module    
   //    #nest g  controller task
   //    #nest g  service  task

    // Controller 
       //create , update ,delete ,viewById ,list 
       //update ,delete ,viewById 
       
    // Service need to update with 
        //update ,delete ,viewById    
   

        

     // new module case 
     // id , name , details 
     // CURD -- backend (service , controller)
     // use insomnia to test all API    


}
