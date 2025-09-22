import userRouter from "./userRouter.js";
import foodRouter from './foodRouter.js';
import historyRouter from './historyRouter.js';
import intolerancesRouter from './intolerancesRouter.js';


const routerAPI = (app) => {
    app.use('/api/users', userRouter);
    app.use('/api/food', foodRouter);
    app.use('/api/history', historyRouter);
    app.use('/api/intolerances', intolerancesRouter);
}

export default routerAPI;