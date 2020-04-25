import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, Length, IsDate } from 'class-validator';
export class Task{
    id:number;
    
    @ApiProperty()
    @IsNotEmpty()
    @Length(10, 20)
    name:string;
    @ApiProperty()
    @Length(10, 20)
    description:string;
    @ApiProperty()
 
    date:Date
    @ApiProperty()
    completedStatus:boolean;
}