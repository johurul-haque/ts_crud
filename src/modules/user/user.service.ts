import { TUpdateBody, TUser } from './user.interface';
import { User } from './user.model';

export async function create(user: TUser): Promise<Omit<TUser, 'password'>> {
  const isExisting = await User.findOne({ userId: user.userId });

  if (isExisting) {
    throw new Error(`Conflict: User ${user.userId} already exists`);
  }

  return await User.create(user);
}

export async function retrieve() {
  return User.find();
}

export async function findById(userId: string) {
  return await User.findOne({ userId });
}

export async function update(userId: string, data: TUpdateBody) {
  const result = await User.findOneAndUpdate({ userId }, data, {
    returnOriginal: false,
  });

  if (!result) throw new Error();

  return result;
}
