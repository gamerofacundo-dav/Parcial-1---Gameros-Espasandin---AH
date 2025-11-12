import recipesModel from '../model/recipeModel.js'
import Response from "../classes/Response.js";


class recipeController {
    async getRecipes(req, res) { 
        const myRes = new Response();
        try {
            const recipes = await recipesModel.find();
            myRes.generateResponseTrue(res, 'Recetas escontradas', recipes);
        } catch (err) {
            myRes.generateResponseFalse(res, 'Recetas no encontradas', 'No se pudo encontrar las recetas', 500, err);
        }   
    }

    async addRecipe(req, res) {
        const myRes = new Response();
       try {
             let { name, description, ingredients, steps, preparationTime, portions} = req.body;
            // Validaciones datos
            if(!name || !description || !ingredients || !steps || !preparationTime || !portions) {
                myRes.generateResponseFalse(res, 'Faltan campos', 'Faltan campos', 400);
                return;
            } 

            // Conversión a string
            if(typeof(ingredients) !== 'string') {
                ingredients = ingredients.join();
            }

            const normalizedName = name.replaceAll(' ', '').toLowerCase();
            // Normalizando ingredientes, alergenos y nombre
            const normalizedIngredients = ingredients.toLowerCase().replaceAll(' ', '').split(',');

            // Conversión a array de vuelta
            ingredients = ingredients.split(',').map(i => i.trim());

            const newRecipe = new recipesModel({ name, normalizedName, description, ingredients, normalizedIngredients, steps, preparationTime, portions});
            const dataSaved = await newRecipe.save();
            console.log(dataSaved);
            myRes.generateResponseTrue(res, 'Receta Agregada', dataSaved);
        } catch (err) {
            myRes.generateResponseFalse(res, 'No se pudo guardar la receta', 'No se pudo guardar la receta porque', 500, err);
        }   
    }

    async getRecipeById(req, res) {
        const myRes = new Response();
        try {
            const id = req.params.id;
            if(id.length !== 24) {
                myRes.invalidId(res);
                return;
            } else {
                const recipeById = await recipesModel.findById(id);
                if(recipeById) {
                    myRes.generateResponseTrue(res, 'Receta escontrada', recipeById);
                } else {
                    myRes.generateResponseFalse(res, 'Receta no escontrada', 'No se pudo encontrar la receta', 404);
                }
            }
        } catch (err){
            myRes.generateResponseFalse(res, 'No se pudo encontrar la receta', 'No se pudo encontrar la receta porque', 500, err);
        }
    }

    async uptdateRecipeById(req, res) {
        const myRes = new Response();
        try {
            const id = req.params.id;
            if(id.length !== 24) {
                myRes.invalidId(res);
                return;
            } else {
                let { name, description, ingredients, steps, preparationTime, portions} = req.body;
                 if(!name  || !description || !ingredients || !steps || !preparationTime || !portions) {
                myRes.generateResponseFalse(res, 'Faltan campos', 'Faltan campos', 400);
                return;
            } 
                
                // Conversión a string (si no lo es), para mejor manipulación.
                if(typeof(ingredients) !== 'string') {
                    ingredients = ingredients.join();
                }
         
                
                // Normalizando ingredientes, alergenos y nombre
                const normalizedIngredients = ingredients.toLowerCase().replaceAll(' ', '').split(',');
                const normalizedName = name.replaceAll(' ', '').toLowerCase();
                
                // Conversión a array de vuelta para guardado en Base de Datos
                ingredients = ingredients.split(',').map(i => i.trim());

                const recipeToUpdate = await recipesModel.findByIdAndUpdate(id, { name, normalizedName, description, ingredients, normalizedIngredients, steps, preparationTime, portions});
                if(recipeToUpdate) {
                    myRes.generateResponseTrue(res, 'Receta actualizada', recipeToUpdate);
                } else {
                    myRes.generateResponseFalse(res, 'Receta no encontrada', 'No se pudo encontrar la receta', 404);
                }
            }     
        } catch (err) {
            myRes.generateResponseFalse(res, 'No se pudo actualizar el alimento', 'No se pudo actualizar el Alimento porque', 500, err);
        }
    }

    async deleteRecipeById(req, res) {
        const myRes = new Response();
        try {
            const id = req.params.id;
            if(id.length !== 24) {
                myRes.invalidId(res);
                return;
            } else {
                const recipeToDelete = await recipesModel.findByIdAndDelete(id);
                if(recipeToDelete) {
                    myRes.generateResponseTrue(res, 'Receta eliminada', recipeToDelete);
                } else {
                    myRes.generateResponseFalse(res, 'Receta no encontrada', 'No se pudo encontrar la receta', 404);
                }
            }
        } catch (err) {
            myRes.generateResponseFalse(res, 'No se pudo eliminar la receta', 'No se pudo eliminar la receta porque', 500, err);
        }
    }


    async getRecipesByName(req, res) {
        const myRes = new Response();
        try {
            let name = req.params.name;
            if(!name) {
                myRes.generateResponseFalse(res, 'No hay un nombre propocionado', 'No hay un nombre propocionado', 500);
                return;
            } else {
                name = name.replaceAll(' ', '').toLowerCase();    
                const recipeByName = await recipesModel.findOne({"normalizedName": name});
                if(recipeByName) {
                    myRes.generateResponseTrue(res, 'Receta encontrada', recipeByName);
                } else {
                    myRes.generateResponseFalse(res, 'Receta no encontrada', 'No se pudo encontrar la receta', 404);
                }
            }
        } catch (err) {
            myRes.generateResponseFalse(res, 'No se pudo encontrar la receta', 'No se pudo encontrar la receta porque', 500, err);
        }
    }

    async getRecipeByIngredient(req, res) {
        const myRes = new Response();
        try {
            let ingredient = req.params.ingredient;
            ingredient = ingredient.toLowerCase().trim();
            if(!ingredient) {
                myRes.generateResponseFalse(res, 'No hay un ingrediente propocionado', 'No hay un ingrediente propocionado', 500);
                return;
            }
            const allRecipes = await recipesModel.find();
            let matchedRecipes = [];
            for(const recipes of allRecipes) {
                if(!recipes.normalizedIngredients.includes(ingredient)) {
                    matchedRecipes.push(recipes);
                }
            }
            if(matchedRecipes.length != 0) {
                myRes.generateResponseTrue(res, 'Receta encontrada', matchedRecipes);
            } else {
                myRes.generateResponseFalse(res, 'Ninguna receta coincide con ese ingrediente', 'Ninguna receta coincide con ese ingrediente', 404);
            }
        } catch (err) {
            myRes.generateResponseFalse(res, 'No se pudo encontrar la receta', 'No se pudo encontrar la receta porque', 500, err);
        }
    }
}

export default recipeController;