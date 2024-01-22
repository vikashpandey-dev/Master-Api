import { Router, Request, Response } from 'express';
import middlewares from '../middlewares';
import comtroller from '../controlers';
const route = Router();
export default (app: Router) => {
  app.use('/category', route);
  route.post(
    '/add',
    // middlewares.isAuth,
    // middlewares.attachCurrentUser,
    middlewares.FileUpload([
      { name: 'images', maxCount: 10 },
      { name: 'categoryimg', maxCount: 1 }

    ]),
    middlewares.UploadtoCloud,
    comtroller.category.Addcategory,
  );
  route.post(
    '/get',
    // middlewares.isAuth,
    // middlewares.attachCurrentUser,
    middlewares.UploadtoCloud,
    comtroller.category.getCategory,
  );
};
