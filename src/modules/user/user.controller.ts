import { Request, Response } from 'express';
import { z } from 'zod';
import { updateBody, userSchema } from './user.interface';
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
    if (error instanceof z.ZodError) {
      res.status(422).json({
        success: false,
        message: JSON.parse(error.message),
        error: error.issues,
      });
    } else if (error instanceof Error) {
      res.status(409).json({
        success: false,
        message: 'User already exists',
        error: error.message,
      });
    } else {
      res.status(500).json({
        success: false,
        message: 'Something went wrong',
        error,
      });
    }
  }
}

export async function getAllUsers(req: Request, res: Response) {
  try {
    const data = await services.retrieve();

    if (data.length) {
      res.status(200).json({
        success: true,
        message: 'Users fetched successfully!',
        data,
      });
    } else {
      res.status(404).json({
        success: false,
        message: 'No users found!',
        data: null,
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: null,
    });
  }
}

export async function getUserById(req: Request, res: Response) {
  try {
    const { userId } = req.params;
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
    const body = updateBody.parse(req.body);

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

export async function deleteUser(req: Request, res: Response) {
  try {
    const { userId } = req.params;
    const result = await services.deleteUser(userId);

    if (!result.deletedCount) throw new Error();

    res.status(200).json({
      success: true,
      message: 'User deleted successfully!',
      data: null,
    });
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
