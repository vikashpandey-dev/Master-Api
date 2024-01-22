import { Router, Request, Response, NextFunction } from 'express';
import { Container } from 'typedi';
import size from '@/services/size';
import { Logger } from 'winston';

class Size {
   
    size = async (req: Request, res: Response, next: NextFunction) => {
    const logger: Logger = Container.get('logger');
    try {
      const sizeInstance = Container.get(size);
      const { record } = await sizeInstance.size(req);
      return res.json({ record }).status(200);
    } catch (e) {
      logger.error('🔥 error: %o', e);
      return next(e);
    }
  };
}
export default new Size();
