import { Service, Inject } from 'typedi';
import { EventDispatcher, EventDispatcherInterface } from '@/decorators/eventDispatcher';
import Helper from '@/Helper';
import { Request } from 'express';
import { ParamsDictionary } from 'express-serve-static-core';
import { ParsedQs } from 'qs';
@Service()
export default class sizeService {
  constructor(
    
    @Inject('sizeModel') private sizeModel,
    @Inject('logger') private logger,
    @Inject('throwError') private throwError,
  ) {}
  public async size(request: any): Promise<{ record }> {
    console.log(request.body)
    let data;
    try {
      data = await this.sizeModel.create({
        ...request.body,
      });
      return { record: data };
    } catch (e) {
      this.logger.error(e);
      this.throwError(Helper.Statuscode.InternalServer, 'Something Went Wrong!');
    }
  }
}
