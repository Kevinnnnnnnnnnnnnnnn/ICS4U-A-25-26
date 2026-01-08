import mongoose from "mongoose";

const schema = new mongoose.Schema(
    {
        id: Number,
        firstName: String,
        lastName: String,
        grade: Number,
        studentNumber: String,
        homeroom: String
    },
    { versionKey: false }
);

export default mongoose.model("Student", schema, "students");