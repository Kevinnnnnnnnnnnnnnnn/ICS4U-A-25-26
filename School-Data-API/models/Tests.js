import mongoose from "mongoose";

const schema = new mongoose.Schema(
    {
        id: Number,
        studentId: Number,
        courseId: Number,
        testName: String,
        date: String,
        mark: Number,
        outOf: Number,
        weight: Number
    },
    { versionKey: false }
);

export default mongoose.model("Test", schema, "tests");