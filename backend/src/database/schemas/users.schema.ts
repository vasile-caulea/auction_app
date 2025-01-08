import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ versionKey: false })
class User {
  name: string; // this is the name of class User

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true })
  createdAt: Date;

  @Prop({ required: true })
  birthDate: Date;

  @Prop({ required: true })
  firstName: string;

  @Prop({ required: true })
  lastName: string;
}

const UserSchema = SchemaFactory.createForClass(User);

export { User, UserSchema };