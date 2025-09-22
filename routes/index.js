import userRouter from "./userRouter.js";
import foodRouter from './foodRouter.js';
import historyRouter from './historyRouter.js';

const routerAPI = (app) => {
    app.use('/api/users', userRouter);
    app.use('/api/food', foodRouter);
    app.use('/api/history', historyRouter);
}

export default routerAPI;