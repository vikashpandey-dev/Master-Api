import { Router, Request, Response, NextFunction } from 'express';
import { Container } from 'typedi';
import colorService from '@/services/color';
import { Logger } from 'winston';

class color {
    color = async (req: Request, res: Response, next: NextFunction) => {
    const logger: Logger = Container.get('logger');
    try {
      const colorInstance = Container.get(colorService);
      const { record } = await colorInstance.color(req);
      return res.json({ record }).status(200);
    } catch (e) {
      logger.error('🔥 error: %o', e);
      return next(e);
    }
  };
}
export default new color();
