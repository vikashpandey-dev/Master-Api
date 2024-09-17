import { Service, Inject } from 'typedi';
import jwt from 'jsonwebtoken';
import MailerService from './mailer';
import config from '@/config';
import argon2 from 'argon2';
import { Container } from 'typedi';
import { randomBytes } from 'crypto';
import { IUser, IUserInputDTO } from '@/interfaces/IUser';
import { EventDispatcher, EventDispatcherInterface } from '@/decorators/eventDispatcher';
import events from '@/subscribers/events';
import Helper from '@/Helper';
@Service()
export default class AuthService {
  constructor(
    @Inject('userModel') private userModel,
    @Inject('messageModel') private messageModel,
    @Inject('conversationModel') private conversationModel,
    private mailer: MailerService,
    @Inject('logger') private logger,
    @Inject('throwError') private throwError,

    @EventDispatcher() private eventDispatcher: EventDispatcherInterface,
  ) { }
  public async SignUp(request: any): Promise<{ user }> {
    let checkemail;
    let mobile;
    let user;
    let data;
    const salt = randomBytes(32);
    mobile = await this.userModel.find({ mobile: request.body.mobile });
    if (mobile.length > 0) {
      this.throwError(Helper.Statuscode.AllReadyExists, 'User Allready Register With Us!');
    }
    const hashPassword = await argon2.hash(request.body.password, { salt });
    data = await this.userModel.create({
      ...request.body,
      passwords: hashPassword,
    });
    console.log('datadatadata', data);
    const token = this.generateToken(data);
    await this.userModel.updateOne({ _id: data._id }, { token: token });
    data = await this.userModel.findOne({ _id: data._id });

    return { user: data };
  }
  public async SignIn(request: any,res: any): Promise<{ user: IUser }> {
    console.log(request, 'datadatadatadata');
    let data;
    const userRecord = await this.userModel.findOne({ mobile: request.mobile });
    console.log(userRecord);
    if (!userRecord) {
      this.throwError(Helper.Statuscode.Unauthorizes, 'User Not Register With Us!');
    }
    /**
     * We use verify from argon2 to prevent 'timing based' attacks
     */
    this.logger.silly('Checking password');
    const validPassword = await argon2.verify(userRecord.passwords, request.password);
    if (validPassword) {
      this.logger.silly('Password is valid!');
      this.logger.silly('Generating JWT');
      const token = this.generateToken(userRecord);
      await this.userModel.updateOne({ _id: userRecord._id }, { token: token });
      data = await this.userModel.findOne({ _id: userRecord._id });
      const user = userRecord.toObject();
      Reflect.deleteProperty(user, 'password');
      Reflect.deleteProperty(user, 'salt');
      /**
       * Easy as pie, you don't need passport.js anymore :)
       */
      return { user: data };
    } else {
      console.log("creaddd")
      this.throwError(Helper.Statuscode.Forbiden, 'User Not Register With Us!');
    }
  }

  public async updateUser(request: any): Promise<{ user: IUser }> {
    let data;
    try {
      const payload = {};
      if (request.body.name) Object.assign(payload, { name: request.body.name });
      if (request.body.email) Object.assign(payload, { email: request.body.email });
      if (request.body.mobile) Object.assign(payload, { mobile: request.body.mobile });
      if (request.body.name) Object.assign(payload, { name: request.body.name });

      data = await this.userModel.updateOne({ _id: request.body._id }, payload);

      return { user: data };
    } catch (e) {
      this.logger.error(e);
    }
  }
  public async users(request: any): Promise<{ user: IUser }> {
    let data;

    try {
      data = await this.userModel.find({ _id: { $ne: request.id } });
      console.log(data, 'datadatadata');
      return { user: data };
    } catch (e) {
      this.logger.error(e);
    }
  }
  public async alluser(request: any): Promise<{ user: IUser }> {
    let data;

    try {
      data = await this.userModel.find({role:"user"});
      console.log(data, 'datadatadata');
      return { user: data };
    } catch (e) {
      this.logger.error(e);
    }
  }
  public async updateProfile(request: any): Promise<{ user: IUser }> {
    let data;
    try {
      let payload = {}
      if (request.profile)
        Object.assign(payload, { image: request.profile })
       await this.userModel.updateOne({ _id: request._id },payload)
      data = await this.userModel.findOne({ _id:request._id })
      return { user: data };
    } catch (e) {
      this.logger.error(e);
    }
  }
  public async getsingle(request: any): Promise<{ user: IUser }> {
    let data;
    try {
      data = await this.userModel.findOne({ _id: request.id });
      console.log(data, 'datadatadata');
      return { user: data };
    } catch (e) {
      this.logger.error(e);
    }
  }
  public async currentuser(request: any): Promise<{ user: IUser }> {
    let data;
    console.log(request,"requestrequest")

    try {
      data = await this.userModel.findOne({ _id: request.body.id });
      console.log(data, 'datadatadata');
      return { user: data };
    } catch (e) {
      this.logger.error(e);
    }
  }
  public async message(request: any): Promise<{ user: IUser }> {
    console.log(request, 'iddddddddddddddd');
    const { ObjectId } = require('mongodb');
    let data;
    let createparti;
    try {
      const objectId1 = new ObjectId(request.senderid);
      const objectId2 = new ObjectId(request.receiverid);
      console.log(objectId1, objectId2, 'objectId1objectId1');
      let participent = [];
      console.log(participent, 'participentparticipent');
      participent.push(objectId1);
      participent.push(objectId2);
      // {participent:{$all:[ObjectId('64b38fd75c581223d8c5fc46'),ObjectId('64b390cb5c581223d8c5fc55')]}}
      createparti = await this.conversationModel.findOne({ participent: { $all: [objectId1, objectId2] } });
      console.log(createparti, "finddddddddddddddd")
      if (createparti == null) {
        createparti = await this.conversationModel.create({
          participent: [request.senderid, request.receiverid],
        });
      }
      console.log(createparti, 'findgroupsfindgroupsfindgroups');

      data = await this.messageModel.create({
        ...request,
        conversationId: createparti._id
      });
      data = await this.messageModel.find({
        conversationId: createparti._id
      })
      console.log(data, 'datadatadata');
      return { user: data };
    } catch (e) {
      this.logger.error(e);
    }
  }
  public async getmessage(request: any): Promise<{ user: IUser }> {

    const { ObjectId } = require('mongodb');
    let data;
    let createparti;
    try {
      const objectId1 = new ObjectId(request.senderid);
      const objectId2 = new ObjectId(request.receiverid);

      createparti = await this.conversationModel.findOne({ participent: { $all: [objectId1, objectId2] } });

      if (createparti != null) {
        data = await this.messageModel.find({
          conversationId: createparti._id
        })
      } else {
        data = []

      }
      console.log(data, 'datadatadata');
      return { user: data };
    } catch (e) {
      this.logger.error(e);
    }
  }
  private generateToken(user) {
    const today = new Date();
    const exp = new Date(today);
    exp.setDate(today.getDate() + 60);
    this.logger.silly(`Sign JWT for userId: ${user._id}`);
    return jwt.sign(
      {
        _id: user._id,
        role: user.role,
        name: user.name,
        exp: exp.getTime() / 1000,
      },
      config.jwtSecret,
    );
  }
}
