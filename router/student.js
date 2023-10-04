const express = require("express");
const Student = require("../model/studentModel");
const router = express.Router();

// ADD STUDENTS
router.post("/", async (req, res) => {
  try {
    let { name, roll, image, gender } = req.body;

    let student = await Student.findOne({ roll: roll });
    if (student) {
      return res.status(400).json({ msg: "student with same roll no exists" });
    }

    let newStudent = await Student.create({
      name,
      class: req.body.class,
      roll,
      image,
      gender,
    });

    res.status(201).json({
      msg: "student added success",
      newStudent,
    });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// GET ALL STUDENTS
router.get("/", async (req, res) => {
  try {
    let allStudent = await Student.find();
    if (!allStudent) {
      return res.status(404).json({ msg: "no students" });
    }

    res.status(201).json({
      allStudent,
    });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// GET ONE STUDENT
router.get("/:id", async (req, res) => {
  try {
    let stId = req.params.id;

    let student = await Student.findById(stId);
    if (!student) {
      return res.status(404).json({ msg: "no student found with this id" });
    }

    res.status(200).json({
      student,
    });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// UPDATE ONE STUDENT
router.patch("/:id", async (req, res) => {
  try {
    let stId = req.params.id;

    let student = await Student.findByIdAndUpdate(stId, req.body, {
      new: true,
    });
    if (!student) {
      return res.status(404).json({ msg: "no student found with this id" });
    }

    res.status(200).json({
      student,
    });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// DELETE ONE STUDENT
router.delete("/:id", async (req, res) => {
  try {
    let stId = req.params.id;

    let student = await Student.findByIdAndDelete(stId);
    if (!student) {
      return res.status(404).json({ msg: "no student found with this id" });
    }

    res.status(200).json({
      status: "deleted",
    });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

module.exports = router;
