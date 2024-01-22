import { Router, Request, Response, NextFunction } from 'express';
import { Container } from 'typedi';
import Product from '@/services/product';
import { Logger } from 'winston';

class category {
    product = async (req: Request, res: Response, next: NextFunction) => {
    const logger: Logger = Container.get('logger');
    try {
      const ProductInstance = Container.get(Product);
      const { record } = await ProductInstance.Product(req);
      return res.json({ record }).status(200);
    } catch (e) {
      logger.error('🔥 error: %o', e);
      return next(e);
    }
  };
  Get = async (req: Request, res: Response, next: NextFunction) => {
    const logger: Logger = Container.get('logger');
    try {
      const ProductInstance = Container.get(Product);
      const { data } = await ProductInstance.Get(req);
      return res.json({ data }).status(200);
    } catch (e) {
      logger.error('🔥 error: %o', e);
      return next(e);
    }
  };
}
export default new category();
