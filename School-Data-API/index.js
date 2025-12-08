import express from "express";
import fs from "fs";

const app = express();
app.use(express.json());

function loadJson(filePath) {
    if (!fs.existsSync(filePath)) return [];
    const data = fs.readFileSync(filePath, "utf-8");
    try {
        return JSON.parse(data);
    } catch (err) {
        console.error("Error parsing", filePath, err);
        return [];
    }
}

function saveJson(filePath, data) {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
}

let teachers = loadJson("teachers.json");
let courses = loadJson("courses.json");
let students = loadJson("students.json");
let tests = loadJson("tests.json");

let nextTeacherId = teachers.reduce((max, t) => Math.max(max, t.id), 0) + 1;
let nextCourseId = courses.reduce((max, c) => Math.max(max, c.id), 0) + 1;
let nextStudentId = students.reduce((max, s) => Math.max(max, s.id), 0) + 1;
let nextTestId = tests.reduce((max, t) => Math.max(max, t.id), 0) + 1;

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server listening on http://localhost:${PORT}`);
})

app.get("/teachers", (req, res) => {
    res.status(200).json(teachers);
})

app.get("/teachers/:id", (req, res) => {
    const id = Number(req.params.id);
    const teacher = teachers.find(t => t.id === id);
    if (!teacher) {
        return res.status(404).json({error: "Teacher not found!"});
    }
    res.status(200).json(teacher);
})

app.post("/teachers", (req, res) => {
    const {firstName, lastName, email, department} = req.body;
    if (!firstName || !lastName || !email || !department) {
        return res.status(400).json({error: "Missing required fields."});
    }
    const newTeacher = {
        id: nextTeacherId++,
        firstName,
        lastName,
        email,
        department
    };
    teachers.push(newTeacher);
    saveJson("teachers.json", teachers);
    res.status(201).json(newTeacher);
})

app.put("/teachers/:id", (req, res) => {
    const id = Number(req.params.id);
    const teacher = teachers.find(t => t.id === id);
    if (!teacher) {
        return res.status(404).json({error: "Teacher not found!"});
    }
    const {firstName, lastName, email, department} = req.body;
    if (!firstName && !lastName && !email && !department)
        return res.status(400).json({error: "No fields to update!"});
    if (firstName !== undefined) teacher.firstName = firstName;
    if (lastName !== undefined) teacher.lastName = lastName;
    if (email !== undefined) teacher.email = email;
    if (department !== undefined) teacher.department = department;
    saveJson("teachers.json", teachers);
    res.status(200).json(teacher);
})

app.delete("/teachers/:id", (req, res) => {
    const id = Number(req.params.id);
    const index = teachers.findIndex(t => t.id === id);
    if (index < 0) {
        return res.status(404).json({error: "Teacher not found!"});
    }
    const deleted = teachers.splice(index, 1)[0];
    saveJson("teachers.json", teachers);
    res.status(200).json(deleted);
})

app.get("/courses", (req, res) => {
    res.status(200).json(courses);
})

app.get("/courses/:id", (req, res) => {
    const id = Number(req.params.id);
    const course = courses.find(c => c.id === id);
    if (!course) {
        return res.status(404).json({error: "Course not found!"});
    }
    res.status(200).json(course);
})

app.post("/courses", (req, res) => {
    const {code, name, teacherId, semester, room} = req.body;
    if (!code || !name || !teacherId || !semester || !room) {
        return res.status(400).json({error: "Missing required fields."});
    }
    const teacher = teachers.find(t => t.id === teacherId);
    if (!teacher) {
        return res.status(400).json({error: "There is no teacher with that teacher ID."});
    }
    const newCourse = {
        id: nextCourseId++,
        code,
        name,
        teacherId,
        semester,
        room
    }
    courses.push(newCourse);
    saveJson("courses.json", courses);
    res.status(201).json(newCourse);
})

app.put("/courses/:id", (req, res) => {
    const id = Number(req.params.id);
    const course = courses.find(c => c.id === id);
    if (!course) {
        return res.status(404).json({error: "Course not found!"});
    }
    const {code, name, teacherId, semester, room, schedule} = req.body;
    if (!code && !name && !teacherId && !semester && !room && !schedule)
        return res.status(400).json({error: "No fields to update!"});
    if (code !== undefined) course.code = code;
    if (name !== undefined) course.name = name;
    if (teacherId !== undefined) {
        const teacherIndex = teachers.findIndex(t => t.id === teacherId);
        if (teacherIndex === -1)
            return res.status(400).json({error: "There is no teacher with that teacher ID."});
        else
            course.teacherId = teacherId;
    }
    if (semester !== undefined) course.semester = semester;
    if (room !== undefined) course.room = room;
    if (schedule !== undefined) course.schedule = schedule;
    saveJson("courses.json", courses);
    res.status(200).json(course);
})

app.delete("/courses/:id", (req, res) => {
    const id = Number(req.params.id);
    const index = courses.findIndex(c => c.id === id);
    if (index < 0) {
        return res.status(404).json({error: "Course not found!"});
    }
    const deleted = courses.splice(index, 1)[0];
    saveJson("courses.json", courses);
    res.status(200).json(deleted);
})

app.get("/students", (req, res) => {
    res.status(200).json(students);
})

app.get("/students/:id", (req, res) => {
    const id = Number(req.params.id);
    const student = students.find(s => s.id === id);
    if (!student) {
        return res.status(404).json({error: "Student not found!"});
    }
    res.status(200).json(student);
})

app.post("/students", (req, res) => {
    const {firstName, lastName, grade, studentNumber} = req.body;
    if (!firstName || !lastName || !grade || !studentNumber) {
        return res.status(400).json({error: "Missing required fields."});
    }
    const newStudent = {
        id: nextStudentId++,
        firstName,
        lastName,
        grade,
        studentNumber
    }
    students.push(newStudent);
    saveJson("students.json", students);
    res.status(201).json(newStudent);
})

app.put("/students/:id", (req, res) => {
    const id = Number(req.params.id);
    const student = students.find(s => s.id === id);
    if (!student) {
        return res.status(404).json({error: "Student not found!"});
    }
    const {firstName, lastName, grade, studentNumber, homeroom} = req.body;
    if (!firstName && !lastName && !grade && !studentNumber && !homeroom)
        return res.status(400).json({error: "No fields to update!"});
    if (firstName !== undefined) student.firstName = firstName;
    if (lastName !== undefined) student.lastName = lastName;
    if (grade !== undefined) student.grade = grade;
    if (studentNumber !== undefined) student.studentNumber = studentNumber;
    if (homeroom !== undefined) student.homeroom = homeroom;
    saveJson("students.json", students);
    res.status(200).json(student);
})

app.delete("/students/:id", (req, res) => {
    const id = Number(req.params.id);
    const index = students.findIndex(s => s.id === id);
    if (index < 0) {
        return res.status(404).json({error: "Student not found!"});
    }
    const deleted = students.splice(index, 1)[0];
    saveJson("students.json", students);
    res.status(200).json(deleted);
})

app.get("/tests", (req, res) => {
    res.status(200).json(tests);
})

app.get("/tests/:id", (req, res) => {
    const id = Number(req.params.id);
    const test = tests.find(t => t.id === id);
    if (!test) {
        return res.status(404).json({error: "Test not found!"});
    }
    res.status(200).json(test);
})

app.post("/tests", (req, res) => {
    const {studentId, courseId, testName, date, mark, outOf} = req.body;
    if (!studentId || !courseId || !testName || !date || !mark || !outOf) {
        return res.status(400).json({error: "Missing required fields."});
    }
    const course = courses.find(c => c.id === courseId);
    if (!course) {
        return res.status(400).json({error: "There is no course with that course ID."});
    }
    const newTest = {
        id: nextTestId++,
        studentId,
        courseId,
        testName,
        date,
        mark,
        outOf
    }
    tests.push(newTest);
    saveJson("tests.json", tests);
    res.status(200).json(newTest);
})

app.put("/tests/:id", (req, res) => {
    const id = Number(req.params.id);
    const test = tests.find(t => t.id === id);
    if (!test) {
        return res.status(404).json({error: "Test not found!"});
    }
    const {studentId, courseId, testName, date, mark, outOf, weight} = req.body;
    if (!studentId && !courseId && !testName && !date && !mark && !outOf && !weight)
        return res.status(400).json({error: "No fields to update!"});
    if (studentId !== undefined) test.studentId = studentId;
    if (courseId !== undefined) {
        const course = courses.find(c => c.id === courseId);
        if (!course)
            return res.status(400).json({error: "There is no course with that course ID."})
        test.courseId = courseId;
    }
    if (testName !== undefined) test.testName = testName;
    if (date !== undefined) test.date = date;
    if (mark !== undefined) {
        if (mark > outOf || mark < 0) 
            return res.status(400).json({error: "Please input a valid mark!"});
        else
            test.mark = mark;
    }
    if (outOf !== undefined) {
        if (outOf < mark || outOf < 1)
            return res.status(400).json({error: "Please input a valid max mark!"});
        else
            test.outOf = outOf;
    }
    if (weight !== undefined) test.weight = weight;
    saveJson("tests.json", tests);
    res.status(200).json(test);
})

app.delete("/tests/:id", (req, res) => {
    const id = Number(req.params.id);
    const index = tests.findIndex(t => t.id === id);
    if (index < 0 ) {
        return res.status(404).json({error: "Test not found!"});
    }
    const deleted = tests.splice(index, 1)[0];
    saveJson("tests.json", tests);
    res.status(200).json(deleted);
})