
import * as mongoose from 'mongoose';
import { Schema } from 'mongoose';
// Table --- Collection
// Row -- Document  
export const UserSchema = new mongoose.Schema({
      username: {type: String,required: true,unique: true,lowercase: true,trim: true,},
      password: { type: String, required: true },
      notifications: { type: Number, required: false, default: false },
      signature: { type: String, required: false },
      photo: { type: String, required: false },
      first_name: { type: String, required: false },
      last_name: { type: String, required: false },
      email: { type: String, required: false },
      department: { type: String, required: false },
      salt: { type: String },
      _roles: [{ type: Schema.Types.ObjectId, ref: 'Role' }],
});

export interface User extends mongoose.Document {
    id: string;
    username: string;
    password: string;
    salt: string;
    notifications: number;
    signature: string;
    photo: string;
    first_name: string;
    last_name: string;
    email: string;
    department: string;
    _roles: [];
  }
  