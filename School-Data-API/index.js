console.log("Starting index.js — Node version:", process.version);
import "dotenv/config";
import express from "express";

import Teacher from "./models/Teachers.js";
import Course from "./models/Courses.js";
import Student from "./models/Students.js";
import Test from "./models/Tests.js";

import connectDB from "./db.js";

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;

console.log("MONGODB_URI set?", !!process.env.MONGODB_URI);
try {
  await connectDB();
} catch (err) {
  console.error("Failed to connect to DB — exiting.");
  process.exit(1);
}

app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});


app.get("/teachers", async (req, res) => {
  try {
    const all = await Teacher.find().lean();
    res.status(200).json(all);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
})

app.get("/teachers/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);
    const teacher = await Teacher.findOne({ id });
    if (!teacher) return res.status(404).json({ error: "Teacher not found!" });
    res.status(200).json(teacher);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
})

app.post("/teachers", async (req, res) => {
  try {
    const { firstName, lastName, email, department } = req.body;
    if (!firstName || !lastName || !email || !department) {
      return res.status(400).json({ error: "Missing required fields." });
    }
    const max = await Teacher.findOne().sort({ id: -1 }).select("id").lean();
    const nextId = (max?.id ?? 0) + 1;
    const newTeacher = await Teacher.create({ id: nextId, firstName, lastName, email, department });
    res.status(201).json(newTeacher);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
})

app.put("/teachers/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);
    const teacher = await Teacher.findOne({ id });
    if (!teacher) return res.status(404).json({ error: "Teacher not found!" });
    const { firstName, lastName, email, department } = req.body;
    if (firstName === undefined && lastName === undefined && email === undefined && department === undefined)
      return res.status(400).json({ error: "No fields to update!" });
    if (firstName !== undefined) teacher.firstName = firstName;
    if (lastName !== undefined) teacher.lastName = lastName;
    if (email !== undefined) teacher.email = email;
    if (department !== undefined) teacher.department = department;
    await teacher.save();
    res.status(200).json(teacher);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
})

app.delete("/teachers/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);
    const deleted = await Teacher.findOneAndDelete({ id });
    if (!deleted) return res.status(404).json({ error: "Teacher not found!" });
    res.status(200).json(deleted);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
})

app.get("/courses", async (req, res) => {
  try {
    const all = await Course.find().lean();
    res.status(200).json(all);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
})

app.get("/courses/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);
    const course = await Course.findOne({ id });
    if (!course) return res.status(404).json({ error: "Course not found!" });
    res.status(200).json(course);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
})

app.post("/courses", async (req, res) => {
  try {
    const { code, name, teacherId, semester, room, schedule } = req.body;
    if (!code || !name || !teacherId || !semester || !room) {
      return res.status(400).json({ error: "Missing required fields." });
    }
    const teacher = await Teacher.findOne({ id: teacherId });
    if (!teacher) return res.status(400).json({ error: "There is no teacher with that teacher ID." });
    const max = await Course.findOne().sort({ id: -1 }).select("id").lean();
    const nextId = (max?.id ?? 0) + 1;
    const newCourse = await Course.create({ id: nextId, code, name, teacherId, semester, room, schedule });
    res.status(201).json(newCourse);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
})

app.put("/courses/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);
    const course = await Course.findOne({ id });
    if (!course) return res.status(404).json({ error: "Course not found!" });
    const { code, name, teacherId, semester, room, schedule } = req.body;
    if (code === undefined && name === undefined && teacherId === undefined && semester === undefined && room === undefined && schedule === undefined)
      return res.status(400).json({ error: "No fields to update!" });
    if (code !== undefined) course.code = code;
    if (name !== undefined) course.name = name;
    if (teacherId !== undefined) {
      const teacher = await Teacher.findOne({ id: teacherId });
      if (!teacher) return res.status(400).json({ error: "There is no teacher with that teacher ID." });
      course.teacherId = teacherId;
    }
    if (semester !== undefined) course.semester = semester;
    if (room !== undefined) course.room = room;
    if (schedule !== undefined) course.schedule = schedule;
    await course.save();
    res.status(200).json(course);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
})

app.delete("/courses/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);
    const deleted = await Course.findOneAndDelete({ id });
    if (!deleted) return res.status(404).json({ error: "Course not found!" });
    res.status(200).json(deleted);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
})

app.get("/students", async (req, res) => {
  try {
    const all = await Student.find().lean();
    res.status(200).json(all);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
})

app.get("/students/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);
    const student = await Student.findOne({ id });
    if (!student) return res.status(404).json({ error: "Student not found!" });
    res.status(200).json(student);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
})

app.post("/students", async (req, res) => {
  try {
    const { firstName, lastName, grade, studentNumber, homeroom } = req.body;
    if (!firstName || !lastName || !grade || !studentNumber) {
      return res.status(400).json({ error: "Missing required fields." });
    }
    const max = await Student.findOne().sort({ id: -1 }).select("id").lean();
    const nextId = (max?.id ?? 0) + 1;
    const newStudent = await Student.create({ id: nextId, firstName, lastName, grade, studentNumber, homeroom });
    res.status(201).json(newStudent);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
})

app.put("/students/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);
    const student = await Student.findOne({ id });
    if (!student) return res.status(404).json({ error: "Student not found!" });
    const { firstName, lastName, grade, studentNumber, homeroom } = req.body;
    if (firstName === undefined && lastName === undefined && grade === undefined && studentNumber === undefined && homeroom === undefined)
      return res.status(400).json({ error: "No fields to update!" });
    if (firstName !== undefined) student.firstName = firstName;
    if (lastName !== undefined) student.lastName = lastName;
    if (grade !== undefined) student.grade = grade;
    if (studentNumber !== undefined) student.studentNumber = studentNumber;
    if (homeroom !== undefined) student.homeroom = homeroom;
    await student.save();
    res.status(200).json(student);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
})

app.delete("/students/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);
    const deleted = await Student.findOneAndDelete({ id });
    if (!deleted) return res.status(404).json({ error: "Student not found!" });
    res.status(200).json(deleted);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
})

app.get("/tests", async (req, res) => {
  try {
    const all = await Test.find().lean();
    res.status(200).json(all);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
})

app.get("/tests/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);
    const test = await Test.findOne({ id });
    if (!test) return res.status(404).json({ error: "Test not found!" });
    res.status(200).json(test);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
})

app.post("/tests", async (req, res) => {
  try {
    const { studentId, courseId, testName, date, mark, outOf, weight } = req.body;
    if (!studentId || !courseId || !testName || !date || mark === undefined || outOf === undefined) {
      return res.status(400).json({ error: "Missing required fields." });
    }
    const course = await Course.findOne({ id: courseId });
    const student = await Student.findOne({ id: studentId });
    if (!course) return res.status(400).json({ error: "There is no course with that course ID." });
    if (!student) return res.status(400).json({ error: "There is no student with that student ID." });
    if (mark < 0 || outOf < 1 || mark > outOf) return res.status(400).json({ error: "Please input a valid mark/outOf." });
    const max = await Test.findOne().sort({ id: -1 }).select("id").lean();
    const nextId = (max?.id ?? 0) + 1;
    const newTest = await Test.create({ id: nextId, studentId, courseId, testName, date, mark, outOf, weight });
    res.status(201).json(newTest);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
})

app.put("/tests/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);
    const test = await Test.findOne({ id });
    if (!test) return res.status(404).json({ error: "Test not found!" });
    const { studentId, courseId, testName, date, mark, outOf, weight } = req.body;
    if (studentId === undefined && courseId === undefined && testName === undefined && date === undefined && mark === undefined && outOf === undefined && weight === undefined)
      return res.status(400).json({ error: "No fields to update!" });
    if (studentId !== undefined) {
      const student = await Student.findOne({ id: studentId });
      if (!student) return res.status(400).json({ error: "There is no student with that student ID." });
      test.studentId = studentId;
    }
    if (courseId !== undefined) {
      const course = await Course.findOne({ id: courseId });
      if (!course) return res.status(400).json({ error: "There is no course with that course ID." });
      test.courseId = courseId;
    }
    if (testName !== undefined) test.testName = testName;
    if (date !== undefined) test.date = date;
    if (mark !== undefined) {
      if (mark < 0 || (test.outOf !== undefined && mark > test.outOf)) return res.status(400).json({ error: "Please input a valid mark!" });
      test.mark = mark;
    }
    if (outOf !== undefined) {
      if (outOf < 1 || (test.mark !== undefined && outOf < test.mark)) return res.status(400).json({ error: "Please input a valid max mark!" });
      test.outOf = outOf;
    }
    if (weight !== undefined) test.weight = weight;
    await test.save();
    res.status(200).json(test);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
})

app.delete("/tests/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);
    const deleted = await Test.findOneAndDelete({ id });
    if (!deleted) return res.status(404).json({ error: "Test not found!" });
    res.status(200).json(deleted);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
})

app.get("/students/:id/tests", async (req, res) => {
  try {
    const id = Number(req.params.id);
    const student = await Student.findOne({ id });
    if (!student) return res.status(404).json({ error: "Student not found!" });
    const theirTests = await Test.find({ studentId: id }).lean();
    res.status(200).json(theirTests);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
})

app.get("/students/:id/courses", async (req, res) => {
  try {
    const id = Number(req.params.id);
    const student = await Student.findOne({ id });
    if (!student) return res.status(404).json({ error: "Student not found!" });
    const testsByStudent = await Test.find({ studentId: id }).select("courseId").lean();
    const uniqueCourseIds = [...new Set(testsByStudent.map(t => t.courseId))];
    const theirCourses = await Course.find({ id: { $in: uniqueCourseIds } }).lean();
    res.status(200).json(theirCourses);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
})