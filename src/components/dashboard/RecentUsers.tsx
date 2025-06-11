import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { API_URL } from '../../config/constants';
import { User } from '../../types';

// Demo data
const demoUsers = [
  { 
    _id: '1', 
    name: 'John Doe', 
    email: 'john@example.com',
    role: 'admin' as const,
    createdAt: '2023-04-23T08:45:30Z',
    updatedAt: '2023-04-23T08:45:30Z'
  },
  { 
    _id: '2', 
    name: 'Jane Smith', 
    email: 'jane@example.com',
    role: 'user' as const,
    createdAt: '2023-04-22T10:30:15Z',
    updatedAt: '2023-04-22T10:30:15Z'
  },
  { 
    _id: '3', 
    name: 'Bob Johnson', 
    email: 'bob@example.com',
    role: 'user' as const,
    createdAt: '2023-04-21T15:20:45Z',
    updatedAt: '2023-04-21T15:20:45Z'
  },
  { 
    _id: '4', 
    name: 'Alice Brown', 
    email: 'alice@example.com',
    role: 'user' as const,
    createdAt: '2023-04-20T12:10:30Z',
    updatedAt: '2023-04-20T12:10:30Z'
  },
];

const RecentUsers = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecentUsers = async () => {
      try {
        const response = await axios.get(`${API_URL}/users?limit=5&sort=-createdAt`);
        setUsers(response.data.users);
      } catch (err) {
        console.error('Error fetching recent users:', err);
        // Use demo data for preview
        setUsers(demoUsers);
      } finally {
        setLoading(false);
      }
    };

    fetchRecentUsers();
  }, []);

  if (loading) {
    return (
      <div className="card h-80 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-500"></div>
      </div>
    );
  }

  return (
    <div className="card">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-medium text-gray-900">Recent Users</h3>
        <Link 
          to="/users" 
          className="text-sm font-medium text-primary-600 hover:text-primary-500"
        >
          View all
        </Link>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead>
            <tr>
              <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Name
              </th>
              <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Email
              </th>
              <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Role
              </th>
              <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Joined
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {users.map((user) => (
              <tr key={user._id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="h-8 w-8 rounded-full bg-primary-100 flex items-center justify-center text-primary-600 font-semibold">
                      {user.name.charAt(0)}
                    </div>
                    <div className="ml-3">
                      <div className="text-sm font-medium text-gray-900">{user.name}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{user.email}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`inline-flex px-2 text-xs font-semibold rounded-full ${
                    user.role === 'admin' 
                      ? 'bg-purple-100 text-purple-800' 
                      : 'bg-green-100 text-green-800'
                  }`}>
                    {user.role}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {new Date(user.createdAt).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RecentUsers;