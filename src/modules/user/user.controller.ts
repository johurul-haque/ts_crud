import { Request, Response } from 'express';
import { z } from 'zod';
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
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error instanceof Error ? error.message : 'Something went wrong',
      error,
    });
  }
}

export async function getAllUsers(req: Request, res: Response) {
  try {
    const data = await services.retrieve();

    res.status(200).json({
      success: true,
      message: 'Users fetched successfully!',
      data,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Something went wrong',
      error,
    });
  }
}

export async function getUserById(req: Request, res: Response) {
  try {
    const { userId } = z.object({ userId: z.string() }).parse(req.params);

    const data = await services.findById(userId);

    if (!data) {
      throw new Error();
    } else {
      res.status(200).json({
        success: true,
        message: 'User fetched successfully!',
        data,
      });
    }
  } catch (error) {
    res.status(404).json({
      success: false,
      message: 'User not found',
      error: {
        code: 404,
        description: 'User not found!',
      },
    });
  }
}

export async function updateUser(req: Request, res: Response) {
  try {
    const { userId } = req.params;

    const body = userSchema.partial().parse(req.body);

    if (!Object.keys(body).length) {
      res.status(400).json({
        success: false,
        message: 'Valid request body is required',
      });
    } else {
      const result = await services.update(userId, body);

      res.status(200).json({
        success: true,
        message: 'User updated successfully',
        data: result,
      });
    }
  } catch (error) {
    res.status(404).json({
      success: false,
      message: 'User not found',
      error: {
        code: 404,
        description: 'User not found!',
      },
    });
  }
} 
