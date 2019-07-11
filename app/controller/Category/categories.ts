/**
 * This is category model
 */
import mongoose from 'mongoose';

let Schema: typeof mongoose.Schema = mongoose.Schema;

const CategorySchema: mongoose.Schema<any> = new Schema({
    title: {
        type: String,
        required: true
    },
    created_date: {
        type: Date,
        default: Date.now
    },
    Author: {
        type: Schema.Types.ObjectId,
        ref: "Users"
    }
})

let Categories: mongoose.Model<mongoose.Document, {}> = mongoose.model(
    "Categories",
    CategorySchema
)

export default Categories