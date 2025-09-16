import userModel from "../model/userModel.js";
import Response from "../classes/Response.js";
import passManager from "../classes/passManager.js";

class userController {
    async getUsers(req, res) {
        const myRes = new Response();
        try {
            const users = await userModel.find();
            myRes.generateResponseTrue(res, 'Usuarios escontrados', users);
        } catch (err) {
            myRes.generateResponseFalse(res, 'Usuarios no encontrados', 'No se pudo encontrar los usuarios', 500, err);
           
        }
    }

    async addUser(req, res) {
        const myRes = new Response();
        try {
      
            let { name, email, password, allergy } = req.body;
        
            if(!name || !email || !password || !allergy) {
                myRes.generateResponseFalse(res, 'Faltan Campos', 'Faltan Campos', 400);
                return;
            }

            const passMan = new passManager(10);
            password = passMan.hashPassword(password);

            const newUser = new userModel({ name, email, password, allergy });
            const dataSaved = await newUser.save();
            console.log(dataSaved);
            myRes.generateResponseTrue(res, 'Usuario Agregado', dataSaved);
        } catch (err) {
            myRes.generateResponseFalse(res, 'No se pudo agregar al usuario', 'No se pudo agregar al usuario porque: ', 500, err);
        }
    }

    async getUserById (req, res) {
        const myRes = new Response();
        try {
            const id =  req.params.id;
            const user = await userModel.findById(id);
            if(user) {
                myRes.generateResponseTrue(res, 'Usuario Encontrado', user);
            } else {
                myRes.generateResponseFalse(res, 'No se encontró al usuario', 'No se pudo encontrar al usuario porque: ', 500, err);
            }
        } catch (err) {
            myRes.generateResponseFalse(res, 'No se pudo encontrar al usuario', 'No se pudo encontrar al usuario porque: ', 500, err);
        }

    }

    async deleteUserById(req, res) {
        const myRes = new Response();
        try {
            const id = req.params.id;
            if(id.length === 24) {
                const userToDelete = await userModel.findByIdAndDelete(id);
                if(userToDelete) {
                    myRes.generateResponseTrue(res, 'Usuario Eliminado correctamente', '');
                } else {
                    myRes.generateResponseFalse(res, 'Usuario no encotrado, probablemente ya haya sido eliminado anteriormente. Te recomendamos buscarlo con GET', 'No se encontró al usuario', 404);
                }
            } else {
                myRes.generateResponseFalse(res, 'El id propocionado no es válido, debe contener 24 caracteres', 'El id propocionado no es válido', 500);
            }
            
        } catch (err) {
            myRes.generateResponseFalse(res, 'No se pudo eliminar al usuario', 'No se pudo eliminar al usuario porque: ', 500, err);
        }
    }

    async updateUserById(req, res) {
        const myRes = new Response();
        try {
            const id = req.params.id;
            let { name, password, allergy } = req.body;
            if(id.length === 24) {    
                if(!name || !password || !allergy) {
                    myRes.generateResponseFalse(res, 'Faltan campos', 'Faltan campos', 400);
                } else {
                    const passMan = new passManager(10);
                    password = passMan.hashPassword(password);
                    const userToUpdate = await userModel.findByIdAndUpdate(id, { name, password, allergy }); 
                    if(userToUpdate) {
                        myRes.generateResponseTrue(res, 'Usuario actualizado correctamente', '');
                    } else {
                         myRes.generateResponseFalse(res, 'Usuario no encotrado', 'No se encontró al usuario', 404);
                    }
                }
            } else {
                myRes.generateResponseFalse(res, 'El id propocionado no es válido, debe contener 24 caracteres', 'El id propocionado no es válido', 500);
            }
        } catch (err) {
            myRes.generateResponseFalse(res, 'No se pudo actualizar al usuario', 'No se pudo actualizar al usuario porque: ', 500, err);
        }
    }
}

export default userController;