import { Router, Request, Response } from 'express';
import middlewares from '../middlewares';
import comtroller from '../controlers';
const route = Router();
export default (app: Router) => {
  app.use('/gupshup', route);
  route.post(
    '/add',
 
    comtroller.gupshup.gupshup,
  );
};
