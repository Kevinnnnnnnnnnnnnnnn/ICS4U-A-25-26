import mongoose from "mongoose";

const schema = new mongoose.Schema(
    { id: Number, firstName: String, lastName: String, email: String, department: String, room: String },
    { versionKey: false }
);

export default mongoose.model("Teacher", schema, "teachers");