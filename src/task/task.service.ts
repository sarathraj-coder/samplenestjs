import { Injectable, NotFoundException } from '@nestjs/common';
import { Task } from './task.model';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { async } from 'rxjs/internal/scheduler/async';
import { MyLogger } from 'src/my-logger';
@Injectable()
export class TaskService {
 
   // taskArray:Task[] = []

    constructor(@InjectModel('Task') private taskModel: Model<Task>,
    private logger: MyLogger,
    ){
        
    }

    createTask(task:Task){

      
       var newTask = new this.taskModel({
           name : task.name,
           description:task.description,
           data:task.date,
           completedStatus: task.completedStatus
       })
      var i =  newTask.save()
       // this.taskArray.push(task)
       // this.taskModel.save()
       this.logger.error("Saved... ","Testing")
       return i
    }

    async listTask(){
        //return this.taskArray
        // return null
       var items = await this.taskModel.find().exec();
       console.log(items)
       return items.map( i => ({
         id:i.id,  
         name : i.name,
         description: i.description
       }) )
    }

    async listTaskSearch(task:Task){
        //return this.taskArray
        // return null
       var items = await this.taskModel.find({name:task.name}).exec();
       console.log(items)
       return items.map( i => ({
         id:i.id,  
         name : i.name,
         description: i.description
       }) )
    }

   async viewTaskById(inputId:string){
       // return this.taskArray.find(item => item.id==inputId)
       // return null
       var item = await this.taskModel.findById(inputId);
       console.log(item)
       return item
    }


     async   deleteById(inputId:string){
         var itemFound =  await this.viewTaskById(inputId)
        var item = await this.taskModel.deleteOne(itemFound);
        console.log(item)
        return item
        

    }

   // added


}
