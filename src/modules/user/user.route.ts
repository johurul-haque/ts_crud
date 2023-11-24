import { Router } from 'express';
import {
  createUser,
  deleteUser,
  getAllUsers,
  getUserById,
  getUserOrders,
  getUserOrdersTotalPrice,
  updateUser,
  updateUserOrders,
} from './user.controller';

const router = Router();

router.post('/', createUser);
router.get('/', getAllUsers);

router.get('/:userId', getUserById);
router.put('/:userId', updateUser);
router.delete('/:userId', deleteUser);

router.get('/:userId/orders', getUserOrders);
router.put('/:userId/orders', updateUserOrders);
router.get('/:userId/orders/total-price', getUserOrdersTotalPrice);

export const userRoutes = router;
