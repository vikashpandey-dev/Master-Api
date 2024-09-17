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
    @Inject('userModel') private userModel,

    @Inject('throwError') private throwError,
  ) { }
  public async create(request: any): Promise<{ record }> {
    let data;
    console.log(request.body, "requestrequest")
    try {
      data = await this.BlogModel.create({
        ...request.body
      })
      return { record: data };
    } catch (e) {
      this.logger.error(e);
      this.throwError(Helper.Statuscode.InternalServer, "Something Went Wrong!")
    }
  }
  public async update(request: any): Promise<{ record }> {
    let data;
    try {
      let payload = {}
      if (request.body.title) {
        Object.assign(payload, { title: request.body.title })
      }
      if (request.body.description) {
        Object.assign(payload, { description: request.body.description })
      }
      if (request.body.images) {
        Object.assign(payload, { images: request.body.images })
      }
      if (request.body.status) {
        Object.assign(payload, { status: request.body.status })
      }
      if (request.body.reason) {
        Object.assign(payload, { reason: request.body.reason })
      }
      data = await this.BlogModel.updateOne({ _id: request.body._id }, payload)
      return { record: data };
    } catch (e) {
      this.logger.error(e);
      this.throwError(Helper.Statuscode.InternalServer, "Something Went Wrong!")
    }
  }
  public async get(request: any): Promise<{ record }> {
    let data;
    try {
      const payload={isDeleted:false}
      if(request.body.status)
        Object.assign(payload,{status:request.body.status})
      if(request.body._id)
        Object.assign(payload,{_id:request.body._id})
      data = await this.BlogModel.aggregate([
        {
          $match:payload

        },
        {
          $lookup: {
            from: 'users',
            localField: 'createdBy',
            foreignField: '_id',
            as: 'users',
          },
        },
        {
          $unwind: '$users', // Decolnstruct the users array field to output a document for each element
        },
        
      ]);
      console.log(data,"datadata")
      return { record: data };
    } catch (e) {
      this.logger.error(e);
      this.throwError(Helper.Statuscode.InternalServer, "Something Went Wrong!")
    }
  }
  public async delete(request: any): Promise<{ record }> {
    let data;
    try {
      data = await this.BlogModel.deleteOne({ _id: request.body._id })
      return { record: data };
    } catch (e) {
      this.logger.error(e);
      this.throwError(Helper.Statuscode.InternalServer, "Something Went Wrong!")
    }
  }
  public async   dashboard
  (request: any): Promise<{ record }> {
    let data;
    const payload={isDeleted:false}
    try {
      if(request.body.status)
        Object.assign(payload,{status:request.body.status})
      const blogCount = await this.BlogModel.countDocuments(payload);
      const userCount = await this.userModel.countDocuments({});
      console.log(blogCount,userCount,"blogCountblogCount")
      let counts={
        blogCounts: blogCount, 
        userCount: userCount
      }
      return {record:counts};
    } catch (e) {
      this.logger.error(e);
      this.throwError(Helper.Statuscode.InternalServer, "Something Went Wrong!")
    }
  }
}