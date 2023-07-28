const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const multer = require("multer");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const path = require("path");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads");
  },
  filename: (req, file, cb) => {
    console.log(file);
    cb(null, `${Date.now()}_${file.originalname}`);
  },
});

const upload = multer({ storage: storage });

//mongoose.connect("mongodb://localhost:27017/Batch2304");
mongoose.connect(
  "mongodb+srv://manjunadhb:manjunadhb@cluster0.pujg3ux.mongodb.net/Batch2304?retryWrites=true&w=majority"
);

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded());
app.use("/uploads", express.static("uploads"));
app.use(express.static(path.join(__dirname, "./client/build")));

let userSchema = new mongoose.Schema({
  fn: String,
  ln: String,
  email: String,
  password: String,
  age: Number,
  contactNo: String,
  profilePic: String,
});

let User = new mongoose.model("user", userSchema);

app.post("/signup", upload.single("profilePic"), async (req, res) => {
  console.log(req.body);
  console.log(req.file.path);
  let hashedPassword = await bcrypt.hash(req.body.password, 10);
  let newUser = new User({
    fn: req.body.fn,
    ln: req.body.ln,
    email: req.body.email,
    password: hashedPassword,
    age: req.body.age,
    profilePic: req.file.path,
    contactNo: req.body.contactNo,
  });

  await newUser.save();
  console.log("received signup data");
  res.json(["account created successfully"]);
});

app.put("/editProfile", upload.single("profilePic"), async (req, res) => {
  console.log(req.body);
  console.log(req.file.path);

  try {
    await User.updateMany(
      { _id: req.body.id },
      {
        fn: req.body.fn,
        ln: req.body.ln,
        email: req.body.email,
        password: req.body.password,
        age: req.body.age,
        contactNo: req.body.contactNo,
        profilePic: req.file.path,
      }
    );

    res.json({ status: "success", msg: "Account updated successfully" });
  } catch (err) {
    res.json(err);
  }

  // let newUser = new User({
  //   fn: req.body.fn,
  //   ln: req.body.ln,
  //   email: req.body.email,
  //   password: req.body.password,
  //   age: req.body.age,
  //   profilePic: req.file.path,
  //   contactNo: req.body.contactNo,
  // });

  // await newUser.save();
  // console.log("received signup data");
  // res.json(["account dummy updated successfully"]);
});

app.delete("/deleteUser", async (req, res) => {
  try {
    await User.deleteMany({ _id: req.query.id });
    res.json({ status: "success", msg: "Account deleted successfully" });
  } catch (err) {
    res.json(err);
  }
});

app.post("/validateLogin", upload.none(), async (req, res) => {
  let results = await User.find().and({ email: req.body.email });

  console.log(results);

  if (results.length > 0) {
    let isPasswordCorrect = await bcrypt.compare(
      req.body.password,
      results[0].password
    );

    if (isPasswordCorrect == true) {
      let encryptedCredentials = jwt.sign(
        { email: req.body.email, password: req.body.password },
        "BRN"
      );

      let userDetails = results[0];
      console.log(userDetails);

      res.json({
        status: "success",
        isLoggedIn: true,
        details: userDetails,
        token: encryptedCredentials,
      });
    } else {
      res.json({
        status: "failure",
        isLoggedIn: false,
        msg: "Invalid Password",
      });
    }
  } else {
    res.json({ status: "failure", isLoggedIn: false, msg: "Invalid Email" });
  }
});

app.post("/validateToken", upload.none(), async (req, res) => {
  let decryptedCredentials = jwt.verify(req.body.token, "BRN");

  console.log(decryptedCredentials);

  let results = await User.find().and({ email: decryptedCredentials.email });

  console.log(results);

  if (results.length > 0) {
    let isPasswordCorrect = await bcrypt.compare(
      decryptedCredentials.password,
      results[0].password
    );

    if (isPasswordCorrect == true) {
      let encryptedCredentials = jwt.sign(
        { email: req.body.email, password: req.body.password },
        "BRN"
      );

      let userDetails = results[0];
      console.log(userDetails);

      res.json({
        status: "success",
        isLoggedIn: true,
        details: userDetails,
        token: encryptedCredentials,
      });
    } else {
      res.json({
        status: "failure",
        isLoggedIn: false,
        msg: "Invalid Password",
      });
    }
  } else {
    res.json({ status: "failure", isLoggedIn: false, msg: "Invalid Email" });
  }
});

app.listen(3333, () => {
  console.log("Listening to port 3333");
});
