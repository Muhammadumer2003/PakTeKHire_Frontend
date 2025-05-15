import React, { useState, useEffect } from 'react';
import { BarChart, LineChart, PieChart, TrendingUp } from 'lucide-react';
import axios from 'axios';
import { useSelector } from 'react-redux';

const Reports = () => {
  // Get user data from Redux store
  const auth = useSelector(state => state.auth);
  const { user } = auth || {};
  const userId = user?._id;

  // State for dynamic data
  const [reportData, setReportData] = useState({
    earnings: 0,
    activeProjects: 0,
    completionRate: 0,
    hoursWorked: 0,
    earningsTrend: '0%',
    projectsTrend: '0',
    completionTrend: '0%',
    hoursTrend: '0h'
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [chartData, setChartData] = useState({
    earnings: [],
    projects: []
  });

  // Fetch reports data from backend
  useEffect(() => {
    const fetchReportData = async () => {
      if (!userId) return;
      
      try {
        setLoading(true);
        const response = await axios.get(`http://localhost:8008/freelancer/reports/${userId}`, {
          withCredentials: true
        });
        
        const data = response.data;
        
        setReportData({
          earnings: data.totalEarnings || 0,
          activeProjects: data.activeProjects || 0,
          completionRate: data.completionRate || 0,
          hoursWorked: data.hoursWorked || 0,
          earningsTrend: data.earningsTrend || '0%',
          projectsTrend: data.projectsTrend || '0',
          completionTrend: data.completionTrend || '0%',
          hoursTrend: data.hoursTrend || '0h'
        });
        
        // Set chart data if available
        if (data.chartsData) {
          setChartData({
            earnings: data.chartsData.earnings || [],
            projects: data.chartsData.projects || []
          });
        }
        
      } catch (err) {
        console.error('Error fetching report data:', err);
        setError('Failed to load report data. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    
    fetchReportData();
  }, [userId]);

  // Format currency
  const formatCurrency = (amount) => {
    return `RS ${amount.toLocaleString()}`;
  };

  // Create stats array from dynamic data
  const stats = [
    { 
      label: 'Total Earnings', 
      value: formatCurrency(reportData.earnings), 
      trend: reportData.earningsTrend, 
      icon: TrendingUp, 
      color: 'bg-green-100', 
      textColor: 'text-green-500' 
    },
    { 
      label: 'Active Projects', 
      value: reportData.activeProjects.toString(), 
      trend: `+${reportData.projectsTrend}`, 
      icon: BarChart, 
      color: 'bg-blue-100', 
      textColor: 'text-blue-500' 
    },
    { 
      label: 'Completion Rate', 
      value: `${reportData.completionRate}%`, 
      trend: reportData.completionTrend, 
      icon: PieChart, 
      color: 'bg-yellow-100', 
      textColor: 'text-yellow-500' 
    },
    { 
      label: 'Hours Worked', 
      value: `${reportData.hoursWorked}h`, 
      trend: reportData.hoursTrend, 
      icon: LineChart, 
      color: 'bg-purple-100', 
      textColor: 'text-purple-500' 
    },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-gray-200 border-t-green-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-red-500 font-medium text-center">
          <p>{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

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
          {chartData.earnings.length > 0 ? (
            <div className="h-64">
              {/* Here you would render a chart using a library like Chart.js or Recharts */}
              {/* For example: <LineChart data={chartData.earnings} /> */}
              <div className="flex items-center justify-center h-full">
                <p className="text-gray-500">Chart shows data for {chartData.earnings.length} months</p>
              </div>
            </div>
          ) : (
            <div className="h-64 flex items-center justify-center border-2 border-dashed border-gray-300 rounded-lg">
              <span className="text-gray-500">No earnings data available yet</span>
            </div>
          )}
        </div>

        {/* Project Status */}
        <div className="rounded-xl shadow-lg p-8 bg-white">
          <h2 className="text-2xl font-semibold mb-6">Project Status</h2>
          {chartData.projects.length > 0 ? (
            <div className="h-64">
              {/* Here you would render a chart using a library like Chart.js or Recharts */}
              {/* For example: <PieChart data={chartData.projects} /> */}
              <div className="flex items-center justify-center h-full">
                <p className="text-gray-500">Chart shows status of {chartData.projects.length} projects</p>
              </div>
            </div>
          ) : (
            <div className="h-64 flex items-center justify-center border-2 border-dashed border-gray-300 rounded-lg">
              <span className="text-gray-500">No project data available yet</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Reports;