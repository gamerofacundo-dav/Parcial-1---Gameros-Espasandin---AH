import intolerancesModel from "../model/intolerancesModel.js";
import Response from "../classes/Response.js";
import passManager from "../classes/passManager.js";

class intolerancesController{
    constructor() {
    }

    async addIntolerance(req, res) {
        const response = new Response();
        try {
            let { name, normalizedName, description, type, normalizedType, symptoms, severity, normalizedSeverity, restrictedIngredients, alternativesIngredients } = req.body;

            //Valido los campos
            if(!name || !description || !type || !symptoms || !severity || !restrictedIngredients || !alternativesIngredients) {
                response.generateResponseFalse(res, "Todos los campos son requeridos", "Todos los campos son requeridos", 400);
                return;
            }

            //Paso a string los campos
            if(typeof(symptoms) !== 'string') {
                symptoms = symptoms.join();
            }
            if(typeof(restrictedIngredients) !== 'string') {
                restrictedIngredients = restrictedIngredients.join();
            }
            if(typeof(alternativesIngredients) !== 'string') {
                alternativesIngredients = alternativesIngredients.join();
            }

            //Normalizo y valido el campo type
            if(type === 1) {
                normalizedType = "intolerancia";
            } else if(type === 2) {
                normalizedType = "alergia";
            } else {
                response.generateResponseFalse(res, "El campo type debe ser 1 (intolerancia) o 2 (alergia)", "El campo type debe ser 1 (intolerancia) o 2 (alergia)", 400);
                return;
            }

            //Normalizo y valido el campo severity
            if(severity === 1) {
                normalizedSeverity = "leve";
            } else if(severity === 2) {
                normalizedSeverity = "moderado";
            } else if(severity === 3) {
                normalizedSeverity = "severo";
            } else if(severity === 4) {
                normalizedSeverity = "muy severo";
            } else {
                response.generateResponseFalse(res, "El campo severity debe ser 1 (leve), 2 (moderado), 3 (severo) o 4 (muy severo)", "El campo severity debe ser 1 (leve), 2 (moderado), 3 (severo) o 4 (muy severo)", 400);
                return;
            }

            //Normalizo los demas campos
            normalizedName = name.replaceAll(' ', '').toLowerCase();
            const normalizedSymptoms = symptoms.toLowerCase().replaceAll(' ', '').split(',');
            const normalizedRestrictedIngredients = restrictedIngredients.toLowerCase().replaceAll(' ', '').split(',');
            const normalizedAlternativesIngredients = alternativesIngredients.toLowerCase().replaceAll(' ', '').split(',');
            
            //Paso a array nuevamente los campos
            symptoms = symptoms.split(',').map(i => i.trim());
            restrictedIngredients = restrictedIngredients.split(',').map(i => i.trim());
            alternativesIngredients = alternativesIngredients.split(',').map(i => i.trim());

            const newIntolerance = new intolerancesModel({
                name,
                normalizedName,
                description,
                type,
                normalizedType,
                symptoms,
                normalizedSymptoms,
                severity,
                normalizedSeverity,
                restrictedIngredients,
                normalizedRestrictedIngredients,
                alternativesIngredients,
                normalizedAlternativesIngredients,
            });

            const intoleranceSaved = await newIntolerance.save();
            console.log(intoleranceSaved);
            response.generateResponseTrue(res, 'Intolerancia creada correctamente', intoleranceSaved);

            }catch (error) {
            response.generateResponseFalse(res, 'No se pudo crear la intolerancia', 'No se pudo crear la intolerancia', 500, error);
        }

    }

    async updateIntoleranceById(req, res) {
        const response = new Response();
        try {
            const id = req.params.id;
            if (id.length !== 24) {
                response.invalidId(res);
            }else{
               let { name, description, type, symptoms, severity, restrictedIngredients, alternativesIngredients } = req.body;

               if(!name || !description || !type || !symptoms || !severity || !restrictedIngredients || !alternativesIngredients) {
                response.generateResponseFalse(res, "Todos los campos son requeridos", "Todos los campos son requeridos", 400);
                return;
               }
               
               if(typeof(symptoms) !== 'string') {
                symptoms = symptoms.join();
               }
               if(typeof(restrictedIngredients) !== 'string') {
                restrictedIngredients = restrictedIngredients.join();
               }
               if(typeof(alternativesIngredients) !== 'string') {
                alternativesIngredients = alternativesIngredients.join();
               }

               // Declaraciones previas para variables normalizadas
               let normalizedType;
               let normalizedSeverity;
               let normalizedName;

               if(type === 1) {
                normalizedType = "intolerancia";
               } else if(type === 2) {
                normalizedType = "alergia";
               } else {
                response.generateResponseFalse(res, "El campo type debe ser 1 (intolerancia) o 2 (alergia)", "El campo type debe ser 1 (intolerancia) o 2 (alergia)", 400);
                return;
               }

               if(severity === 1) {
                normalizedSeverity = "leve";
               } else if(severity === 2) {
                normalizedSeverity = "moderado";
               } else if(severity === 3) {
                normalizedSeverity = "severo";
               } else if(severity === 4) {
                normalizedSeverity = "muy severo";
               } else {
                response.generateResponseFalse(res, "El campo severity debe ser 1 (leve), 2 (moderado), 3 (severo) o 4 (muy severo)", "El campo severity debe ser 1 (leve), 2 (moderado), 3 (severo) o 4 (muy severo)", 400);
                return;
               }

               normalizedName = name.replaceAll(' ', '').toLowerCase();
               const normalizedSymptoms = symptoms.toLowerCase().replaceAll(' ', '').split(',');
               const normalizedRestrictedIngredients = restrictedIngredients.toLowerCase().replaceAll(' ', '').split(',');
               const normalizedAlternativesIngredients = alternativesIngredients.toLowerCase().replaceAll(' ', '').split(',');

               symptoms = symptoms.split(',').map(i => i.trim());
               restrictedIngredients = restrictedIngredients.split(',').map(i => i.trim());
               alternativesIngredients = alternativesIngredients.split(',').map(i => i.trim());

               const intoleranceUpdated = await intolerancesModel.findByIdAndUpdate(id, {
                name,
                normalizedName,
                description,
                type,
                normalizedType,
                symptoms,
                normalizedSymptoms,
                severity,
                normalizedSeverity,
                restrictedIngredients,
                normalizedRestrictedIngredients,
                alternativesIngredients,
                normalizedAlternativesIngredients,
               });

               if(!intoleranceUpdated) {
                response.generateResponseFalse(res, 'No se encontró la intolerancia', 'No se encontró la intolerancia', 404);
                return;
               }else{
                response.generateResponseTrue(res, 'Intolerancia actualizada correctamente', intoleranceUpdated);
               }
            }
        } catch (error) {
            response.generateResponseFalse(res, 'No se pudo actualizar la intolerancia', 'No se pudo actualizar la intolerancia', 500, error);
        }

    }

    async deleteIntoleranceById(req, res) {
        const response = new Response();
        try {
            const id = req.params.id;
            if (id.length !== 24) {
                response.invalidId(res);
                return;
            }else{
                const intoleranceDeleted = await intolerancesModel.findByIdAndDelete(id);
                if(!intoleranceDeleted) {
                    response.generateResponseFalse(res, 'No se encontró la intolerancia', 'No se encontró la intolerancia', 404);
                    return;
                }else{
                    response.generateResponseTrue(res, 'Intolerancia eliminada correctamente', intoleranceDeleted);
                }
            }
        } catch (error) {
            response.generateResponseFalse(res, 'No se pudo eliminar la intolerancia', 'No se pudo eliminar la intolerancia', 500, error);
        }

    }

    async getAllIntolerances(req, res) {
        const response = new Response();
        try {
            const intolerances = await intolerancesModel.find();
            response.generateResponseTrue(res, 'Intolerancias obtenidas correctamente', intolerances);
        } catch (error) {
            response.generateResponseFalse(res, 'No se pudo obtener las intolerancias', 'No se pudo obtener las intolerancias', 500, error);
        }

    }

    async getIntoleranceById(req, res) {
        const response = new Response();
        try {
            const id = req.params.id;
            if (id.length !== 24) {
                response.invalidId(res);
            }else{
                const intoleranceById = await intolerancesModel.findById(id);
                if (!intoleranceById) {
                    response.generateResponseFalse(res, 'Intolerancia no encontrada', 'Intolerancia no encontrada', 404);
                }else{
                    response.generateResponseTrue(res, 'Intolerancia encontrada correctamente', intoleranceById);
                }
            }
        } catch (error) {
            response.generateResponseFalse(res, 'No se pudo obtener la intolerancia', 'No se pudo obtener la intolerancia', 500, error);
        }

    }

    async getIntoleranceByName(req, res) {
        const response = new Response();
        try {
            let name = req.params.name;
            if(!name) {
                response.generateResponseFalse(res, 'El campo name es requerido', 'El campo name es requerido', 400);
                return;
            } else {
                name = name.replaceAll(' ', '').toLowerCase();
                const intoleranceByName = await intolerancesModel.findOne({ normalizedName: name });
                if(!intoleranceByName) {
                    response.generateResponseFalse(res, 'Intolerancia no encontrada', 'Intolerancia no encontrada', 404);
                    return;
                }else{
                    response.generateResponseTrue(res, 'Intolerancia encontrada correctamente', intoleranceByName);
                }
            }
        } catch (error) {
            response.generateResponseFalse(res, 'No se pudo obtener la intolerancia', 'No se pudo obtener la intolerancia', 500, error);
        }
    }
}

export default intolerancesController;