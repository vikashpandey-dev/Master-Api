import { Service, Inject } from 'typedi';
import { EventDispatcher, EventDispatcherInterface } from '@/decorators/eventDispatcher';
import Helper from '@/Helper';
import { Request } from 'express';
import { ParamsDictionary } from 'express-serve-static-core';
import { ParsedQs } from 'qs';
@Service()
export default class BlogService {
  
  constructor(
    @Inject('BlogModel') private BlogModel,
    @Inject('logger') private logger,
    @Inject('throwError') private throwError,
  ) {}
  public async create(request: any): Promise<{ record }> {
    let data;
    console.log(request.body,"requestrequest")
    try {
        data=await this.BlogModel.create({
            ...request.body
        })
      return { record: data };
    } catch (e) {
      this.logger.error(e);
      this.throwError(Helper.Statuscode.InternalServer,"Something Went Wrong!")
    }
  }
  public async get(request: any): Promise<{ record }> {
    let data;
    try {
        data=await this.BlogModel.find()
      return { record: data };
    } catch (e) {
      this.logger.error(e);
      this.throwError(Helper.Statuscode.InternalServer,"Something Went Wrong!")
    }
  }
}