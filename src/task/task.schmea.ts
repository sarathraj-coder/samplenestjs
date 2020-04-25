
import * as mongoose from 'mongoose';
import { Schema } from 'mongoose';
// Table --- Collection
// Row -- Document  
export const TaskSchema = new mongoose.Schema({
  name: String,
  description: String,
  date:Date,
  completedStatus: Boolean,
});

// Table --- Collection
// Row -- Document  
export const CommentSchema = new mongoose.Schema({
    username: String,
    details: String,
    date:Date,  
    taskId:{ type: Schema.Types.ObjectId, ref: 'Task' },
  });
