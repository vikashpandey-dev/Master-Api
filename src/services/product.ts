import { Service, Inject } from 'typedi';
import { EventDispatcher, EventDispatcherInterface } from '@/decorators/eventDispatcher';
import Helper from '@/Helper';
import { Request } from 'express';
import { ParamsDictionary } from 'express-serve-static-core';
import { ParsedQs } from 'qs';
@Service()
export default class ProductService {
  constructor(
    @Inject('productModel') private productModel,
    @Inject('logger') private logger,
    @Inject('throwError') private throwError,
  ) {}
  public async Product(request: any): Promise<{ record }> {
    var mongoose = require('mongoose'); 

    var id = mongoose.Types.ObjectId(request.body.categoryid);
    const { body, files } = request;
    let data;
    try {
      data = await this.productModel.create({
        ...request.body,
        categoryid:id
      });
      return { record: data };
    } catch (e) {
      this.logger.error(e);
      this.throwError(Helper.Statuscode.InternalServer, e);
    }
  }
  public async Get(request: any): Promise<{ data }> {
    
    const { body, files } = request;
    let data;
    try {
      data = await this.productModel.aggregate([
        {
          $lookup: {
            from: 'sizes',
            let: { localFilterIds: '$sizename' },
            pipeline: [
              {
                $match: {
                  $expr: {
                    $and: [
                      {
                        $in:{'$_id':'$$localFilterIds'},
                      },
                      {
                        $eq: ['$isDeleted', false],
                      },
                    ],
                  },
                },
              },
            ],
            as: 'sizename',
          },
          
        },
        {
          $lookup: {
            from: 'colors',
            let: { localFilterIds: '$colorname' },
            pipeline: [
              {
                $match: {
                  $expr: {
                    $and: [
                      {
                        $in: ['$_id', '$$localFilterIds'],
                      },
                      {
                        $eq: ['$isDeleted', false],
                      },
                    ],
                  },
                },
              },
            ],
            as: 'colorname',
          },
          
        },
        {
          $lookup: {
            from: 'categories',
            let: { localFilterIds: '$categoryid' },
            pipeline: [
              {
                $match: {
                  $expr: {
                    $and: [
                      {
                        $eq: ['$_id', '$$localFilterIds'],
                      },
                      {
                        $eq: ['$isDeleted', false],
                      },
                    ],
                  },
                },
              },
            ],
            as: 'category',
          },
          
        },
      ]);
      return { data: data };
    } catch (e) {
      this.logger.error(e);
      this.throwError(Helper.Statuscode.InternalServer, 'Something Went Wrong!');
    }
  }
}
