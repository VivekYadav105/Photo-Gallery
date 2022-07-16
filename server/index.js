const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const userRouter = require("./routes/userroutes");
const User = require("./models/usermodel");
const morgan = require("morgan");

const app = express();

const PORT = process.env.PORT;

mongoose
  .connect(
    "mongodb+srv://vivek:1234567890@cluster0.ydumq.mongodb.net/authentication"
  )
  .then(() => {
    console.log("connected to database successfully");
  })
  .catch((err) => {
    console.log(err.message);
  });

app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use("/", userRouter);

app.listen(PORT, (err) => {
  console.log("connected to server succesfully", PORT);
});
