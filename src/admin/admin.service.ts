import { Injectable, ForbiddenException } from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import { Admin } from './admin.type';
import { ReturnModelType, DocumentType } from '@typegoose/typegoose';
import { Types } from 'mongoose';
import { CreateAdminInput, UpdateAdminInput } from './admin.input';

@Injectable()
export class AdminService {
  constructor(
    @InjectModel(Admin) private readonly model: ReturnModelType<typeof Admin>,
  ) {}

  /**
   * Create a admin
   * @param data CreateAdminInput
   */
  async create(data: CreateAdminInput): Promise<DocumentType<Admin>> {
    const count = await this.count();
    if (count)
      throw new ForbiddenException('Admin registration has been truned off');

    return this.model.create(data);
  }

  /**
   * Find a admin via objectId
   * @param _id Types.objectId
   */
  async getById(_id: Types.ObjectId): Promise<DocumentType<Admin>> {
    return this.model.findById(_id);
  }

  /**
   * Find a admin via email address
   * @param email admin email address
   */
  async getByEmail(email: string): Promise<DocumentType<Admin>> {
    return this.model.findOne({ email });
  }

  /**
   * Find a admin via username
   * @param username admin username
   */
  async getByUsername(username: string): Promise<DocumentType<Admin>> {
    return this.model.findOne({ username });
  }

  /**
   * Find a admin via identifer
   * @param identifier admin username/email
   */
  async getByIdentifier(identifier: string): Promise<DocumentType<Admin>> {
    return this.model.findOne({
      $or: [{ username: identifier }, { email: identifier }],
    });
  }

  /**
   * Find a admin via identifer
   * @param identifier admin username/email
   */
  async update(
    _id: Types.ObjectId,
    data: UpdateAdminInput,
  ): Promise<DocumentType<Admin>> {
    return this.model.findOneAndUpdate({ _id }, data);
  }

  /**
   * Count documents of admin collection
   */
  count(): any {
    return this.model.countDocuments();
  }
}
