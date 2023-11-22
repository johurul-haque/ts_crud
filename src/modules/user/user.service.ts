import { TUser } from './user.interface';
import { User } from './user.model';

export async function create(user: TUser): Promise<Omit<TUser, 'password'>> {
  const userExists = await User.findOne({ userId: user.userId });

  if (userExists) {
    throw new Error(`User ${user.userId} already exists`);
  }

  return await User.create(user);
}
