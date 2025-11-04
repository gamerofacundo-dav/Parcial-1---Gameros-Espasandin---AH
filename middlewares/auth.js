import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

const SECRET_KEY = process.env.SECRET_KEY;

console.log(SECRET_KEY, 'SECRET KEY AUTH')

const auth = (req, res, next) => {

    const data = req.headers.authorization || '';
    const token = data.startsWith("Bearer ") ? data.slice(7) : null;


    if(!token) {
        return res.status(401).json({msg: 'No tenes permisos'});
    }
    try {
        const payload = jwt.verify(token, SECRET_KEY);
        console.log(payload);
        const { id, name } = payload;
        req.user = { id, name};
        next();
    } catch (error) {
        console.log(error, 'Token invalido');
        return res.status(401).json({msg: 'Token inválido'})
    }

}

export default auth; 