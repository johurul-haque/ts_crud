import { Request, Response } from 'express';
import { ZodError } from 'zod';
import { ordersPayload, updateUserPayload, userSchema } from './user.interface';
import * as userService from './user.service';

export async function createUser(req: Request, res: Response) {
  try {
    const data = userSchema.parse(req.body);
    const result = await userService.create(data);

    res.status(200).json({
      success: true,
      message: 'User created successfully!',
      data: result,
    });
  } catch (error) {
    if (error instanceof ZodError) {
      res.status(422).json({
        success: false,
        message: 'Request body is invalid',
        error: {
          code: 422,
          issues: error.issues,
        },
      });
    } else if (error instanceof Error) {
      res.status(409).json({
        success: false,
        message: 'User already exists',
        error: {
          code: 409,
          description: error.message,
        },
      });
    } else {
      res.status(500).json({
        success: false,
        message: 'Something went wrong',
        error: {
          code: 500,
          description: 'Something went wrong',
        },
      });
    }
  }
}

export async function getAllUsers(req: Request, res: Response) {
  try {
    const result = await userService.retrieve();

    if (result.length) {
      res.status(200).json({
        success: true,
        message: 'Users fetched successfully!',
        data: result,
      });
    } else {
      res.status(404).json({
        success: false,
        message: 'No user found',
        error: {
          code: 404,
          description: 'No user found',
        },
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Something went wrong',
      error: {
        code: 500,
        description: 'Something went wrong',
      },
    });
  }
}

export async function getUserById(req: Request, res: Response) {
  try {
    const { userId } = req.params;
    const result = await userService.findById(userId);

    if (!result) {
      throw new Error();
    } else {
      res.status(200).json({
        success: true,
        message: 'User fetched successfully!',
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

export async function updateUser(req: Request, res: Response) {
  try {
    const { userId } = req.params;
    const data = updateUserPayload.parse(req.body);

    if (!Object.keys(data).length) {
      res.status(400).json({
        success: false,
        message: 'Request body is invalid',
        error: {
          code: 400,
          description: 'Request body is invalid',
        },
      });
    } else {
      const result = await userService.update(userId, data);

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
        error: {
          code: 422,
          issues: error.issues,
        },
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

    const result = await userService.getOrders(userId);

    // If no user is found data will be null
    if (!result) throw new Error();

    res.status(200).json({
      success: true,
      message: 'Order fetched successfully!',
      data: result,
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
    const data = ordersPayload.parse(req.body);
    const result = await userService.updateOrders(userId, data);

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

export async function getUserOrdersTotalPrice(req: Request, res: Response) {
  try {
    const { userId } = req.params;
    const totalPrice = await userService.getOrdersTotalPrice(userId);

    res.status(200).json({
      success: true,
      message: totalPrice
        ? 'Total price calculated successfully!'
        : "Hasn't made any orders yet!",
      data: {
        totalPrice: totalPrice || 0,
      },
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
    const result = await userService.deleteUser(userId);

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