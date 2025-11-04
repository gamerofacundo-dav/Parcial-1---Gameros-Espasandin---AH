import mongoose from "mongoose";

const Schema = mongoose.Schema;

const mySchema = new Schema({
    barcode:  { 
        type: String,
        unique: true,
        trim: true        
    },
    name: {
        type: String,
        unique: true,
        trim: true,
        required: true
    },
    name: {
        type: String,
        unique: true,
        trim: true,
        required: true
    },
    ingredients: {
        type: String,
        trim: true,
        required: true
    },
    normalizedIngredients: {
        type: String,
        trim: true,
        required: true
    },
    traces: {
        type: String,
        trim: true,
    },
    brand: {
        type: String,
        trim: true,
        required: true
    },
    category: {
        type: String,
        trim: true,
        required: true
    },
    origin: {
        type: String,
        trim: true,
        required: true
    },
    allergens: {
        type: String,
        trim: true,
        required: true
    },
    normalizedAllergens: {
        type: String,
        trim: true,
        required: true
    },
    additives: {
        type: String,
        trim: true,
        required: true
    },
    nutritionalInfo: {
        calories: Number,
        fat: Number,
        sugar: Number,
        protein: Number
    }
});

const model = mongoose.model('Food', mySchema);

export default model;

