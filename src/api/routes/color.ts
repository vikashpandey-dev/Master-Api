import { Router, Request, Response } from 'express';
import middlewares from '../middlewares';
import comtroller from '../controlers';
const route = Router();
export default (app: Router) => {
  app.use('/color', route);
  route.post(
    '/add',
    middlewares.FileUpload([
      { name: 'images', maxCount: 5 },

    ]),
    middlewares.isAuth,
    middlewares.attachCurrentUser,
    middlewares.UploadtoCloud,
    comtroller.color.color,
  );
};
