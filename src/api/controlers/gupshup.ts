import { Router, Request, Response, NextFunction } from 'express';
import { Container } from 'typedi';
import gupshupService from '@/services/gupshup';
import { Logger } from 'winston';

class gupshup {
    gupshup = async (req: Request, res: Response, next: NextFunction) => {
    const logger: Logger = Container.get('logger');
    try {
      const gupshupInstance = Container.get(gupshupService);
      const { record } = await gupshupInstance.gupshup(req);
      return res.json({ record }).status(200);
    } catch (e) {
      logger.error('🔥 error: %o', e);
      return next(e);
    }
  };
}
export default new gupshup();
