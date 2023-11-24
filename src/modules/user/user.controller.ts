import { Request, Response } from 'express';
import { ZodError } from 'zod';
import { ordersPayload, updateUserPayload, userSchema } from './user.interface';
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
    if (error instanceof ZodError) {
      res.status(422).json({
        success: false,
        message: 'Request body is invalid',
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
    const body = updateUserPayload.parse(req.body);

    if (!Object.keys(body).length) {
      res.status(400).json({
        success: false,
        message: 'Request body is not valid',
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
    if (error instanceof ZodError) {
      res.status(422).json({
        success: false,
        message: 'Request body is invalid',
        error: error.issues,
      });
    } else {
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
}

export async function getUserOrders(req: Request, res: Response) {
  try {
    const { userId } = req.params;

    const data = await services.getOrders(userId);

    // If no user is found data will be null
    if (!data) throw new Error();

    res.status(200).json({
      success: true,
      message: 'Order fetched successfully!',
      data,
    });
  } catch (error) {
    if (error instanceof Error) {
      res.status(404).json({
        success: false,
        message: 'User not found',
        error: {
          code: 404,
          description: 'User not found!',
        },
      });
    } else {
      res.status(500).json({
        success: false,
        message: 'Internal server error',
        error: {
          code: 500,
          description: 'Internal server error',
        },
      });
    }
  }
}

export async function updateUserOrders(req: Request, res: Response) {
  try {
    const { userId } = req.params;
    const payload = ordersPayload.parse(req.body);
    const result = await services.updateOrders(userId, payload);

    if (!result) throw new Error();

    res.status(200).json({
      success: true,
      message: 'Order created successfully!',
      data: null,
    });
  } catch (error) {
    if (error instanceof Error) {
      res.status(404).json({
        success: false,
        message: 'User not found',
        error: {
          code: 404,
          description: 'User not found!',
        },
      });
    } else {
      res.status(500).json({
        success: false,
        message: 'Internal server error',
        error: {
          code: 500,
          description: 'Internal server error',
        },
      });
    }
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