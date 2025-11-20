import userModel from "../model/userModel.js";
import Response from "../classes/Response.js";
import passManager from "../classes/passManager.js";
import jsonwebtoken from 'jsonwebtoken'
import dotenv from 'dotenv';

dotenv.config();
const SECRET_KEY = process.env.SECRET_KEY;

console.log(SECRET_KEY, 'SECRET KEY USER')

class userController {
    async getUsers(req, res) {
        const myRes = new Response();
        try {
            const users = await userModel.find().populate('allergy');
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
            allergy = allergy.trim().normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();

            const newUser = new userModel({ name, email, password, allergy, created_at: Date(), updated_at: null });
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
                myRes.generateResponseFalse(res, 'No se encontró al usuario', 'No se pudo encontrar al usuario porque: ', 404, err);
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
                myRes.invalidId(res);
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
                    allergy = allergy.trim().normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
                    const userToUpdate = await userModel.findByIdAndUpdate(id, { name, password, allergy, updated_at: Date() }); 
                    if(userToUpdate) {
                        myRes.generateResponseTrue(res, 'Usuario actualizado correctamente', '');
                    } else {
                         myRes.generateResponseFalse(res, 'Usuario no encotrado', 'No se encontró al usuario', 404);
                    }
                }
            } else {
                myRes.invalidId(res);
            }
        } catch (err) {
            myRes.generateResponseFalse(res, 'No se pudo actualizar al usuario', 'No se pudo actualizar al usuario porque: ', 500, err);
        }
    }

    async updateUserAllergyById(req, res) {
        const myRes = new Response();
        try {
            const id = req.params.id;
            let { allergy } = req.body;
            if(id.length === 24) {    
                if(!allergy) {
                    myRes.generateResponseFalse(res, 'Falta la alergia', 'Falta la alergia', 400);
                } else {
    
                    const userToUpdate = await userModel.findByIdAndUpdate(id, { allergy, updated_at: Date() }, {new: true}); 
                    if(userToUpdate) {
                        const newToken = jsonwebtoken.sign(
                            {
                                id: userToUpdate._id,
                                name: userToUpdate.name,
                                allergy: userToUpdate.allergy
                            },
                            process.env.SECRET_KEY,
                            { expiresIn: '7d' }
                        )
                        myRes.generateResponseTrue(res, 'Usuario actualizado correctamente', newToken);

                    } else {
                        myRes.generateResponseFalse(res, 'Usuario no encotrado', 'No se encontró al usuario', 404);
                    }
                }
            } else {
                myRes.invalidId(res);
            }
        } catch (err) {
            myRes.generateResponseFalse(res, 'No se pudo actualizar al usuario', 'No se pudo actualizar al usuario porque: ', 500, err);
        }
    }

    async login(req, res) {
        const myRes = new Response();
        const passwdManager = new passManager();
        try {
            const { email, password } = req.body;
            const user = await userModel.findOne({email});
            console.log(user);
            if(!user){
                myRes.generateResponseFalse(res, 'Usuario no encotrado', 'No se encontró al usuario', 404);
                return;
            }
            const status = await passwdManager.comparePassword(password, user.password);
            if( !status){
                myRes.generateResponseFalse(res, 'Clave inválida', 'Clave inválida', 404);
                return;
            }
            const payload = {
                id: user._id,
                name: user.name,
                allergy: user.allergy
            }
            const jwt = jsonwebtoken.sign( payload, SECRET_KEY, { expiresIn: '1h'} );
            myRes.generateResponseTrue(res, 'Usuario actualizado correctamente', jwt);
        } catch (err) {
            console.error(err);
            myRes.generateResponseFalse(res, 'Error en el servidor al autenticar', 'No se pudo autenticar al usuario porque: ', 500, err);
        }
    }
}

export default userController;