import { useState, useEffect } from 'react';
import { User } from '../../types';
import { X, Shield, Users as UsersIcon, Eye } from 'lucide-react';

interface UserModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (userData: Partial<User>) => void;
  user: User | null;
}

const UserModal = ({ isOpen, onClose, onSave, user }: UserModalProps) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<'user' | 'manager' | 'admin'>('user');
  const [formError, setFormError] = useState('');
  
  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
      setPassword('');
      setRole(user.role);
    } else {
      setName('');
      setEmail('');
      setPassword('');
      setRole('user');
    }
    setFormError('');
  }, [user, isOpen]);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');
    
    if (!name || !email) {
      setFormError('Name and email are required');
      return;
    }
    
    if (!user && !password) {
      setFormError('Password is required for new users');
      return;
    }
    
    const userData: Partial<User> = {
      name,
      email,
      role
    };
    
    if (password) {
      // @ts-ignore - We're adding the password property
      userData.password = password;
    }
    
    onSave(userData);
  };

  const getRoleIcon = (roleType: string) => {
    switch (roleType) {
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

  const getRoleDescription = (roleType: string) => {
    switch (roleType) {
      case 'admin':
        return 'Full access to all features and settings';
      case 'manager':
        return 'Manage users and view analytics';
      case 'user':
        return 'View dashboard and transactions';
      default:
        return '';
    }
  };
  
  if (!isOpen) return null;
  
  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center">
        <div 
          className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" 
          onClick={onClose}
        ></div>
        
        <div className="relative inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
          <div className="absolute top-0 right-0 pt-4 pr-4">
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-500 focus:outline-none"
            >
              <X size={20} />
            </button>
          </div>
          
          <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
              {user ? 'Edit User' : 'Add User'}
            </h3>
            
            {formError && (
              <div className="mb-4 bg-red-50 border-l-4 border-red-400 p-4">
                <div className="flex">
                  <div className="ml-3">
                    <p className="text-sm text-red-700">
                      {formError}
                    </p>
                  </div>
                </div>
              </div>
            )}
            
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label htmlFor="name" className="form-label">
                  Name
                </label>
                <input
                  id="name"
                  type="text"
                  className="form-input"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              
              <div className="mb-4">
                <label htmlFor="email" className="form-label">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  className="form-input"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              
              <div className="mb-4">
                <label htmlFor="password" className="form-label">
                  Password {user && <span className="text-gray-500 text-xs">(leave blank to keep current)</span>}
                </label>
                <input
                  id="password"
                  type="password"
                  className="form-input"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              
              <div className="mb-4">
                <label htmlFor="role" className="form-label">
                  Role
                </label>
                <div className="space-y-2">
                  {(['user', 'manager', 'admin'] as const).map((roleOption) => (
                    <label key={roleOption} className="flex items-center p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                      <input
                        type="radio"
                        name="role"
                        value={roleOption}
                        checked={role === roleOption}
                        onChange={(e) => setRole(e.target.value as 'user' | 'manager' | 'admin')}
                        className="h-4 w-4 text-orange-600 focus:ring-orange-500 border-gray-300"
                      />
                      <div className="ml-3 flex-1">
                        <div className="flex items-center">
                          {getRoleIcon(roleOption)}
                          <span className="ml-2 text-sm font-medium text-gray-900 capitalize">
                            {roleOption}
                          </span>
                        </div>
                        <p className="text-xs text-gray-500 mt-1">
                          {getRoleDescription(roleOption)}
                        </p>
                      </div>
                    </label>
                  ))}
                </div>
              </div>
              
              <div className="mt-5 sm:mt-6 sm:flex sm:flex-row-reverse">
                <button
                  type="submit"
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-orange-600 text-base font-medium text-white hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  {user ? 'Update' : 'Create'}
                </button>
                <button
                  type="button"
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:w-auto sm:text-sm"
                  onClick={onClose}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserModal;