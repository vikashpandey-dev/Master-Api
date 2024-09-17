import { Router, Request, Response, NextFunction } from 'express';
import { Container } from 'typedi';
import AuthService from '@/services/auth';
import { IUserInputDTO } from '@/interfaces/IUser';
import middlewares from '../middlewares';
import { celebrate, Joi } from 'celebrate';
import { Logger } from 'winston';
import comtroller from  "../controlers"                                                                     
const route = Router();

export default (app: Router) => {
  app.use('/auth', route);

  route.post(
    '/signup',
    comtroller.auth.Signup
  );
  route.post(
    '/currentuser',
    comtroller.auth.currentuser
  );
  route.post(
    '/signin',
    comtroller.auth.SignIn
  );
  route.post(
    '/signinu',
    comtroller.auth.updateUser
  );
  route.post(
    '/users',
    comtroller.auth.users
  );
  route.post(
    '/alluser',
    comtroller.auth.alluser
  );
  route.post(
    '/updateProfile',
    middlewares.FileUpload([
      { name: 'profile', maxCount: 1 }

    ]),
    middlewares.UploadtoCloud,
    comtroller.auth.updateProfile
  );
  route.post(
    '/getsingle',
    comtroller.auth.getsingle
  );
  route.post(
    '/message',
    comtroller.auth.message
  );
  route.post(
    '/getmessage',
    comtroller.auth.getmessage
  );

  route.post('/logout', middlewares.isAuth, (req: Request, res: Response, next: NextFunction) => {
    const logger:Logger = Container.get('logger');
    logger.debug('Calling Sign-Out endpoint with body: %o', req.body);
    try {
      //@TODO AuthService.Logout(req.user) do some clever stuff
      return res.status(200).end();
    } catch (e) {
      logger.error('🔥 error %o', e);
      return next(e);
    }
  });
};
