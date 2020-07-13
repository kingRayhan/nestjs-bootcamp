import { prop, ModelOptions, pre } from '@typegoose/typegoose';
import { hashSync, compareSync, compare } from 'bcryptjs';

@ModelOptions({ schemaOptions: { timestamps: true } })
@pre<Admin>(/^save/, function() {
  this.password = hashSync(this.password);
})
export class Admin {
  @prop()
  public name: string;

  @prop()
  public username: string;

  @prop()
  public email: string;

  @prop()
  public password: string;

  comparePassword(passwordTxt: string): boolean {
    return compareSync(passwordTxt, this.password);
  }
}
