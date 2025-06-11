import { useState, useEffect } from 'react';
import axios from 'axios';
import { API_URL } from '../config/constants';
import { User, UserListResponse } from '../types';
import { Edit, Trash2, Plus, Search, ChevronLeft, ChevronRight, Shield, Users as UsersIcon, Eye } from 'lucide-react';
import UserModal from '../components/users/UserModal';
import { useAuth } from '../contexts/AuthContext';
import ProtectedRoute from '../components/ProtectedRoute';

// Demo data
const demoUsers = [
  { 
    _id: '1', 
    name: 'Admin User', 
    email: 'admin@cryptoadmin.com',
    password:'admin123',
    role: 'admin' as const,
    createdAt: '2023-04-23T08:45:30Z',
    updatedAt: '2023-04-23T08:45:30Z'
  },
  { 
    _id: '2', 
    name: 'Manager Carlos', 
    email: 'manager@cryptoadmin.com',
    password:'manager123',
    role: 'manager' as const,
    createdAt: '2023-04-22T10:30:15Z',
    updatedAt: '2023-04-22T10:30:15Z'
  },
  { 
    _id: '3', 
    name: 'User Juan Cruz', 
    email: 'user@cryptoadmin.com',
    password:'user123',
    role: 'user' as const,
    createdAt: '2023-04-21T15:20:45Z',
    updatedAt: '2023-04-21T15:20:45Z'
  },

];

const Users = () => {
  const { hasPermission } = useAuth();
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [totalCount, setTotalCount] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [userToDelete, setUserToDelete] = useState<string | null>(null);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const response = await axios.get<UserListResponse>(
        `${API_URL}/users?page=${page}&limit=${limit}&search=${searchTerm}`
      );
      setUsers(response.data.users);
      setTotalCount(response.data.totalCount);
    } catch (err) {
      console.error('Error fetching users:', err);
      setError('Failed to load users');
      // Use demo data for preview
      setUsers(demoUsers);
      setTotalCount(demoUsers.length);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [page, limit, searchTerm]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setPage(1); // Reset to first page when searching
  };

  const handleCreateUser = () => {
    setCurrentUser(null);
    setIsModalOpen(true);
  };

  const handleEditUser = (user: User) => {
    setCurrentUser(user);
    setIsModalOpen(true);
  };

  const handleDeleteConfirm = (userId: string) => {
    setUserToDelete(userId);
    setIsDeleting(true);
  };

  const handleDeleteUser = async () => {
    if (!userToDelete) return;
    
    try {
      await axios.delete(`${API_URL}/users/${userToDelete}`);
      fetchUsers();
      setIsDeleting(false);
      setUserToDelete(null);
    } catch (err) {
      console.error('Error deleting user:', err);
      // For demo, just remove from state
      setUsers(users.filter(user => user._id !== userToDelete));
      setIsDeleting(false);
      setUserToDelete(null);
    }
  };

  const handleSaveUser = async (userData: Partial<User>) => {
    try {
      if (currentUser) {
        // Update existing user
        await axios.put(`${API_URL}/users/${currentUser._id}`, userData);
      } else {
        // Create new user
        await axios.post(`${API_URL}/users`, userData);
      }
      fetchUsers();
      setIsModalOpen(false);
    } catch (err) {
      console.error('Error saving user:', err);
      // For demo, add or update in state
      if (currentUser) {
        setUsers(users.map(user => 
          user._id === currentUser._id ? { ...user, ...userData } as User : user
        ));
      } else {
        const newUser = {
          _id: Math.random().toString(),
          name: userData.name || '',
          email: userData.email || '',
          role: userData.role || 'user',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        } as User;
        setUsers([newUser, ...users]);
      }
      setIsModalOpen(false);
    }
  };

  const getRoleIcon = (role: string) => {
    switch (role) {
      case 'admin':
        return <Shield className="h-4 w-4" />;
      case 'manager':
        return <UsersIcon className="h-4 w-4" />;
      case 'user':
        return <Eye className="h-4 w-4" />;
      default:
        return <Eye className="h-4 w-4" />;
    }
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'admin':
        return 'bg-red-100 text-red-800';
      case 'manager':
        return 'bg-blue-100 text-blue-800';
      case 'user':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const totalPages = Math.ceil(totalCount / limit);

  return (
    <div className='space-y-6 dark:bg-white/5 rounded-lg p-6 text-white dark:text-white border dark:border-[#4e4f57]'>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-white">Users</h1>
        <ProtectedRoute permission="users.create" fallback={null}>
          <button 
            onClick={handleCreateUser}
            className="btn-primary bg-violet-500 hover:bg-violet-900 flex items-center"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add User
          </button>
        </ProtectedRoute>
      </div>
      
      {error && (
        <div className="p-4 mb-4 bg-red-50 text-red-700 rounded-md">
          {error}
        </div>
      )}
      
      {/* Search */}
      <div className="mb-6 " >
        <form onSubmit={handleSearch} className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none ">
            <Search className="h-5 w-5 text-white" />
          </div>
          <input
            type="text"
            className="block w-full pl-10 pr-3 py-2 border-[0.5px] border-gray-400 rounded-md leading-5  dark:bg-white/20 dark:placeholder-white focus:outline-none focus:placeholder-gray-500 focus:ring-1 focus:ring-violet-400 focus:border-violet-400 text-white"
            placeholder="Search users..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </form>
      </div>
      
      {/* User list */}
      <div className="dark:bg-[#FFFFFF0D] shadow-sm rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="dark:bg-[white/5]">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                  Name
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                  Email
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                  Role
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                  Joined
                </th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-white uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white/5 divide-y divide-gray-500">
              {loading ? (
                <tr>
                  <td colSpan={5} className="px-6 py-4 text-center">
                    <div className="flex justify-center">
                      <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-pink-500"></div>
                    </div>
                  </td>
                </tr>
              ) : users.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-4 text-center text-gray-500">
                    No users found
                  </td>
                </tr>
              ) : (
                users.map((user) => (
                  <tr key={user._id} className="hover:bg-white/10">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="h-10 w-10 rounded-full bg-violet-100 flex items-center justify-center text-purple-600 font-semibold">
                          {user.name.charAt(0)}
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-white">{user.name}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-white">{user.email}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2 py-1 text-xs font-semibold rounded-full ${getRoleColor(user.role)}`}>
                        {getRoleIcon(user.role)}
                        <span className="ml-1 capitalize">{user.role}</span>
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-white">
                      {new Date(user.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex items-center justify-end space-x-2">
                        <ProtectedRoute permission="users.edit" fallback={null}>
                          <button
                            onClick={() => handleEditUser(user)}
                            className="text-white hover:text-white/50"
                            title="Edit user"
                          >
                            <Edit className="h-6 w-6" />
                          </button>
                        </ProtectedRoute>
                        <ProtectedRoute permission="users.delete" fallback={null}>
                          <button
                            onClick={() => handleDeleteConfirm(user._id)}
                            className="text-red-600 hover:text-red-900"
                            title="Delete user"
                          >
                            <Trash2 className="h-6 w-6" />
                          </button>
                        </ProtectedRoute>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        
        {/* Pagination */}
        {totalPages > 1 && (
          <div className="px-4 py-3 bg-white border-t border-gray-200 flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-700">
                Showing <span className="font-medium">{(page - 1) * limit + 1}</span> to{' '}
                <span className="font-medium">
                  {Math.min(page * limit, totalCount)}
                </span>{' '}
                of <span className="font-medium">{totalCount}</span> results
              </p>
            </div>
            <div className="flex-1 flex justify-end">
              <button
                onClick={() => setPage(page - 1)}
                disabled={page === 1}
                className={`relative inline-flex items-center px-2 py-2 rounded-md border ${
                  page === 1
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    : 'bg-white text-gray-500 hover:bg-gray-50'
                } text-sm font-medium`}
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                onClick={() => setPage(page + 1)}
                disabled={page >= totalPages}
                className={`ml-3 relative inline-flex items-center px-2 py-2 rounded-md border ${
                  page >= totalPages
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    : 'bg-white text-gray-500 hover:bg-gray-50'
                } text-sm font-medium`}
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          </div>
        )}
      </div>
      
      {/* User Modal */}
      <UserModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveUser}
        user={currentUser}
      />
      
      {/* Delete Confirmation Modal */}
      {isDeleting && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center">
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity\" onClick={() => setIsDeleting(false)}></div>
            <div className="relative inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                    <Trash2 className="h-6 w-6 text-red-600" />
                  </div>
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <h3 className="text-lg leading-6 font-medium text-gray-900">
                      Delete User
                    </h3>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">
                        Are you sure you want to delete this user? This action cannot be undone.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={handleDeleteUser}
                >
                  Delete
                </button>
                <button
                  type="button"
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={() => setIsDeleting(false)}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Users;