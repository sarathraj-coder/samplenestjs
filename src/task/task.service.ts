import { Injectable, NotFoundException } from '@nestjs/common';
import { Task } from './task.model';

@Injectable()
export class TaskService {
 
    taskArray:Task[] = []

    createTask(task:Task){
        this.taskArray.push(task)
        return true
    }

    listTask(){
        return this.taskArray
    }

    viewTaskById(inputId:number){
        return this.taskArray.find(item => item.id==inputId)
    }


    deleteById(inputId:number){
        var found  = this.taskArray.find(item => item.id==inputId)
        if(found){

           var filteredItems =   this.taskArray.filter(i=> i.id!=inputId)
           this.taskArray = filteredItems
           return true

        }else{
            throw new NotFoundException("task is not available")
        }
    }

   // added


}
