import { OrdersPayload, User, UserPayload } from './user.interface';
import { UserModel } from './user.model';

export async function create(user: User) {
  return await UserModel.create(user);
}

export async function retrieve() {
  return UserModel.find();
}

export async function findById(userId: string) {
  return await UserModel.findOne({ userId });
}

export async function update(userId: string, payload: UserPayload) {
  const result = await UserModel.findOneAndUpdate({ userId }, payload, {
    returnOriginal: false,
  });

  if (!result) throw new Error('No user found');

  return result;
}

export async function getOrders(userId: string) {
  return await UserModel.findOne({ userId }, { orders: 1, _id: 0 });
}

export async function updateOrders(userId: string, payload: OrdersPayload) {
  return await UserModel.findOneAndUpdate(
    { userId },
    {
      $push: {
        orders: payload,
      },
    },
    {
      returnOriginal: false,
    }
  );
}

export async function getOrdersTotalPrice(userId: string) {
  const user = await UserModel.findOne({ userId });

  if (!user) throw new Error('No user found');

  return user.orders?.reduce(
    (total, order) => total + order.price * order.quantity,
    0
  );
}

export async function deleteUser(userId: string) {
  return await UserModel.deleteOne({ userId });
}