import mongoose from "mongoose";

const Schema = mongoose.Schema;

const mySchema = new Schema({
    id_usuario: String,
    id_alimento: String,
    resultado: String,
    fecha: Date,
});

const model = mongoose.model('history', mySchema);

export default model;
