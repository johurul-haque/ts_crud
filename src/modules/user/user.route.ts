import { Router } from 'express';
import {
  createUser,
  deleteUser,
  getAllUsers,
  getUserById,
  getUserOrders,
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

export const userRoutes = router;
