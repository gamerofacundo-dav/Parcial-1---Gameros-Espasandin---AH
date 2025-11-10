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
    normalizedName: {
        type: String,
        unique: true,
        trim: true,
        required: true
    },
    ingredients: {
        type: Array,
        trim: true,
        required: true
    },
    normalizedIngredients: {
        type: Array,
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
        type: Array,
        trim: true,
        required: true
    },
    normalizedAllergens: {
        type: Array,
        trim: true,
        required: true
    },
    additives: {
        type: String,
        trim: true,
        required: true
    },
    nutritionalInfo: {
        calories: { type: Number, default: 0 },
        fat: { type: Number, default: 0 },
        sugar: { type: Number, default: 0 },
        protein: { type: Number, default: 0 }
    }

});

const model = mongoose.model('Food', mySchema);

export default model;

