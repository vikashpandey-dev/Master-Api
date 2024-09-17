import { Router, Request, Response } from 'express';
import middlewares from '../middlewares';
import comtroller from '../controlers';
const route = Router();
export default (app: Router) => {
  app.use('/Blog', route);
  route.post(
    '/add',
    middlewares.FileUpload([
      { name: 'images', maxCount: 1 },

    ]),
    middlewares.UploadtoCloud,
    comtroller.Blog.create,
  );
  route.post(
    '/get',
    comtroller.Blog.get,
  );
  route.post(
    '/update',
    middlewares.FileUpload([
      { name: 'images', maxCount: 5 },

    ]),
    middlewares.UploadtoCloud,
    comtroller.Blog.update,
  );
  route.post(
    '/delete',
    comtroller.Blog.delete,
  );
  route.post(
    '/dashboard',
    comtroller.Blog.dashboard,
  );
};
