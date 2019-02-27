/**
 * This is User Model
 */
import mongoose from "mongoose";

let Schema: typeof mongoose.Schema = mongoose.Schema;

const UserSchema: mongoose.Schema<any> = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  avatar: {
    type: String
  },
  created_date: {
    type: Date,
    required: true,
    default: Date.now
  }
});

let Users: mongoose.Model<mongoose.Document, {}> = mongoose.model(
  "Users",
  UserSchema
);
export default Users;
