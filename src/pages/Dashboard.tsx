import { useState } from 'react';
import {
  TrendingUp,
  Users,
  ArrowLeftRight,
  DollarSign,
} from 'lucide-react';
import StatCard from '../components/dashboard/StatCard';
import CryptoPriceChart from '../components/dashboard/CryptoPriceChart';
import TransactionVolumeChart from '../components/dashboard/TransactionVolumeChart';
import RecentTransactions from '../components/dashboard/RecentTransactions';
import TopCryptos from '../components/dashboard/TopCryptos';

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalVolume: 2847392,
    activeUsers: 15847,
    totalTransactions: 98234,
    platformRevenue: 847293,
    btcPrice: 67234,
    ethPrice: 3456,
    priceChange24h: 2.34,
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Crypto Dashboard</h1>
          <p className="mt-1 text-sm text-gray-400">
            Real-time cryptocurrency administration and analytics
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <div className="flex items-center px-3 py-1 bg-green-900/40 text-green-400 rounded-full text-sm font-medium">
            <div className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></div>
            Live Data
          </div>
        </div>
      </div>

      {/* Stats cards */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total Volume (24h)"
          value={stats.totalVolume}
          prefix="$"
          icon={<DollarSign className="h-6 w-6 text-green-400" />}
          bgColor="bg-white/5"
          change={+5.2}
        />
        <StatCard
          title="Active Users"
          value={stats.activeUsers}
          icon={<Users className="h-6 w-6 text-blue-400" />}
          bgColor="bg-white/5"
          change={+12.5}
        />
        <StatCard
          title="Transactions (24h)"
          value={stats.totalTransactions}
          icon={<ArrowLeftRight className="h-6 w-6 text-purple-400" />}
          bgColor="bg-white/5"
          change={+8.1}
        />
        <StatCard
          title="Platform Revenue"
          value={stats.platformRevenue}
          prefix="$"
          icon={<TrendingUp className="h-6 w-6 text-orange-400" />}
          bgColor="bg-white/5"
          change={+15.3}
        />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 bg">
        <CryptoPriceChart />
        <TransactionVolumeChart />
      </div>

      {/* Tables */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <RecentTransactions />
        <TopCryptos />
      </div>
    </div>
  );
};

export default Dashboard;
