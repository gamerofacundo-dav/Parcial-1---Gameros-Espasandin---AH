import mongoose from "mongoose";

const intolerancesSchema = new mongoose.Schema({
    name: String,
    normalizedName: String,
    description: String,
    type: {
        type: Number,
        enum: [1, 2],
    },
    normalizedType: String,
    symptoms: [String],
    normalizedSymptoms: [String],
    severity: {
        type: Number,
        enum: [1, 2, 3, 4],
    },
    normalizedSeverity: String,
    restrictedIngredients: [String],
    normalizedRestrictedIngredients: [String],
});

const intolerancesModel = mongoose.model("intolerances", intolerancesSchema);

export default intolerancesModel;
