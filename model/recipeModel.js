import mongoose from "mongoose";

const Schema = mongoose.Schema;

const mySchema = new Schema({
  name: { type: String, required: true, trim: true },
  normalizedName: { type: String, required: true, trim: true },
  description: { type: String, required: true, trim: true },
  ingredients: [{ type: String, required: true }], // lista simple de nombres de ingredientes
  normalizedIngredients: [{type: String, required: true}],
  steps: [{ type: String, required: true }],        // instrucciones paso a paso
  preparationTime: { type: Number, required: true }, // en minutos
  portions: { type: Number, default: 1 },
  created_at: { type: Date, default: Date.now },
});


const model = mongoose.model('recipes', mySchema);

export default model;
