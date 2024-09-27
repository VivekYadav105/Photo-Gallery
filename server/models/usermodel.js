const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  fname: { type: String, required: true },
  lname: { type: String, required: true },
  email: { type: String, required: true, immutable: true, unique: true },
  password: { type: String, required: true },
  createdAt: { type: Date, default: Date.now(), immutable: true },
  photos:[{type:mongoose.Schema.Types.ObjectId,ref:'photo'}]
});

const userModel = mongoose.model("user", userSchema);


module.exports = userModel;
