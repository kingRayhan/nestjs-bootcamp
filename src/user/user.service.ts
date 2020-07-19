import { Injectable } from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import { User } from './user.type';
import { ReturnModelType, DocumentType } from '@typegoose/typegoose';
import { store, show } from 'quick-crud';
import { CreateUserInput } from './user.input';
import { FacebookProfilePayload } from 'src/shared/types';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User)
    private readonly model: ReturnModelType<typeof User>,
  ) {}

  async create(data: CreateUserInput): Promise<DocumentType<User>> {
    return store({
      model: this.model,
      data,
    });
  }

  async getById(_id: string): Promise<DocumentType<User>> {
    return show({ model: this.model, where: { _id } });
  }

  async getByfbUID(uid: string): Promise<DocumentType<User>> {
    return this.model.findOne({ fbUID: uid });
  }

  async findOrCreateWithFacebook(
    profile: FacebookProfilePayload,
  ): Promise<DocumentType<User>> {
    const accountExists = await this.getByfbUID(profile.id);

    if (!accountExists) {
      const generatedPassword = `${profile.displayName}123`;

      return this.model.create({
        name: profile.displayName,
        username: profile.displayName.split(' ').join('-'),
        password: generatedPassword,
        fbUID: profile.id,
      });
    }

    return accountExists;
  }

  async getByUsername(username: string): Promise<DocumentType<User>> {
    return show({ model: this.model, where: { username } });
  }

  async getByEmail(email: string): Promise<User> {
    return show({ model: this.model, where: { email } });
  }

  async getByIdentifier(identifier: string): Promise<DocumentType<User>> {
    const user = await this.model.findOne({
      $or: [{ username: identifier }, { email: identifier }],
    });

    return user;
  }

  async count(): Promise<any> {
    return this.model.countDocuments({});
  }
}
