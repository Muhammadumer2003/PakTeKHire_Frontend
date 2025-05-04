import React from 'react';

function StatCard({ label, value, trend, percentage }) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-gray-500 text-sm font-medium">{label}</h3>
      <div className="mt-2 flex items-baseline">
        <p className="text-2xl font-semibold text-gray-900">{value}</p>
        {trend && percentage && (
          <span className={`ml-2 text-sm font-medium ${trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
            {trend === 'up' ? '↑' : '↓'} {percentage}%
          </span>
        )}
      </div>
    </div>
  );
}

function DashboardStats() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <StatCard label="Active Projects" value={12} trend="up" percentage={8} />
      <StatCard label="Total Earnings" value="$24,500" trend="up" percentage={12} />
      <StatCard label="Pending Proposals" value={5} trend="down" percentage={3} />
      <StatCard label="Success Rate" value="94%" trend="up" percentage={2} />
    </div>
  );
}

export default DashboardStats;
