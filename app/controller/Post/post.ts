/**
 * This is Post Model
 */
import mongoose from "mongoose";

let Schema: typeof mongoose.Schema = mongoose.Schema;

const PostSchema: mongoose.Schema<any> = new Schema({
  title: {
    type: String,
    required: true
  },
  description: String,
  created_date: {
    type: Date,
    default: Date.now
  },
  updated_date: {
    type: Date,
    default: null
  },
  status: {
    type: String,
    enum: ["DRAFT", "PUBLISHED"],
    default: "DRAFT"
  },
  //Meta Data Section
  summary: String,
  featured_image: String,
  category: {
    type: Schema.Types.ObjectId,
    ref: "Categories"
  },
  tags: {
    type: [String],
    default: []
  },
  Author: {
    type: Schema.Types.ObjectId,
    ref: "Users"
  },
  published_date: Date,
  //SEO DATA
  url_slug: String,
  seo_title: String,
  meta_description: String
});

let Posts: mongoose.Model<mongoose.Document, {}> = mongoose.model(
  "Posts",
  PostSchema
);
export default Posts;
