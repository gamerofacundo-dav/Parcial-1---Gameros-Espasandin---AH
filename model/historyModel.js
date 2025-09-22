import mongoose from "mongoose";

const Schema = mongoose.Schema;

const mySchema = new Schema({
    id: String,
    id_usuario: String,
    id_alimento: String,
    fecha: Date,
    resultado: String,
});

const model = mongoose.model('history', mySchema);

export default model;
