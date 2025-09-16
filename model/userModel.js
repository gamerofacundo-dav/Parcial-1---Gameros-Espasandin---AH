import mongoose from "mongoose";

const Schemma = mongoose.Schema;

const mySchema = new Schemma({
    name: String,
    email: String,
    password: String,
    allergy: String,
});

const model = mongoose.model('User', mySchema);

export default model;