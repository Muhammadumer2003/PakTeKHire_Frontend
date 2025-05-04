import React from 'react';
import { BarChart, LineChart, PieChart, TrendingUp } from 'lucide-react';

 const Reports=()=> {
  const stats = [
    { label: 'Total Earnings', value: 'RS 24,500', trend: '+12%', icon: TrendingUp, color: 'bg-green-100', textColor: 'text-green-500' },
    { label: 'Active Projects', value: '8', trend: '+3', icon: BarChart, color: 'bg-blue-100', textColor: 'text-blue-500' },
    { label: 'Completion Rate', value: '94%', trend: '+2%', icon: PieChart, color: 'bg-yellow-100', textColor: 'text-yellow-500' },
    { label: 'Hours Worked', value: '164h', trend: '+8h', icon: LineChart, color: 'bg-purple-100', textColor: 'text-purple-500' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-6 py-8 font-inter">
      <h1 className="text-4xl font-bold text-gray-800 mb-10 text-center">Reports & Analytics</h1>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-12 mt-20">
        {stats.map((stat, idx) => (
          <div
            key={idx}
            className={`rounded-xl shadow-lg hover:shadow-2xl transition-shadow p-6 flex flex-col items-center bg-white`}
          >
            <div className={`w-16 h-16 flex items-center justify-center ${stat.color} rounded-full mb-4`}>
              <stat.icon className={`w-8 h-8 ${stat.textColor}`} />
            </div>
            <h3 className="text-gray-600 text-sm uppercase tracking-wide">{stat.label}</h3>
            <p className="text-4xl font-bold text-gray-800 mt-2">{stat.value}</p>
            <span
              className={`mt-2 text-sm font-medium ${
                stat.trend.includes('+') ? 'text-green-600' : 'text-red-600'
              }`}
            >
              {stat.trend}
            </span>
          </div>
        ))}
      </div>

      {/* Detailed Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Earnings Overview */}
        <div className="rounded-xl shadow-lg p-8 bg-white">
          <h2 className="text-2xl font-semibold mb-6">Earnings Overview</h2>
          <div className="h-64 flex items-center justify-center border-2 border-dashed border-gray-300 rounded-lg">
            <span className="text-gray-500">Earnings chart will be displayed here</span>
          </div>
        </div>

        {/* Project Status */}
        <div className="rounded-xl shadow-lg p-8 bg-white">
          <h2 className="text-2xl font-semibold mb-6">Project Status</h2>
          <div className="h-64 flex items-center justify-center border-2 border-dashed border-gray-300 rounded-lg">
            <span className="text-gray-500">Project status chart will be displayed here</span>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Reports;