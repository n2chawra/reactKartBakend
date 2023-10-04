const express = require("express");
const cors = require("cors");
const path = require('path');
const dotEnv = require("dotenv");
const mongoose = require("mongoose");
const studentRouter = require("./router/student");

const app = express();


dotEnv.config({
  path: "./.env",
});

app.use(cors());
app.use(express.json());

let PORT = process.env.PORT || 3001;

mongoose
  .connect(process.env.MONGODB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("database is connected");
  })
  .catch((e) => {
    console.log(e);
    process.exit(1);
  });

app.use("/api/students", studentRouter);

app.listen(PORT, () => {
  console.log("server is running");
});
