import { Router, Request, Response, NextFunction } from 'express';
import { Container } from 'typedi';
import AuthService from '@/services/auth';
import { Logger } from 'winston';

class auth {
  Signup = async (req: Request, res: Response, next: NextFunction) => {
    const logger: Logger = Container.get('logger');
    logger.debug('Calling Sign-Up endpoint with body: %o', req);
    try {
      const authServiceInstance = Container.get(AuthService);
      const { user } = await authServiceInstance.SignUp(req);
      return res.json({ user }).status(200);
    } catch (e) {
      logger.error('🔥 error: %o', e);
      return next(e);
    }
  };
  currentuser = async (req: Request, res: Response, next: NextFunction) => {
    const logger: Logger = Container.get('logger');
    logger.debug('Calling Sign-Up endpoint with body: %o', req);
    try {
      const authServiceInstance = Container.get(AuthService);
      const { user } = await authServiceInstance.currentuser(req);
      return res.json({ user }).status(200);
    } catch (e) {
      logger.error('🔥 error: %o', e);
      return next(e);
    }
  };
  SignIn = async (req: Request, res: Response, next: NextFunction) => {
    const logger: Logger = Container.get('logger');
    logger.debug('Calling Sign-In endpoint with body: %o', req.body);
    try {
      // const { email, password } = req.body;
      const authServiceInstance = Container.get(AuthService);
      const { user } = await authServiceInstance.SignIn(req.body);
      return res.json({ user }).status(200);
    } catch (e) {
      logger.error('🔥 error: %o', e);
      return next(e);
    }
  };
  updateUser = async (req: Request, res: Response, next: NextFunction) => {
    const logger: Logger = Container.get('logger');
    logger.debug('Calling Sign-In endpoint with body: %o', req.body);
    try {
      const {} = req.body;
      const authServiceInstance = Container.get(AuthService);
      const { user } = await authServiceInstance.updateUser(req.body);
      return res.json({ user }).status(200);
    } catch (e) {
      logger.error('🔥 error: %o', e);
      return next(e);
    }
  };
  users= async (req: Request, res: Response, next: NextFunction) => {
    const logger: Logger = Container.get('logger');
    logger.debug('Calling Sign-In endpoint with body: %o', req.body);
    try {
      const {} = req.body;
      const authServiceInstance = Container.get(AuthService);
      const { user } = await authServiceInstance.users(req.body);
      return res.json({ user }).status(200);
    } catch (e) {
      logger.error('🔥 error: %o', e);
      return next(e);
    }
  };
  updateProfile= async (req: Request, res: Response, next: NextFunction) => {
    const logger: Logger = Container.get('logger');
    logger.debug('Calling Sign-In endpoint with body: %o', req.body);
    try {
      const {} = req.body;
      const authServiceInstance = Container.get(AuthService);
      const { user } = await authServiceInstance.updateProfile(req.body);
      return res.json({ user }).status(200);
    } catch (e) {
      logger.error('🔥 error: %o', e);
      return next(e);
    }
  };
  getsingle= async (req: Request, res: Response, next: NextFunction) => {
    const logger: Logger = Container.get('logger');
    logger.debug('Calling Sign-In endpoint with body: %o', req.body);
    try {
      const {} = req.body;
      const authServiceInstance = Container.get(AuthService);
      const { user } = await authServiceInstance.getsingle(req.body);
      return res.json({ user }).status(200);
    } catch (e) {
      logger.error('🔥 error: %o', e);
      return next(e);
    }
  };
  message= async (req: Request, res: Response, next: NextFunction) => {
    const logger: Logger = Container.get('logger');
    logger.debug('Calling Sign-In endpoint with body: %o', req.body);
    try {
      const {} = req.body;
      const authServiceInstance = Container.get(AuthService);
      const { user } = await authServiceInstance.message(req.body);
      return res.json({ user }).status(200);
    } catch (e) {
      logger.error('🔥 error: %o', e);
      return next(e);
    }
  };
  getmessage= async (req: Request, res: Response, next: NextFunction) => {
    const logger: Logger = Container.get('logger');
    logger.debug('Calling Sign-In endpoint with body: %o', req.body);
    try {
   
      const authServiceInstance = Container.get(AuthService);
      const { user } = await authServiceInstance.getmessage(req.body);
      return res.json({ user }).status(200);
    } catch (e) {
      logger.error('🔥 error: %o', e);
      return next(e);
    }
  };
}
export default new auth();
