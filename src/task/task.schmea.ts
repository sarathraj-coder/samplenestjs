
import * as mongoose from 'mongoose';
// Table --- Document 
export const TaskSchema = new mongoose.Schema({
  name: String,
  description: String,
  date:Date,
  completedStatus: Boolean,
});
