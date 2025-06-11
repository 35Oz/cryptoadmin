import { useEffect, useState } from 'react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  Legend 
} from 'recharts';
import axios from 'axios';
import { API_URL } from '../../config/constants';

// Demo data
const demoData = [
  { name: 'Jan', users: 40, activeUsers: 24 },
  { name: 'Feb', users: 30, activeUsers: 13 },
  { name: 'Mar', users: 20, activeUsers: 10 },
  { name: 'Apr', users: 27, activeUsers: 15 },
  { name: 'May', users: 18, activeUsers: 8 },
  { name: 'Jun', users: 23, activeUsers: 12 },
  { name: 'Jul', users: 34, activeUsers: 16 },
];

interface ActivityData {
  name: string;
  users: number;
  activeUsers: number;
}

const UserActivityChart = () => {
  const [data, setData] = useState<ActivityData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchChartData = async () => {
      try {
        const response = await axios.get(`${API_URL}/dashboard/user-activity`);
        setData(response.data);
      } catch (err) {
        console.error('Error fetching user activity data:', err);
        // Use demo data for preview
        setData(demoData);
      } finally {
        setLoading(false);
      }
    };

    fetchChartData();
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
      <h3 className="text-lg font-medium text-gray-900 mb-4">User Activity</h3>
      <div className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={data}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="name" stroke="#6b7280" />
            <YAxis stroke="#6b7280" />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: 'white', 
                borderRadius: '0.375rem',
                boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
                border: 'none' 
              }} 
            />
            <Legend />
            <Line 
              type="monotone" 
              dataKey="users" 
              stroke="#3b82f6" 
              activeDot={{ r: 8 }}
              strokeWidth={2}
            />
            <Line 
              type="monotone" 
              dataKey="activeUsers" 
              stroke="#6366f1" 
              strokeWidth={2}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default UserActivityChart;