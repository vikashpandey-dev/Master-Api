import { Service, Inject } from 'typedi';
import { EventDispatcher, EventDispatcherInterface } from '@/decorators/eventDispatcher';
import Helper from '@/Helper';
@Service()
export default class AuthService {
  constructor(
    @Inject('categoryModel') private categoryModel,
    @Inject('logger') private logger,
    @Inject('throwError') private throwError,
  ) {}
  public async Addcategory(request: any): Promise<{ record }> {
    const { body, files } = request;
    let data;
    try {
        data=await this.categoryModel.create({
            ...request.body
        })
      return { record: data };
    } catch (e) {
      this.logger.error(e);
      this.throwError(Helper.Statuscode.InternalServer,"Something Went Wrong!")
    }
  }
  public async getCategory(request: any): Promise<{ data }> {
    let data;
    const payload={
      isDeleted:false
    }
    let limit=7;
    let offset=0;
    if(request.body.role="admin"){
      limit=100
    }
    if(request.body.limit){
      limit=request.body.limit
    }
    if(request.body.offset){
      offset=request.body.offset
    }
    try {
        data=await this.categoryModel.find(payload).limit(limit).skip(offset)
      return { data: data };
    } catch (e) {
      this.logger.error(e);
      this.throwError(Helper.Statuscode.InternalServer,"Something Went Wrong!")
    }
  }
}