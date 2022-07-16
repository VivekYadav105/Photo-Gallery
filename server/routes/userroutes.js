const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
console.log(Number(process.env.NODE_TOKEN_TEMP_EXPIRE))

const User = require("../models/usermodel");
const sendmail = require("../helper/sendlink");
const userRouter = express.Router();

userRouter.get("/", (req, res) => {
  res.send("Hello world");
});

userRouter.post("/signup", async (req, res) => {
  console.log("signup initalized");
  
  const { fname, lname, email, password } = await req.body;
  const encryptedPassword = await bcrypt.hash(
    password,
    Number(process.env.NODE_SALT)
  );
  try {
    if (await User.findOne({ email: email })) {
      res.status(302);
      res.json({ msg: "user already found in database", status: 302 });
    } else {
      const token = jwt.sign(
        {
          email: email,
          fname: fname,
          lname: lname,
          password: password,
          encryptedPassword: encryptedPassword,
        },
        process.env.NODE_SECRET_KEY,
        { expiresIn: Number(process.env.NODE_TOKEN_TEMP_EXPIRE) }
      );
      console.log(jwt.decode(token));
      const emailStatus = await sendmail(email, "tempuser", token, "verify");
      if (emailStatus.status == 200) {
        res.status(200);
        res.json({ ...emailStatus, token: token });
      }
    }
  } catch (err) {
    console.log(err)
    res.status(500);
    res.json({ msg: "internal server error", status: 500 });
  }
  return res;
});

userRouter.post("/verify", async (req, res) => {
  try {
    const token = await req.body.userToken;
    console.log(jwt.verify(token, process.env.NODE_SECRET_KEY))
    if (jwt.verify(token, process.env.NODE_SECRET_KEY)) {
      const userData = await jwt.decode(token, { complete: true }).payload;
      const newUser = await User.create({
        email: userData.email,
        password: userData.encryptedPassword,
        fname: userData.fname,
        lname: userData.lname,
      });
      res.json({ status: 201, msg: "user created succesfully" });
    } else {
      res.json({ status: 400, msg: "Invalid request" });
    }
    return res;
  } catch (err) {
    res.json({
      status: 403,
      msg: "link expired\n please signup again for new link",
    });
  }
});

userRouter.post("/login", async (req, res) => {
  const email = await req.body.email;
  const password = await req.body.password;
  const user = await User.findOne({ email: email });
  const passwordCheck = await bcrypt.compare(password, user.password);

  if (user) {
    if (passwordCheck) {
      const token = jwt.sign(
        {
          email: email,
          password: password,
        },
        process.env.NODE_SECRET_KEY,
        { expiresIn: process.env.NODE_TOKEN_MAIN_EXPIRE }
      );
      res.status(200);
      res.json({ msg: "user logged in succesfully", status: 200, user: token });
    } else {
      res.status(401);
      res.json({ msg: "password is incorrect", status: 401, user: false });
    }
  } else {
    res.status(404);
    res.json({ msg: "user not found", status: 404, user: false });
  }
  return res;
});

userRouter.post("/forgotpassword", async (req, res) => {
  const email = await req.body.email;
  const user = await User.findOne({ email: email });

  if (user) {
    const token = jwt.sign(
      { userid: user._id, password: " " },
      process.env.NODE_SECRET_KEY_2,
      { expiresIn: Number(process.env.NODE_TOKEN_TEMP_EXPIRE) }
    );

    const result = await sendmail(email, user._id, token, "resetPassword");
    res.json(result);
  } else {
    res.json({
      status: 404,
      msg: "user with given mail is not found in the database",
    });
  }
  return res;
});

userRouter.post("/resetPassword", async (req, res) => {
  try {
    const token = await req.body.token;
    const userid = await req.body.userid;
    const password = await req.body.password;
    const encryptedPassword = await bcrypt.hash(
      password,
      process.env.NODE_SALT
    );
    const tokenVerify = jwt.verify(token, process.env.NODE_SECRET_KEY_2);
    if (tokenVerify) {
      const user = await User.findByIdAndUpdate(
        userid,
        { password: encryptedPassword },
        { new: true }
      );
      res.json({
        status: 200,
        msg: "password changed succeesfully",
      });
    } else {
      res.json({ status: 400, msg: "token is invalid" });
    }
  } catch (err) {
    console.log(err.message, err);
  }
});

module.exports = userRouter;
