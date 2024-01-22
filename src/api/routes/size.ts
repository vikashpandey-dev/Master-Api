import { Router, Request, Response } from 'express';
import middlewares from '../middlewares';
import comtroller from '../controlers';
const route = Router();
export default (app: Router) => {
  app.use('/size', route);
  route.post(
    '/add',
    // middlewares.isAuth,
    // middlewares.attachCurrentUser,
    comtroller.size.size,
  );
};
