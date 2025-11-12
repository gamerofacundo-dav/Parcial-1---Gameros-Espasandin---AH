import foodModel from "../model/foodModel.js";
import Response from "../classes/Response.js";
import passManager from "../classes/passManager.js";

class foodController {
    async getFood(req, res) { 
        const myRes = new Response();
        try {
            const food = await foodModel.find();
            myRes.generateResponseTrue(res, 'Alimentos escontrados', food);
        } catch (err) {
            myRes.generateResponseFalse(res, 'Alimentos no encontrados', 'No se pudo encontrar los alimentos', 500, err);
        }   
    }

    async addFood(req, res) {
        const myRes = new Response();
       try {
            let { barcode, name, normalizedName, ingredients, traces, brand, category, origin, nutritionalInfo} = req.body;
            // Validaciones datos
            if(!barcode || !name || !ingredients || !brand || !category || !origin || !nutritionalInfo.calories || !nutritionalInfo.fat || !nutritionalInfo.sugar || !nutritionalInfo.protein ) {
                myRes.generateResponseFalse(res, 'Faltan campos', 'Faltan campos', 400);
                return;
            } 
            if (barcode.length !== 13) {
                myRes.generateResponseFalse(res, 'El barcode debe tener 13 dígitos', 'El barcode debe tener 13 dígitos', 400);
                return;
            }

            // Conversión a string
            if(typeof(ingredients) !== 'string') {
                ingredients = ingredients.join();
            }

            // Normalizando ingredientes, alergenos y nombre
            const normalizedIngredients = ingredients.toLowerCase().replaceAll(' ', '').normalize('NFD').replace(/[\u0300-\u036f]/g, '').split(',');
            normalizedName = name.replaceAll(' ', '').toLowerCase();

            // Conversión a array de vuelta
            ingredients = ingredients.split(',').map(i => i.trim());


            const newFood = new foodModel({ barcode, name, normalizedName, ingredients, normalizedIngredients, traces: traces ?? null, brand, category, origin, nutritionalInfo});
            const dataSaved = await newFood.save();
            console.log(dataSaved);
            myRes.generateResponseTrue(res, 'Alimento Agregado', dataSaved);
        } catch (err) {
            myRes.generateResponseFalse(res, 'No se pudo guardar el Alimento', 'No se pudo guardar el Alimento porque', 500, err);
        }   
    }

    async getFoodById(req, res) {
        const myRes = new Response();
        try {
            const id = req.params.id;
            if(id.length !== 24) {
                myRes.invalidId(res);
                return;
            } else {
                const foodById = await foodModel.findById(id);
                if(foodById) {
                    myRes.generateResponseTrue(res, 'Alimento escontrado', foodById);
                } else {
                    myRes.generateResponseFalse(res, 'Alimento no encontrado', 'No se pudo encontrar el alimento', 404);
                }
            }
        } catch (err){
            myRes.generateResponseFalse(res, 'No se pudo encontrar el alimento', 'No se pudo encontrar el Alimento porque', 500, err);
        }
    }

    async uptdateFoodById(req, res) {
        const myRes = new Response();
        try {
            const id = req.params.id;
            if(id.length !== 24) {
                myRes.invalidId(res);
                return;
            } else {
                let { barcode, name, normalizedName, ingredients, traces, brand, category, origin, nutritionalInfo } = req.body;
                if(!barcode || !name || !ingredients || !brand || !category || !origin || !nutritionalInfo.calories || !nutritionalInfo.fat || !nutritionalInfo.sugar || !nutritionalInfo.protein) {
                    myRes.generateResponseFalse(res, 'Faltan campos', 'Faltan campos', 500);
                    return;
                } 
                if (barcode.length !== 13) {
                    myRes.generateResponseFalse(res, 'El barcode debe tener 13 dígitos', 'El barcode debe tener 13 dígitos', 500);
                }
                // Conversión a string (si no lo es), para mejor manipulación.
                if(typeof(ingredients) !== 'string') {
                    ingredients = ingredients.join();
                }

         
                
                // Normalizando ingredientes, alergenos y nombre
                const normalizedIngredients = ingredients.toLowerCase().replaceAll(' ', '').normalize('NFD').replace(/[\u0300-\u036f]/g, '').split(',');

                normalizedName = name.replaceAll(' ', '').toLowerCase();

                // Conversión a array de vuelta para guardado en Base de Datos
                ingredients = ingredients.split(',').map(i => i.trim());

                const foodToUpdate = await foodModel.findByIdAndUpdate(id, { barcode, name, normalizedName, ingredients, normalizedIngredients, traces: traces ?? null, brand, category, origin, nutritionalInfo});
                if(foodToUpdate) {
                    myRes.generateResponseTrue(res, 'Alimento actualizado', foodToUpdate);
                } else {
                    myRes.generateResponseFalse(res, 'Alimento no encontrado', 'No se pudo encontrar el alimento', 404);
                }
            }     
        } catch (err) {
            myRes.generateResponseFalse(res, 'No se pudo actualizar el alimento', 'No se pudo actualizar el Alimento porque', 500, err);
        }
    }

    async deleteFoodById(req, res) {
        const myRes = new Response();
        try {
            const id = req.params.id;
            if(id.length !== 24) {
                myRes.invalidId(res);
                return;
            } else {
                const foodToDelete = await foodModel.findByIdAndDelete(id);
                if(foodToDelete) {
                    myRes.generateResponseTrue(res, 'Alimento eliminado', foodToDelete);
                } else {
                    myRes.generateResponseFalse(res, 'Alimento no encontrado', 'No se pudo encontrar el alimento', 404);
                }
            }
        } catch (err) {
            myRes.generateResponseFalse(res, 'No se pudo eliminar el alimento', 'No se pudo eliminar el Alimento porque', 500, err);
        }
    }


    async getFoodByName(req, res) {
        const myRes = new Response();
        try {
            let name = req.params.name;
            if(!name) {
                myRes.generateResponseFalse(res, 'No hay un nombre propocionado', 'No hay un nombre propocionado', 500);
                return;
            } else {
                name = name.replaceAll(' ', '').toLowerCase();    
                const foodByName = await foodModel.findOne({"normalizedName": name});
                if(foodByName) {
                    myRes.generateResponseTrue(res, 'Alimento encontrado', foodByName);
                } else {
                    myRes.generateResponseFalse(res, 'Alimento no encontrado', 'No se pudo encontrar el alimento', 404);
                }
            }
        } catch (err) {
            myRes.generateResponseFalse(res, 'No se pudo encontrar el alimento', 'No se pudo encontrar el Alimento porque', 500, err);
        }
    }

    async getFoodByIngredient(req, res) {
        const myRes = new Response();
        try {
            let ingredient = req.params.ingredient;
            ingredient = ingredient.toLowerCase().trim();
            if(!ingredient) {
                myRes.generateResponseFalse(res, 'No hay un ingrediente propocionado', 'No hay un ingrediente propocionado', 500);
                return;
            }
            const allFoods = await foodModel.find();
            let matchedFoods = [];
            for(const foods of allFoods) {
                if(foods.normalizedIngredients.includes(ingredient)) {
                    matchedFoods.push(foods);
                }
            }
            if(matchedFoods.length != 0) {
                myRes.generateResponseTrue(res, 'Alimento encontrado', matchedFoods);
            } else {
                myRes.generateResponseFalse(res, 'Ningúin alimento coincide con ese ingrediente', 'Ningúin alimento coincide con ese ingrediente', 404);
            }
        } catch (err) {
            myRes.generateResponseFalse(res, 'No se pudo encontrar el alimento', 'No se pudo encontrar el Alimento porque', 500, err);
        }
    }

    async getFoodsThaDoBotContainAllergen(req, res) {
        const myRes = new Response();
        try {
            let allergen = req.params.allergen;
            allergen = allergen.toLowerCase().trim();
            if(!allergen) {
                myRes.generateResponseFalse(res, 'No hay un alérgeno propocionado', 'No hay un alérgeno propocionado', 500);
                return;
            }
            const allFoods = await foodModel.find();
            let matchedFoods = [];
            for(const foods of allFoods) {
                if(!foods.normalizedAllergens.includes(allergen) && matchedFoods.length < 10) {
                    matchedFoods.push(foods);
                }
            }
            if(matchedFoods.length != 0) {
                myRes.generateResponseTrue(res, 'Alimento encontrado', matchedFoods);
            } else {
                myRes.generateResponseFalse(res, 'Ningúin alimento coincide con ese alérgeno', 'Ningúin alimento coincide con ese alérgeno', 500);
            }
        } catch (err) {
            myRes.generateResponseFalse(res, 'No se pudo encontrar el alimento', 'No se pudo encontrar el Alimento porque', 500, err);
        }
    }
}

export default foodController;