const mongoose = require("mongoose");
const bcrypt = require("bcryptjs")

const userSchema = new mongoose.Schema({
  fname: { type: String, required: true },
  lname: { type: String, required: true },
  email: { type: String, required: true, immutable: true, unique: true },
  password: { type: String, required: true },
  createdAt: { type: Date, default: Date.now(), immutable: true },
  sec: { type: String, default: "-" },
  branch: { type: String },
  mobileNo: { type: Number, default: 0 },
  sem: { type: Number },
  DoB: { type: Date, default: null },
});

// userSchema.pre('save',async function(next){
//     try{
//         console.log("hash method is called")
//     }
//     catch{

//     }
// })

const userModel = mongoose.model("user", userSchema);


module.exports = userModel;
