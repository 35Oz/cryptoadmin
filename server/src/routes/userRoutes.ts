import express from 'express';
import { 
  getUsers, 
  getUserById, 
  createUser, 
  updateUser, 
  deleteUser,
  updateProfile,
  changePassword
} from '../controllers/userController.js';
import { protect, admin, adminOrManager, checkRole } from '../middlewares/auth.js';

const router = express.Router();

// Admin and Manager routes
router.route('/')
  .get(protect, adminOrManager, getUsers)
  .post(protect, checkRole(['admin']), createUser);

router.route('/:id')
  .get(protect, adminOrManager, getUserById)
  .put(protect, adminOrManager, updateUser)
  .delete(protect, admin, deleteUser);

// User profile routes
router.put('/profile', protect, updateProfile);
router.put('/password', protect, changePassword);

export default router;