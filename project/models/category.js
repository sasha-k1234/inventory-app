const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const categorySchema = new Schema({
    name:{type:String,required:true,maxLength:100,minLength:4},
});

categorySchema.virtual("url").get(function(){
    return `/catalog/category/${this._id}`;
});

module.exports = mongoose.model("Category",categorySchema);