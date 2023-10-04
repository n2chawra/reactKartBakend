const mongoose = require("mongoose");

const StudentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  class: { type: Number, required: true },
  roll: { type: Number, required: true, unique: true },
  image: { type: String, required: true },
  gender: { type: String, required: true },
});

const Student = mongoose.model("Student", StudentSchema);
module.exports = Student;
