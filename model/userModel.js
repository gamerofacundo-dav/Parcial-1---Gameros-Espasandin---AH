import mongoose from "mongoose";

const Schemma = mongoose.Schema;

const mySchema = new Schemma({
    name: String,
    email: String,
    password: String,
    allergy: String,
    created_at: Date,
    updated_at: Date,
});

const model = mongoose.model('User', mySchema);

export default model;