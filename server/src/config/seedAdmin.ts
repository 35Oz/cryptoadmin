import User from '../models/User.js';

export const seedAdmin = async () => {
  try {
    // Check if users already exist
    const adminExists = await User.findOne({ email: 'admin@cryptoadmin.com' });
    const managerExists = await User.findOne({ email: 'manager@cryptoadmin.com' });
    const userExists = await User.findOne({ email: 'user@cryptoadmin.com' });
    
    if (!adminExists) {
      await User.create({
        name: 'Admin User',
        email: 'admin@cryptoadmin.com',
        password: 'admin123',
        role: 'admin'
      });
      console.log('Admin user created successfully');
    }

    if (!managerExists) {
      await User.create({
        name: 'Manager Smith',
        email: 'manager@cryptoadmin.com',
        password: 'manager123',
        role: 'manager'
      });
      console.log('Manager user created successfully');
    }

    if (!userExists) {
      await User.create({
        name: 'John User',
        email: 'user@cryptoadmin.com',
        password: 'user123',
        role: 'user'
      });
      console.log('Regular user created successfully');
    }
  } catch (error) {
    console.error('Error seeding users:', error);
  }
};