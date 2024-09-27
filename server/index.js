const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const userRouter = require("./routes/userroutes");
const morgan = require("morgan");
const photoRouter = require('./routes/photoroutes')

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

app.use("/user", userRouter);
app.use("/photo",photoRouter)

app.get('/',(req,res,next)=>{
  console.log(req.headers)
  console.log(req.get('referer'))
  return res.send(JSON.stringify(req.get("origin")))
})

app.listen(PORT, (err) => {
  console.log("connected to server succesfully", PORT);
});
