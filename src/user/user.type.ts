import { prop, pre } from '@typegoose/typegoose';
import { hashSync, compare } from 'bcryptjs';

@pre<User>('save', function() {
  this.password = hashSync(this.password);
})
export class User {
  @prop({ required: true })
  name: string;

  @prop()
  username: string;

  @prop()
  email: string;

  @prop()
  password: string;

  comparePassword(passwordText: string): Promise<boolean> {
    return compare(passwordText, this.password);
  }
}
