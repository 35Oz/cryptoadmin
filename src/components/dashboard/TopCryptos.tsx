import { useState, useEffect } from 'react';
import { TrendingUp, TrendingDown, Star } from 'lucide-react';

interface CryptoData {
  symbol: string;
  name: string;
  price: number;
  change24h: number;
  volume24h: number;
  marketCap: number;
  rank: number;
}

const generateCryptoData = (): CryptoData[] => {
  const cryptos = [
    { symbol: 'BTC', name: 'Bitcoin' },
    { symbol: 'ETH', name: 'Ethereum' },
    { symbol: 'ADA', name: 'Cardano' },
    { symbol: 'SOL', name: 'Solana' },
    { symbol: 'MATIC', name: 'Polygon' },
    { symbol: 'DOT', name: 'Polkadot' },
    { symbol: 'AVAX', name: 'Avalanche' },
    { symbol: 'LINK', name: 'Chainlink' }
  ];

  return cryptos.map((crypto, index) => {
    const basePrice = crypto.symbol === 'BTC' ? 67000 : 
                     crypto.symbol === 'ETH' ? 3400 : 
                     Math.random() * 100 + 10;
    
    return {
      symbol: crypto.symbol,
      name: crypto.name,
      price: Number(basePrice.toFixed(2)),
      change24h: Number(((Math.random() - 0.5) * 20).toFixed(2)),
      volume24h: Math.round(Math.random() * 1000000000 + 100000000),
      marketCap: Math.round(Math.random() * 100000000000 + 10000000000),
      rank: index + 1
    };
  });
};

const TopCryptos = () => {
  const [cryptos, setCryptos] = useState<CryptoData[]>([]);
  const [loading, setLoading] = useState(true);
  const [favorites, setFavorites] = useState<Set<string>>(new Set(['BTC', 'ETH']));

  useEffect(() => {
    const fetchCryptos = () => {
      setCryptos(generateCryptoData());
      setLoading(false);
    };

    fetchCryptos();
    
    const interval = setInterval(fetchCryptos, 30000);
    return () => clearInterval(interval);
  }, []);

  const toggleFavorite = (symbol: string) => {
    const newFavorites = new Set(favorites);
    if (newFavorites.has(symbol)) {
      newFavorites.delete(symbol);
    } else {
      newFavorites.add(symbol);
    }
    setFavorites(newFavorites);
  };

  const formatNumber = (num: number) => {
    if (num >= 1e9) {
      return `$${(num / 1e9).toFixed(1)}B`;
    } else if (num >= 1e6) {
      return `$${(num / 1e6).toFixed(1)}M`;
    } else if (num >= 1e3) {
      return `$${(num / 1e3).toFixed(1)}K`;
    }
    return `$${num.toFixed(2)}`;
  };

  if (loading) {
    return (
      <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">Top Cryptocurrencies</h3>
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-violet-500 dark:border-violet-400"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white dark:dark:bg-white/5 rounded-xl shadow-sm border border-gray-200 dark:border-[#4e4f57] p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Top Cryptocurrencies</h3>
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 bg-green-400 dark:bg-green-500 rounded-full animate-pulse"></div>
          <span className="text-xs text-gray-500 dark:text-gray-400">Live prices</span>
        </div>
      </div>
      
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead>
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <th className="text-left py-2 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Rank
              </th>
              <th className="text-left py-2 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Name
              </th>
              <th className="text-right py-2 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Price
              </th>
              <th className="text-right py-2 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                24h %
              </th>
              <th className="text-right py-2 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Volume
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
            {cryptos.map((crypto) => (
              <tr key={crypto.symbol} className="hover:bg-gray-50 dark:hover:bg-white/5">
                <td className="py-3 text-sm text-gray-900 dark:text-gray-100">
                  <div className="flex items-center space-x-2">
                    <span className="font-medium">#{crypto.rank}</span>
                    <button
                      onClick={() => toggleFavorite(crypto.symbol)}
                      className={`p-1 rounded ${
                        favorites.has(crypto.symbol)
                          ? 'text-yellow-500'
                          : 'text-gray-300 hover:text-yellow-500'
                      }`}
                    >
                      <Star className="h-3 w-3" fill={favorites.has(crypto.symbol) ? 'currentColor' : 'none'} />
                    </button>
                  </div>
                </td>
                <td className="py-3">
                  <div className="flex items-center">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-500 to-pink-500  flex items-center justify-center text-white text-xs font-bold mr-3">
                      {crypto.symbol.charAt(0)}
                    </div>
                    <div>
                      <div className="text-sm font-medium text-gray-900 dark:text-gray-100">{crypto.symbol}</div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">{crypto.name}</div>
                    </div>
                  </div>
                </td>
                <td className="py-3 text-right text-sm font-medium text-gray-900 dark:text-gray-100">
                  ${crypto.price.toLocaleString()}
                </td>
                <td className="py-3 text-right">
                  <div className={`flex items-center justify-end text-sm font-medium ${
                    crypto.change24h >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
                  }`}>
                    {crypto.change24h >= 0 ? (
                      <TrendingUp className="h-4 w-4 mr-1" />
                    ) : (
                      <TrendingDown className="h-4 w-4 mr-1" />
                    )}
                    {Math.abs(crypto.change24h)}%
                  </div>
                </td>
                <td className="py-3 text-right text-sm text-gray-500 dark:text-gray-400">
                  {formatNumber(crypto.volume24h)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TopCryptos;
