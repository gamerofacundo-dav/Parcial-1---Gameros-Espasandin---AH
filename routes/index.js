import userRouter from "./userRouter.js";
import foodRouter from './foodRouter.js';
import historyRouter from './historyRouter.js';
import intolerancesRouter from './intolerancesRouter.js';
import recipesRouter from './recipesRouter.js'


const routerAPI = (app) => {
    app.use('/api/users', userRouter);
    app.use('/api/food', foodRouter);
    app.use('/api/history', historyRouter);
    app.use('/api/intolerances', intolerancesRouter);
    app.use('/api/recipes', recipesRouter);
}

export default routerAPI;