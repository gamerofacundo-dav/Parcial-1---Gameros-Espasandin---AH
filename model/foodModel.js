import mongoose from "mongoose";

const Schema = mongoose.Schema;

const mySchema = new Schema({
    barcode: String,
    name: String,
    normalizedName: String,
    ingredients: [String],
    traces: String,
    brand: String,
    category: String,
    origin: String,
    allergens: [String],
    additives: String
});

const model = mongoose.model('Food', mySchema);

export default model;

