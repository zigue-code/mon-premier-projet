import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate";

let bookSchema = new mongoose.Schema({
    title:{type:String, required:true},
    author:{type:String, required:true},
    price:{type:Number, required:true},
    publishedDate:{type:Date, required:true, default:new Date()},
    available:{type:Boolean, required:true, default:true},
    quantity:{type:Number, required:true, default:0}
});

// adding pagination plugin to schema (apply plugin before creating the model)
bookSchema.plugin(mongoosePaginate);

const Book = mongoose.model('Book', bookSchema); // creating model from schema
export default Book; // exporting the model