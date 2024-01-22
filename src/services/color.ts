import { Service, Inject } from 'typedi';
import { EventDispatcher, EventDispatcherInterface } from '@/decorators/eventDispatcher';
import Helper from '@/Helper';
import { Request } from 'express';
import { ParamsDictionary } from 'express-serve-static-core';
import { ParsedQs } from 'qs';
@Service()
export default class colorService {
  
  constructor(
    @Inject('colorModel') private colorModel,
    @Inject('logger') private logger,
    @Inject('throwError') private throwError,
  ) {}
  public async color(request: any): Promise<{ record }> {
    let data;
    try {
        data=await this.colorModel.create({
            ...request.body
        })
      return { record: data };
    } catch (e) {
      this.logger.error(e);
      this.throwError(Helper.Statuscode.InternalServer,"Something Went Wrong!")
    }
  }
}