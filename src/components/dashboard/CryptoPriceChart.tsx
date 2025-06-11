import { useEffect, useState } from 'react';
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Area,
  AreaChart
} from 'recharts';

const generatePriceData = () => {
  const data = [];
  const basePrice = 67000;
  let currentPrice = basePrice;

  for (let i = 0; i < 24; i++) {
    const change = (Math.random() - 0.5) * 2000;
    currentPrice += change;
    currentPrice = Math.max(currentPrice, basePrice * 0.9);
    currentPrice = Math.min(currentPrice, basePrice * 1.1);

    data.push({
      time: `${i}:00`,
      btc: Math.round(currentPrice),
      eth: Math.round(currentPrice * 0.051),
      volume: Math.round(Math.random() * 1000000 + 500000)
    });
  }
  return data;
};

const CryptoPriceChart = () => {
  const [data, setData] = useState(generatePriceData());
  const [selectedCrypto, setSelectedCrypto] = useState<'btc' | 'eth'>('btc');

  useEffect(() => {
    const interval = setInterval(() => {
      setData(generatePriceData());
    }, 30000);
    return () => clearInterval(interval);
  }, []);

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-[#1f1f24] p-3 border border-[#4e4f57] rounded-lg shadow-lg">
          <p className="text-sm text-gray-300">{`Time: ${label}`}</p>
          <p className="text-sm font-semibold text-orange-400">
            {selectedCrypto.toUpperCase()}: ${payload[0].value.toLocaleString()}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-white/5 rounded-xl shadow-sm border border-[#4e4f57] p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-white">Price Chart (24h)</h3>
        <div className="flex space-x-2">
          <button
            onClick={() => setSelectedCrypto('btc')}
            className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
              selectedCrypto === 'btc'
                ? 'bg-orange-500/20 text-orange-400'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            BTC
          </button>
          <button
            onClick={() => setSelectedCrypto('eth')}
            className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
              selectedCrypto === 'eth'
                ? 'bg-blue-500/20 text-blue-400'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            ETH
          </button>
        </div>
      </div>

      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <defs>
              <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor={selectedCrypto === 'btc' ? '#f97316' : '#3b82f6'}
                  stopOpacity={0.3}
                />
                <stop
                  offset="95%"
                  stopColor={selectedCrypto === 'btc' ? '#f97316' : '#3b82f6'}
                  stopOpacity={0}
                />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#2f3037" />
            <XAxis dataKey="time" stroke="#9ca3af" fontSize={12} />
            <YAxis
              stroke="#9ca3af"
              fontSize={12}
              tickFormatter={(value) => `$${value.toLocaleString()}`}
            />
            <Tooltip content={<CustomTooltip />} />
            <Area
              type="monotone"
              dataKey={selectedCrypto}
              stroke={selectedCrypto === 'btc' ? '#f97316' : '#3b82f6'}
              fillOpacity={1}
              fill="url(#colorPrice)"
              strokeWidth={2}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default CryptoPriceChart;
