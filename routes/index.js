import userRouter from "./userRouter.js";
import foodRouter from './foodRouter.js';

const routerAPI = (app) => {
    app.use('/api/users', userRouter);
    app.use('/api/food', foodRouter);
}

export default routerAPI;