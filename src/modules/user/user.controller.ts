import { Request, Response } from 'express';
import { userSchema } from './user.interface';
import * as services from './user.service';

export async function createUser(req: Request, res: Response) {
  try {
    const user = userSchema.parse(req.body);

    const data = await services.create(user);

    res.status(200).json({
      success: true,
      message: 'User created successfully!',
      data,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || 'Something went wrong',
      error,
    });
  }
}
