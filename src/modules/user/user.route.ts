import express from 'express';
import {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
} from './user.controller';

const router = express.Router();

router.post('/', createUser);
router.get('/', getAllUsers);
router.get('/:userId', getUserById);
router.put('/:userId', updateUser);

export const userRoutes = router;
