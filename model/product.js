const mongoose = require("mongoose");
const { Schema } = mongoose;

//Schema
const productSchema = new Schema({
  title: {type: String , required : true , unique : true},
  description:  {type: String},
  price: { type: Number, min: [0,'wrong price']},
  discountPercentage:  { type: Number, min: [0,'wrong min discount'], max: [50,'wrong max discount'] },
  rating: {type:Number,default:0},
  brand: { type: String, min: [0,'wrong min rating'], max: [5,'wrong max rating'] },
  category:  {type: String , required : true},
  thumbnail:  {type: String , required : true},
  images: [String]
});

exports.Product = mongoose.model("Product", productSchema);
