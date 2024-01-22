import { Router, Request, Response, NextFunction } from 'express';
import { Container } from 'typedi';
import BlogService from '@/services/Blog';
import { Logger } from 'winston';

class Blog {
    create = async (req: Request, res: Response, next: NextFunction) => {
    const logger: Logger = Container.get('logger');
    try {
      const BlogInstance = Container.get(BlogService);
      const { record } = await BlogInstance.create(req);
      return res.json({ record }).status(200);
    } catch (e) {
      logger.error('🔥 error: %o', e);
      return next(e);
    }
  };
  get = async (req: Request, res: Response, next: NextFunction) => {
    const logger: Logger = Container.get('logger');
    try {
      const BlogInstance = Container.get(BlogService);
      const { record } = await BlogInstance.get(req);
      return res.json({ record }).status(200);
    } catch (e) {
      logger.error('🔥 error: %o', e);
      return next(e);
    }
  };
}
export default new Blog();
