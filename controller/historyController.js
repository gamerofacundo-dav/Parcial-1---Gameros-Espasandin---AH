import historyModel from "../model/historyModel.js";
import Response from "../classes/Response.js";
import passManager from "../classes/passManager.js";

class historyController {
    async getHistory(req, res) { 
        const myRes = new Response();
        try {
            const history = await historyModel.find();
            myRes.generateResponseTrue(res, 'Historial de búsqueda', history);
        } catch (err) {
            myRes.generateResponseFalse(res, 'Alimentos se pudo encontrar el historial','No se encontró el historial completo', 500, err);
        }   
    }

    async getHistoryById(req, res) { 
        const myRes = new Response();
        try {
            const { id } = req.params;
            const history = await historyModel.findById(id);
            if(history) {
                myRes.generateResponseTrue(res, 'Historial de búsqueda', history);
            } else {
                myRes.generateResponseFalse(res, 'No hay historial', 'no se encontró ese historial', 404);
            }
        } catch (err) {
            myRes.generateResponseFalse(res, 'Error al acceder al historial','Hubo un error al acceder al historial', 500, err);
        }
    }

    async addHistory(req, res) {
        const myRes = new Response();
        try {
            let { id_usuario, id_alimento, fecha, resultado } = req.body;
            if(!id_usuario || !id_alimento || !fecha || !resultado) {
                myRes.generateResponseFalse(res, 'Faltan Campos', 'Todos los campos son obligatorios', 400);
                return;
            }
            const newHistory = new historyModel({ id_usuario, id_alimento, fecha, resultado });
            const savedHistory = await newHistory.save();
            myRes.generateResponseTrue(res, 'Historial agregado', savedHistory);
        }
        catch (err) {
            myRes.generateResponseFalse(res, 'No se pudo agregar el historial', 'Error al guardar el historial', 500, err);
        }
    }

    async getHistoryByUserId(req, res) { 
        const myRes = new Response();
        try {
            const id_usuario = req.params.id_usuario;
            if(!id_usuario) {
                myRes.generateResponseFalse(res, 'Faltan Campos', 'El id del usuario es obligatorio', 400);
                return;
            }
            const userhistory = await historyModel.find({ id_usuario: id_usuario });
            if(userhistory.length > 0) {
                myRes.generateResponseTrue(res, 'Historial de búsqueda del usuario', userhistory);
            } else {
                myRes.generateResponseFalse(res, 'No hay historial para este usuario','El usuario no posee historial', 404);
            }
        } catch (err) {
            myRes.generateResponseFalse(res, 'Error al acceder al historial del usuario', 'Ocurrió n error al acceder al historial de este usuario', 500, err);
        }
    }

    async deleteHistoryById(req, res) { 
        const myRes = new Response();
        try {
            const id = req.params;
            const deletedhistory = await historyModel.findByIdAndDelete(id);
            if(deletedhistory) {
                myRes.generateResponseTrue(res, 'Historial eliminado', deletedhistory);
            } else {
                myRes.generateResponseFalse(res, 'No hay historial', 'No existe el historial', 404);
            }
        } catch (err) {
            myRes.generateResponseFalse(res, 'Error al eliminar el historial','Error al intentar eliminar el historial', 500, err);
        }
    }

    async deleteHistoryByUserId(req, res) { 
        const myRes = new Response();
        try {
            const id_usuario = req.params.id_usuario;
            if(!id_usuario) {
                myRes.generateResponseFalse(res, 'Faltan Campos', 'El id del usuario es obligatorio', 400);
                return;
            }
            const deletedhistory = await historyModel.deleteMany({ id_usuario: id_usuario });
            
            myRes.generateResponseTrue(res, 'Historial del usuario eliminado', deletedhistory);
            
        } catch (err) {
            myRes.generateResponseFalse(res, 'Error al eliminar el historial del usuario','Ocurrió un error al intentar eliminar el historial del usuario', 500, err);
        }
    }
}
export default historyController;