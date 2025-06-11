import { Request, Response } from 'express';
import User from '../models/User.js';

// @desc   Get dashboard stats
// @route  GET /api/dashboard/stats
// @access Private/Admin
export const getDashboardStats = async (req: Request, res: Response) => {
  try {
    // Get total users
    const totalUsers = await User.countDocuments();
    
    // Get active users (for demo, we'll just use a fraction of total)
    const activeUsers = Math.floor(totalUsers * 0.7);
    
    // Get new users this week
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
    const newUsersThisWeek = await User.countDocuments({
      createdAt: { $gte: oneWeekAgo }
    });
    
    // Get new users this month
    const oneMonthAgo = new Date();
    oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);
    const newUsersThisMonth = await User.countDocuments({
      createdAt: { $gte: oneMonthAgo }
    });
    
    res.status(200).json({
      success: true,
      totalUsers,
      activeUsers,
      newUsersThisWeek,
      newUsersThisMonth
    });
  } catch (error: any) {
    console.error('GetDashboardStats error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Server Error'
    });
  }
};

// @desc   Get user activity data
// @route  GET /api/dashboard/user-activity
// @access Private/Admin
export const getUserActivity = async (req: Request, res: Response) => {
  try {
    // This would normally be a complex query from various tables
    // For demo purposes, we'll just return mock data
    
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const currentMonth = new Date().getMonth();
    
    const activityData = [];
    
    // Generate data for the last 7 months
    for (let i = 6; i >= 0; i--) {
      const monthIndex = (currentMonth - i + 12) % 12;
      const users = Math.floor(Math.random() * 50) + 10;
      activityData.push({
        name: months[monthIndex],
        users,
        activeUsers: Math.floor(users * (Math.random() * 0.4 + 0.3)) // 30-70% of users are active
      });
    }
    
    res.status(200).json({
      success: true,
      data: activityData
    });
  } catch (error: any) {
    console.error('GetUserActivity error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Server Error'
    });
  }
};