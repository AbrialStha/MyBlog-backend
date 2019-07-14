/**
 * This is Subscriber model
 */
import mongoose from 'mongoose';

let Schema: typeof mongoose.Schema = mongoose.Schema;

const SubscriberSchema: mongoose.Schema<any> = new Schema({
    email: {
        type: String,
        required: true
    },
    send_email: {
        type: Boolean,
        default: true
    },
    created_date: {
        type: Date,
        default: Date.now
    },
    Author: {
        type: Schema.Types.ObjectId,
        ref: "Users",
        required: true
    }
})

let Subscribers: mongoose.Model<mongoose.Document, {}> = mongoose.model(
    "Subscribers",
    SubscriberSchema
)

export default Subscribers