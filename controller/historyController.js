import historyModel from "../model/historyModel.js";
import Response from "../classes/Response.js";
import passManager from "../classes/passManager.js";

class historyController {
    async getHistory(req, res) { 
        const myRes = new Response();
        try {
            const history = await historyModel.find();
            myRes.ResponseTrue(res, 'Historial de búsqueda', history);
        } catch (err) {
            myRes.ResponseFalse(res, 'Alimentos se pudo encontrar el historial', 500, err);
        }   
    }

    async getHistoryById(req, res) { 
        const myRes = new Response();
        try {
            const { id } = req.params;
            const history = await historyModel.findById(id);
            if(history) {
                myRes.ResponseTrue(res, 'Historial de búsqueda', history);
            } else {
                myRes.ResponseFalse(res, 'No hay historial', 404);
            }
        } catch (err) {
            myRes.ResponseFalse(res, 'Error al acceder al historial', 500, err);
        }
    }

    async addHistory(req, res) {
        const myRes = new Response();
        try {
            let { id_usuario, id_alimento, fecha, resultado } = req.body;
            if(!id_usuario || !id_alimento || !fecha || !resultado) {
                myRes.ResponseFalse(res, 'Faltan Campos', 'Todos los campos son obligatorios', 400);
                return;
            }
            const newHistory = new historyModel({ id_usuario, id_alimento, fecha, resultado });
            const savedHistory = await newHistory.save();
            myRes.ResponseTrue(res, 'Historial agregado', savedHistory);
        }
        catch (err) {
            myRes.ResponseFalse(res, 'No se pudo agregar el historial', 'Error al guardar el historial', 500, err);
        }
    }

    async getHistoryByUserId(req, res) { 
        const myRes = new Response();
        try {
            const id_usuario = req.params.id_usuario;
            if(!id_usuario) {
                myRes.ResponseFalse(res, 'Faltan Campos', 'El id del usuario es obligatorio', 400);
                return;
            }
            const userhistory = await historyModel.find({ id_usuario: id_usuario });
            if(userhistory.length > 0) {
                myRes.ResponseTrue(res, 'Historial de búsqueda del usuario', userhistory);
            } else {
                myRes.ResponseFalse(res, 'No hay historial para este usuario', 404);
            }
        } catch (err) {
            myRes.ResponseFalse(res, 'Error al acceder al historial del usuario', 500, err);
        }
    }

    async deleteHistoryById(req, res) { 
        const myRes = new Response();
        try {
            const id = req.params;
            const deletedhistory = await historyModel.findByIdAndDelete(id);
            if(deletedhistory) {
                myRes.ResponseTrue(res, 'Historial eliminado', deletedhistory);
            } else {
                myRes.ResponseFalse(res, 'No hay historial', 404);
            }
        } catch (err) {
            myRes.ResponseFalse(res, 'Error al eliminar el historial', 500, err);
        }
    }

    async deleteHistoryByUserId(req, res) { 
        const myRes = new Response();
        try {
            const id_usuario = req.params.id_usuario;
            if(!id_usuario) {
                myRes.ResponseFalse(res, 'Faltan Campos', 'El id del usuario es obligatorio', 400);
                return;
            }
            const deletedhistory = await historyModel.deleteMany({ id_usuario: id_usuario });
            
            myRes.ResponseTrue(res, 'Historial del usuario eliminado', deletedhistory);
            
        } catch (err) {
            myRes.ResponseFalse(res, 'Error al eliminar el historial del usuario', 500, err);
        }
    }
}
export default historyController;