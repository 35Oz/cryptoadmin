import express from 'express';
import { 
  getDashboardStats, 
  getUserActivity 
} from '../controllers/dashboardController.js';
import { protect, adminOrManager } from '../middlewares/auth.js';

const router = express.Router();

router.get('/stats', protect, adminOrManager, getDashboardStats);
router.get('/user-activity', protect, adminOrManager, getUserActivity);

export default router;