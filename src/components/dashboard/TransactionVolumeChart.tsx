import { useEffect, useState } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';

const generateVolumeData = () => {
  const data = [];
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  days.forEach(day => {
    data.push({
      day,
      volume: Math.round(Math.random() * 50000000 + 10000000),
      transactions: Math.round(Math.random() * 10000 + 5000),
      fees: Math.round(Math.random() * 100000 + 50000)
    });
  });

  return data;
};

const TransactionVolumeChart = () => {
  const [data, setData] = useState(generateVolumeData());
  const [selectedMetric, setSelectedMetric] = useState<'volume' | 'transactions' | 'fees'>('volume');

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const value = payload[0].value;
      let formattedValue = '';

      if (selectedMetric === 'volume' || selectedMetric === 'fees') {
        formattedValue = `$${(value / 1000000).toFixed(1)}M`;
      } else {
        formattedValue = value.toLocaleString();
      }

      return (
        <div className="bg-white dark:bg-gray-800 p-3 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg ">
          <p className="text-sm text-gray-600 dark:text-gray-300 " >{`Day: ${label}`}</p>
          <p className="text-sm font-semibold  dark:text-purple-400 ">
            {selectedMetric === 'volume' ? 'Volume' :
              selectedMetric === 'transactions' ? 'Transactions' : 'Fees'}: {formattedValue}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-white dark:bg-white/5 rounded-xl shadow-sm border border-gray-200 dark:border-[#4e4f57] p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Weekly Analytics</h3>
        <div className="flex space-x-2">
          <button
            onClick={() => setSelectedMetric('volume')}
            className={`px-3 py-1 rounded-md text-sm font-medium transition-colors  ${
              selectedMetric === 'volume'
                ? 'bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-200'
                : 'text-gray-500 hover:text-gray-700 dark:text-gray-400'
            }`}
          >
            Volume
          </button>
          <button
            onClick={() => setSelectedMetric('transactions')}
            className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
              selectedMetric === 'transactions'
                ? 'bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-200'
                : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200'
            }`}
          >
            Transactions
          </button>
          <button
            onClick={() => setSelectedMetric('fees')}
            className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
              selectedMetric === 'fees'
                ? 'bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300'
                : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200'
            }`}
          >
            Fees
          </button>
        </div>
      </div>

      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis
              dataKey="day"
              stroke="#6b7280"
              fontSize={12}
            />
            <YAxis
              stroke="#6b7280"
              fontSize={12}
              tickFormatter={(value) => {
                if (selectedMetric === 'volume' || selectedMetric === 'fees') {
                  return `$${(value / 1000000).toFixed(0)}M`;
                }
                return `${(value / 1000).toFixed(0)}K`;
              }}
            />
            <Tooltip content={<CustomTooltip />} />
            <Bar
              dataKey={selectedMetric}
              fill="#8b5cf6 "
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default TransactionVolumeChart;
