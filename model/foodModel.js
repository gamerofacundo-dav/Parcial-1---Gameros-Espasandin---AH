import mongoose from "mongoose";

const Schema = mongoose.Schema;

const mySchema = new Schema({
    barcode: String,
    name: String,
    normalizedName: String,
    ingredients: [String],
    normalizedIngredients: [String],
    traces: String,
    brand: String,
    category: String,
    origin: String,
    allergens: [String],
    normalizedAllergens: [String],
    additives: [String],
    nutritionalInfo: {
        calories: Number,
        fat: Number,
        sugar: Number,
        protein: Number
    } 
});

const model = mongoose.model('Food', mySchema);

export default model;

