import { Router, Request, Response } from 'express';
import middlewares from '../middlewares';
import comtroller from '../controlers';
const route = Router();
export default (app: Router) => {
  app.use('/Blog', route);
  route.post(
    '/add',
    comtroller.Blog.create,
  );
  route.post(
    '/get',
    comtroller.Blog.get,
  );
};
