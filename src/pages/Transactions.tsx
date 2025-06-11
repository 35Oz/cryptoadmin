import { useState, useEffect } from 'react';
import { 
  Search, 
  Filter, 
  Download, 
  ArrowUpRight, 
  ArrowDownLeft, 
  Copy, 
  ExternalLink,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

interface Transaction {
  id: string;
  type: 'buy' | 'sell' | 'transfer' | 'deposit' | 'withdrawal';
  crypto: string;
  amount: number;
  usdValue: number;
  from: string;
  to: string;
  timestamp: string;
  status: 'completed' | 'pending' | 'failed';
  fee: number;
  hash: string;
  block: number;
}

const generateTransactions = (count: number): Transaction[] => {
  const cryptos = ['BTC', 'ETH', 'ADA', 'SOL', 'MATIC', 'DOT', 'AVAX', 'LINK'];
  const types: ('buy' | 'sell' | 'transfer' | 'deposit' | 'withdrawal')[] = ['buy', 'sell', 'transfer', 'deposit', 'withdrawal'];
  const statuses: ('completed' | 'pending' | 'failed')[] = ['completed', 'pending', 'failed'];
  
  return Array.from({ length: count }, (_, i) => {
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
      from: `0x${Math.random().toString(16).substr(2, 40)}`,
      to: `0x${Math.random().toString(16).substr(2, 40)}`,
      timestamp: new Date(Date.now() - Math.random() * 7 * 24 * 3600000).toISOString(),
      status: statuses[Math.floor(Math.random() * statuses.length)],
      fee: Number((Math.random() * 50 + 5).toFixed(2)),
      hash: `0x${Math.random().toString(16).substr(2, 64)}`,
      block: Math.floor(Math.random() * 1000000 + 18000000)
    };
  });
};

const Transactions = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');
  const [page, setPage] = useState(1);
  const [limit] = useState(20);

  useEffect(() => {
    const fetchTransactions = () => {
      setLoading(true);
      setTimeout(() => {
        setTransactions(generateTransactions(100));
        setLoading(false);
      }, 1000);
    };

    fetchTransactions();
  }, []);

  const filteredTransactions = transactions.filter(tx => {
    const matchesSearch = tx.hash.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         tx.crypto.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         tx.from.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         tx.to.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || tx.status === statusFilter;
    const matchesType = typeFilter === 'all' || tx.type === typeFilter;
    
    return matchesSearch && matchesStatus && matchesType;
  });

  const paginatedTransactions = filteredTransactions.slice(
    (page - 1) * limit,
    page * limit
  );

  const totalPages = Math.ceil(filteredTransactions.length / limit);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-900';
      case 'pending':
        return 'bg-yellow-100 text-yellow-900';
      case 'failed':
        return 'bg-red-100 text-red-900';
      default:
        return 'bg-gray-100 text-white';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'buy':
      case 'deposit':
        return <ArrowDownLeft className="h-4 w-4 text-green-600" />;
      case 'sell':
      case 'withdrawal':
        return <ArrowUpRight className="h-4 w-4 text-red-600" />;
      default:
        return <ArrowUpRight className="h-4 w-4 text-blue-600" />;
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const truncateAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  return (
    <div className="space-y-6 dark:bg-white/5 rounded-lg p-6 text-white  border dark:border-[#4e4f57]">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Transactions</h1>
          <p className="mt-1 text-sm text-gray-700 dark:text-gray-400">
            Monitor and manage all platform transactions
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <button className="flex items-center px-4 py-2 border border-gray-400 rounded-lg text-sm font-medium text-white dark:dark:text-white bg-white/40 dark:dark:bg-white/10 hover:bg-white/60 dark:dark:hover:bg-white/20">
            <Filter className="h-4 w-4 mr-2" />
            Advanced Filters
          </button>
          <button className="flex items-center px-4 py-2 bg-violet-400 text-violet-900 rounded-lg text-sm font-medium hover:bg-violet-500">
            <Download className="h-4 w-4 mr-2" />
            Export CSV
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white/20 dark:dark:bg-white/10 rounded-xl shadow-sm border border-gray-300 dark:dark:border-gray-500 p-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">Search</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-white" />
              </div>
              <input
                type="text"
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5  dark:dark:bg-white/20 dark:placeholder-white focus:outline-none focus:placeholder-gray-500 focus:ring-1 focus:ring-violet-400 focus:border-violet-400 text-white"
                placeholder="Search by hash, address..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2">Status</label>
            <select
              className="block w-full px-3 py-2 border border-gray-350 rounded-md shadow-sm
              dark:bg-white/20 backdrop-blur-sm
             
              focus:ring-violet-400 focus:border-violet-400 text-white"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option className=" text-black" value="all">All Status</option>
              <option className=" text-black" value="completed">Completed</option>
              <option className=" text-black" value="pending">Pending</option>
              <option className=" text-black" value="failed">Failed</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2">Type</label>
            <select
              className="block w-full px-3 py-2 border border-gray-350 rounded-md shadow-sm
              dark:bg-white/20 backdrop-blur-sm
             
              focus:ring-violet-400 focus:border-violet-400 text-white"
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
            >
              <option className=" text-black"  value="all">All Types</option>
              <option className=" text-black" value="buy">Buy</option>
              <option className=" text-black" value="sell">Sell</option>
              <option className=" text-black" value="transfer">Transfer</option>
              <option className=" text-black" value="deposit">Deposit</option>
              <option className=" text-black" value="withdrawal">Withdrawal</option>
            </select>
          </div>
          
          <div className="flex items-end">
            <button
              onClick={() => {
                setSearchTerm('');
                setStatusFilter('all');
                setTypeFilter('all');
              }}
              className="w-full px-4 py-2 bg-violet-400 text-violet-900 rounded-lg font-semibold hover:bg-violet-500"
            >
              Reset Filters
            </button>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-lg border border-gray-300 dark:dark:border-gray-500 shadow-sm bg-white/30 dark:dark:bg-white/10">
        <table className="min-w-full divide-y divide-gray-200 dark:dark:divide-gray-500">
          <thead className="bg-white/30 dark:dark:bg-white/10">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                Type
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                Amount
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                From
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                To
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                Fee (USD)
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                Block
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                Tx Hash
              </th>
              <th className="px-6 py-3"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-300 dark:dark:divide-gray-500">
            {loading ? (
              <tr>
                <td colSpan={10} className="text-center py-8 text-white">
                  Loading transactions...
                </td>
              </tr>
            ) : paginatedTransactions.length === 0 ? (
              <tr>
                <td colSpan={10} className="text-center py-8 text-white">
                  No transactions found.
                </td>
              </tr>
            ) : (
              paginatedTransactions.map(tx => (
                <tr key={tx.id} className="hover:bg-white/20 dark:dark:hover:bg-white/10 transition">
                  <td className="px-6 py-4 whitespace-nowrap flex items-center space-x-2 text-white dark:dark:text-white">
                    {getTypeIcon(tx.type)}
                    <span className="capitalize">{tx.type} {tx.crypto}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-white dark:dark:text-white">
                    {tx.amount.toFixed(4)} {tx.crypto} <br />
                    <span className="text-xs text-gray-700 dark:dark:text-gray-700">${tx.usdValue.toFixed(2)}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap max-w-xs truncate text-white dark:dark:text-white" title={tx.from}>
                    {truncateAddress(tx.from)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap max-w-xs truncate text-white dark:dark:text-white" title={tx.to}>
                    {truncateAddress(tx.to)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-block px-2 py-1 rounded text-xs font-semibold ${getStatusColor(tx.status)}`}>
                      {tx.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-white">
                    {new Date(tx.timestamp).toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-white">
                    ${tx.fee.toFixed(2)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-white">
                    {tx.block}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap max-w-xs truncate text-white" title={tx.hash}>
                    {truncateAddress(tx.hash)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap flex space-x-2">
                    <button
                      onClick={() => copyToClipboard(tx.hash)}
                      className="p-1 rounded  hover:bg-white/20"
                      title="Copy Tx Hash"
                    >
                      <Copy className="h-5 w-5 text-white  " />
                    </button>
                    <a
                      href={`https://etherscan.io/tx/${tx.hash}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-1 rounded hover:bg-white/20"
                      title="View on Etherscan"
                    >
                      <ExternalLink className="h-5 w-5 text-white" />
                    </a>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-between items-center px-6 py-4 border-t dark:border-gray-500 dark:bg-white/10 rounded-b-lg">
        <button
          onClick={() => setPage(p => Math.max(p - 1, 1))}
          disabled={page === 1}
          className="p-2 rounded dark:hover:bg-white/20 disabled:opacity-40 disabled:cursor-not-allowed text-white"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <span className="text-sm text-white">
          Page {page} of {totalPages}
        </span>
        <button
          onClick={() => setPage(p => Math.min(p + 1, totalPages))}
          disabled={page === totalPages}
          className="p-2 rounded:dark:hover:bg-white/20 disabled:opacity-40 disabled:cursor-not-allowed text-white"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
};

export default Transactions;
