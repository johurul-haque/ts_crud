import bcrypt from 'bcrypt';
import { Schema, model } from 'mongoose';
import config from '../../config';
import { User } from './user.interface';

const userSchema = new Schema<User>({
  userId: { type: Number, required: true, unique: true },
  username: { type: String, required: true, unique: true },
  fullName: {
    required: true,
    type: {
      firstName: { type: String, required: true },
      lastName: { type: String, required: true },
    },
  },
  age: { type: Number, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  address: {
    required: true,
    type: {
      street: { type: String, required: true },
      city: { type: String, required: true },
      country: { type: String, required: true },
    },
  },
  hobbies: [{ type: String, required: true }],
  orders: {
    type: [
      {
        type: {
          productName: { type: String, required: true },
          price: { type: Number, required: true },
          quantity: { type: Number, required: true },
        },
      },
    ],
    default: undefined,
  },
  isActive: { type: Boolean, required: true },
});

userSchema.pre('save', async function (next) {
  this.password = await bcrypt.hash(
    this.password,
    Number(config.bcrypt_salt_rounds)
  );

  next();
});

userSchema.set('toJSON', {
  transform: (doc, { __v, password, ...rest }) => rest,
});

export const UserModel = model<User>('user', userSchema);
