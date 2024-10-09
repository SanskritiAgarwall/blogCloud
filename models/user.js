const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {type:String , required :true},
    email:{type:String , required:true , unique:true},
    password:{type:String , required:true},
    otp: { type: String }, // OTP will be a string (can also be a number)
    otpExpiry: { type: Date },
    userVerified: { type: Boolean, default: false }


  }, {timestamps:true});
  mongoose.models ={}
  export default mongoose.model("users",userSchema);