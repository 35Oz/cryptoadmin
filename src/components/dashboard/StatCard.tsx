import { ReactNode } from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: number;
  icon: ReactNode;
  bgColor?: string;
  prefix?: string;
  suffix?: string;
  change?: number;
}

const StatCard = ({
  title,
  value,
  icon,
  bgColor = 'bg-white/10',
  prefix = '',
  suffix = '',
  change
}: StatCardProps) => {
  const formatValue = (val: number) => {
    if (val >= 1000000) {
      return (val / 1000000).toFixed(1) + 'M';
    } else if (val >= 1000) {
      return (val / 1000).toFixed(1) + 'K';
    }
    return val.toLocaleString();
  };

  return (
    <div className="rounded-xl p-6 border border-[#4e4f57] bg-white/5 shadow-sm transition-all hover:shadow-md">
      <div className="flex items-center justify-between">
        <div className={`p-3 rounded-lg ${bgColor}`}>
          {icon}
        </div>
        {change !== undefined && (
          <div
            className={`flex items-center text-sm font-medium ${
              change >= 0 ? 'text-green-400' : 'text-red-400'
            }`}
          >
            {change >= 0 ? (
              <TrendingUp className="h-4 w-4 mr-1" />
            ) : (
              <TrendingDown className="h-4 w-4 mr-1" />
            )}
            {Math.abs(change)}%
          </div>
        )}
      </div>
      <div className="mt-4">
        <p className="text-sm font-medium text-gray-400 truncate">{title}</p>
        <p className="mt-1 text-2xl font-bold text-white">
          {prefix}
          {formatValue(value)}
          {suffix}
        </p>
      </div>
    </div>
  );
};

export default StatCard;
