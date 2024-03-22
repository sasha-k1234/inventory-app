const mongoose = require('mongoose');
const {DateTime} = require('luxon');

const Schema = mongoose.Schema;

const ProductInstanceSchema = new Schema({
    product:{type:Schema.Types.ObjectId,ref:"Product",required:true},
    status:{
        type:String,
        required:true,
        enum:["Available","Out Of Stock","Repairing"],
        default:"Repairing"
    },
    in_stock:{type:Date,default:Date.now},
});

ProductInstanceSchema.virtual("url").get(function(){
    return `/catalog/productinstance/${this._id}`;
});

ProductInstanceSchema.virtual("in_stock_formatted").get(function(){
    return DateTime.fromJSDate(this.in_stock).toLocaleString(DateTime.DATE_MED);
});

module.exports = mongoose.model("ProductInstance",ProductInstanceSchema);