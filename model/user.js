const mongoose = require("mongoose");
const { Schema } = mongoose;
const validator = require("validator");

const userSchema = new Schema({
  firstName: {
    type: String,
    required: true,
    max: [16, "max length should be 16"],
  },
  lastName: {
    type: String,
    max: [16, "max length should be 16"],
  },
  age: {
    type: Number,
    min: [12, "min age is 12"],
    max: [100, "max age is 100"],
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
    validate: {
      validator: function(value){
        return validator.isEmail(value) && value.includes("@") && value.includes(".");
      },
      message: "Please Enter a valid email address",
    },
  },
  address: new Schema({
    postalCode: { type: Number, required: true },
    state: { type: String, required: true },
    phone: { 
      type: String, 
      validate: {
        validator: function(value){
          return validator.isMobilePhone(value);
        },
        message: "Please Enter a valid phone number",
      }
    }
  })
});

exports.User = mongoose.model('User',userSchema);
