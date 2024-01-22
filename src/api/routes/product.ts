import { Router, Request, Response } from 'express';
import middlewares from '../middlewares';
import comtroller from '../controlers';
const route = Router();
export default (app: Router) => {
  app.use('/product', route);
  route.post(
    '/add',
    middlewares.FileUpload([
      { name: 'images', maxCount: 6 },
      { name: 'single', maxCount: 1 }

    ]),
    // middlewares.isAuth,
    // middlewares.attachCurrentUser,
    middlewares.UploadtoCloud,
    comtroller.product.product,
  );
    route.post(
    '/get',
    // middlewares.isAuth,
    // middlewares.attachCurrentUser,
    comtroller.product.Get,
  );
};
