import { useState, useEffect } from 'react';
import { ArrowUpRight, ArrowDownLeft, Copy, ExternalLink } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface Transaction {
  id: string;
  type: 'buy' | 'sell' | 'transfer';
  crypto: string;
  amount: number;
  usdValue: number;
  from: string;
  to: string;
  timestamp: string;
  status: 'completed' | 'pending' | 'failed';
  fee: number;
}

const generateTransactions = (): Transaction[] => {
  const cryptos = ['BTC', 'ETH', 'ADA', 'SOL', 'MATIC', 'DOT'];
  const types: ('buy' | 'sell' | 'transfer')[] = ['buy', 'sell', 'transfer'];
  const statuses: ('completed' | 'pending' | 'failed')[] = ['completed', 'pending', 'failed'];

  return Array.from({ length: 8 }, (_, i) => {
    const crypto = cryptos[Math.floor(Math.random() * cryptos.length)];
    const type = types[Math.floor(Math.random() * types.length)];
    const amount = Math.random() * 10 + 0.1;
    const usdValue = amount * (crypto === 'BTC' ? 67000 : crypto === 'ETH' ? 3400 : 1000);

    return {
      id: `tx_${Date.now()}_${i}`,
      type,
      crypto,
      amount: Number(amount.toFixed(4)),
      usdValue: Number(usdValue.toFixed(2)),
      from: `0x${Math.random().toString(16).substr(2, 8)}...`,
      to: `0x${Math.random().toString(16).substr(2, 8)}...`,
      timestamp: new Date(Date.now() - Math.random() * 3600000).toISOString(),
      status: statuses[Math.floor(Math.random() * statuses.length)],
      fee: Number((Math.random() * 50 + 5).toFixed(2))
    };
  });
};

const RecentTransactions = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTransactions = () => {
      setTransactions(generateTransactions());
      setLoading(false);
    };

    fetchTransactions();

    // Update transactions every 30 seconds
    const interval = setInterval(fetchTransactions, 30000);
    return () => clearInterval(interval);
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-400';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-400';
      case 'failed':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-400';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'buy':
        return <ArrowDownLeft className="h-4 w-4 text-green-600 dark:text-green-400" />;
      case 'sell':
        return <ArrowUpRight className="h-4 w-4 text-red-600 dark:text-red-400" />;
      default:
        return <ArrowUpRight className="h-4 w-4 text-blue-600 dark:text-blue-400" />;
    }
  };

  if (loading) {
    return (
      <div className="bg-white dark:bg-white/5 rounded-xl shadow-sm border border-gray-200 dark:border-[#1e293b] p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Recent Transactions</h3>
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500"></div>
        </div>
      </div>
    );
  }

  const goToTransactions = () => {
    navigate('/transactions');
  };

  return (
    <div className="bg-white dark:bg-white/5 rounded-xl shadow-sm border border-gray-200 dark:border-[#4e4f57] p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Recent Transactions</h3>
        <button
          onClick={goToTransactions}
          className="text-sm font-medium text-violet-600 hover:text-violet-500 dark:text-violet-400 dark:hover:text-violet-300 flex items-center"
        >
          View all
          <ExternalLink className="h-4 w-4 ml-1" />
        </button>
      </div>

      <div className="overflow-hidden">
        <div className="space-y-3">
          {transactions.map((transaction) => (
            <div
              key={transaction.id}
              className="flex items-center justify-between p-3 rounded-lg transition-colors hover:bg-gray-50 dark:hover:bg-white/5"
            >
              <div className="flex items-center space-x-3">
                <div className="flex-shrink-0">
                  {getTypeIcon(transaction.type)}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center space-x-2">
                    <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                      {transaction.amount} {transaction.crypto}
                    </p>
                    <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(transaction.status)}`}>
                      {transaction.status}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2 mt-1">
                    <p className="text-xs text-gray-500 dark:text-gray-300">
                      ${transaction.usdValue.toLocaleString()}
                    </p>
                    <span className="text-gray-300 dark:text-gray-600">•</span>
                    <p className="text-xs text-gray-500 dark:text-gray-300">
                      {new Date(transaction.timestamp).toLocaleTimeString()}
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <button className="p-1 text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300">
                  <Copy className="h-4 w-4" />
                </button>
                <button className="p-1 text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300">
                  <ExternalLink className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RecentTransactions;
