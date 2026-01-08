import mongoose from "mongoose";

const schema = new mongoose.Schema(
    {
        id: Number,
        code: String,
        name: String,
        teacherId: Number,
        semester: String,
        room: String,
        schedule: String
    },
    { versionKey: false }
);

export default mongoose.model("Course", schema, "courses");