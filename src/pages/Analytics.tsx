import { useState, useEffect } from 'react';
import { TrendingUp, TrendingDown, Star } from 'lucide-react';

interface CryptoData {
  id: string;
  symbol: string;
  name: string;
  price: number;
  change24h: number;
  volume24h: number;
  marketCap: number;
  rank: number;
}

const cryptoIds = [
  'bitcoin',
  'ethereum',
  'cardano',
  'solana',
  'polygon',
  'polkadot',
  'avalanche-2',
  'chainlink'
];

const TopCryptos = () => {
  const [cryptos, setCryptos] = useState<CryptoData[]>([]);
  const [loading, setLoading] = useState(true);
  const [favorites, setFavorites] = useState<Set<string>>(new Set(['BTC', 'ETH']));

  useEffect(() => {
    const fetchCryptos = async () => {
      try {
        const response = await fetch(
          `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${cryptoIds.join(
            ','
          )}&order=market_cap_desc&per_page=8&page=1&sparkline=false`
        );
        const data = await response.json();

        const formattedData: CryptoData[] = data.map((coin: any, index: number) => ({
          id: coin.id,
          symbol: coin.symbol.toUpperCase(),
          name: coin.name,
          price: coin.current_price,
          change24h: coin.price_change_percentage_24h,
          volume24h: coin.total_volume,
          marketCap: coin.market_cap,
          rank: coin.market_cap_rank || index + 1
        }));

        setCryptos(formattedData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching crypto data:', error);
        setLoading(false);
      }
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
    if (num >= 1e9) return `$${(num / 1e9).toFixed(1)}B`;
    if (num >= 1e6) return `$${(num / 1e6).toFixed(1)}M`;
    if (num >= 1e3) return `$${(num / 1e3).toFixed(1)}K`;
    return `$${num.toFixed(2)}`;
  };

  if (loading) {
    return (
      <div className="dark:dark:bg-white/5 rounded-xl shadow-sm border dark:border-[#4e4f57] p-6">
        <h3 className="text-lg font-semibold text-white mb-4">Top Cryptocurrencies</h3>
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-violet-500"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="dark:dark:bg-white/5 rounded-xl shadow-sm border dark:border-[#4e4f57] p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-white">Top Cryptocurrencies</h3>
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
          <span className="text-xs text-zinc-400">Live prices</span>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead>
            <tr className="border-b border-zinc-700">
              <th className="text-left py-2 text-xs font-medium text-zinc-400 uppercase tracking-wider">Rank</th>
              <th className="text-left py-2 text-xs font-medium text-zinc-400 uppercase tracking-wider">Name</th>
              <th className="text-right py-2 text-xs font-medium text-zinc-400 uppercase tracking-wider">Price</th>
              <th className="text-right py-2 text-xs font-medium text-zinc-400 uppercase tracking-wider">24h %</th>
              <th className="text-right py-2 text-xs font-medium text-zinc-400 uppercase tracking-wider">Volume</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-800">
            {cryptos.map((crypto) => (
              <tr key={crypto.id} className="">
                <td className="py-3 text-sm text-white">
                  <div className="flex items-center space-x-2">
                    <span className="font-medium">#{crypto.rank}</span>
                    <button
                      onClick={() => toggleFavorite(crypto.symbol)}
                      className={`p-1 rounded transition ${
                        favorites.has(crypto.symbol)
                          ? 'text-yellow-400'
                          : 'text-zinc-500 hover:text-yellow-400'
                      }`}
                      aria-label={`Toggle favorite for ${crypto.name}`}
                    >
                      <Star className="h-3 w-3" fill={favorites.has(crypto.symbol) ? 'currentColor' : 'none'} />
                    </button>
                  </div>
                </td>
                <td className="py-3">
                  <div className="flex items-center">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center text-white text-xs font-bold mr-3">
                      {crypto.symbol.charAt(0)}
                    </div>
                    <div>
                      <div className="text-sm font-medium text-white">{crypto.symbol}</div>
                      <div className="text-xs text-zinc-400">{crypto.name}</div>
                    </div>
                  </div>
                </td>
                <td className="py-3 text-right text-sm font-medium text-white">
                  ${crypto.price.toLocaleString()}
                </td>
                <td className="py-3 text-right">
                  <div className={`flex items-center justify-end text-sm font-medium ${
                    crypto.change24h >= 0 ? 'text-green-500' : 'text-red-500'
                  }`}>
                    {crypto.change24h >= 0 ? (
                      <TrendingUp className="h-4 w-4 mr-1" />
                    ) : (
                      <TrendingDown className="h-4 w-4 mr-1" />
                    )}
                    {Math.abs(crypto.change24h).toFixed(2)}%
                  </div>
                </td>
                <td className="py-3 text-right text-sm text-zinc-400">
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
