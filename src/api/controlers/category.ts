import { Router, Request, Response, NextFunction } from 'express';
import { Container } from 'typedi';
import categoryservice from '@/services/category';
import { Logger } from 'winston';

class category {
    Addcategory = async (req: Request, res: Response, next: NextFunction) => {
    const logger: Logger = Container.get('logger');
    try {
      const categoryServiceInstance = Container.get(categoryservice);
      const { record } = await categoryServiceInstance.Addcategory(req);
      return res.json({ record }).status(200);

    } catch (e) {
      logger.error('🔥 error: %o', e);
      return next(e);
    }
  };
  getCategory= async (req: Request, res: Response, next: NextFunction) => {
    const logger: Logger = Container.get('logger');
    try {
      const categoryServiceInstance = Container.get(categoryservice);
      const { data } = await categoryServiceInstance.getCategory(req);
      return res.json({ data }).status(200);
    } catch (e) {
      logger.error('🔥 error: %o', e);
      return next(e);
    }
  };
}
export default new category();
