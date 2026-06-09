import React, { useState } from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';
import { Users, UserCheck, Phone, Euro, Radio } from 'lucide-react';

const revenueData = [
  { month: 'Jan', donation: 280000, webshop: 320000, consultant: 380000 },
  { month: 'Feb', donation: 310000, webshop: 360000, consultant: 420000 },
  { month: 'Mar', donation: 350000, webshop: 410000, consultant: 490000 },
  { month: 'Apr', donation: 420000, webshop: 510000, consultant: 620000 },
  { month: 'May', donation: 370000, webshop: 450000, consultant: 540000 },
  { month: 'Jun', donation: 340000, webshop: 410000, consultant: 490000 },
  { month: 'Jul', donation: 360000, webshop: 440000, consultant: 510000 },
  { month: 'Aug', donation: 390000, webshop: 470000, consultant: 560000 },
  { month: 'Sep', donation: 450000, webshop: 550000, consultant: 660000 },
  { month: 'Oct', donation: 480000, webshop: 590000, consultant: 700000 },
  { month: 'Nov', donation: 420000, webshop: 510000, consultant: 610000 },
  { month: 'Dec', donation: 390000, webshop: 480000, consultant: 570000 },
];

const stats = [
  {
    label: 'Total Users',
    value: '12,482',
    icon: Users,
    iconBg: 'bg-green-50',
    iconColor: 'text-green-500',
  },
  {
    label: 'Total Consultants',
    value: '842',
    icon: UserCheck,
    iconBg: 'bg-amber-50',
    iconColor: 'text-amber-500',
  },
  {
    label: 'Total Consultations',
    value: '45,201',
    icon: Phone,
    iconBg: 'bg-purple-50',
    iconColor: 'text-purple-500',
  },
  {
    label: 'Total Revenue',
    value: '€128,420',
    icon: Euro,
    iconBg: 'bg-green-50',
    iconColor: 'text-green-500',
  },
  {
    label: 'Active Calls',
    value: '18',
    icon: Radio,
    iconBg: 'bg-indigo-50',
    iconColor: 'text-indigo-500',
  },
];

const formatYAxis = (value) => {
  if (value >= 1000000) return `€${(value / 1000000).toFixed(1)}M`;
  if (value >= 1000) return `€${(value / 1000).toFixed(0)}k`;
  return `€${value}`;
};

const Dashboard = () => {
  const [period, setPeriod] = useState('This year');

  return (
    <div className='space-y-6'>
      {/* Page title */}
      <div>
        <h1 className='dashboard-page-title'>Dashboard</h1>
        <p className='dashboard-page-subtitle mt-0.5'>
          Overview &amp; management of your platform.
        </p>
      </div>

      {/* Stats cards */}
      <div className='grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-5 gap-4'>
        {stats.map(({ label, value, icon: Icon, iconBg, iconColor }) => (
          <div
            key={label}
            className='bg-white rounded-xl border border-gray-100 shadow-sm p-5 flex flex-col gap-3'
          >
            <div
              className={`w-10 h-10 rounded-lg ${iconBg} flex items-center justify-center`}
            >
              <Icon size={20} className={iconColor} aria-hidden='true' />
            </div>
            <div>
              <p className='text-sm text-gray-500'>{label}</p>
              <p className='text-2xl font-bold text-gray-900 mt-0.5'>{value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Revenue chart */}
      <div className='bg-white rounded-xl border border-gray-100 shadow-sm p-6'>
        <div className='flex items-start justify-between mb-6'>
          <div>
            <h2 className='text-base font-semibold text-gray-900'>
              Revenue Per Consultant
            </h2>
            <p className='text-sm text-gray-400 mt-0.5'>
              Top performing categories
            </p>
          </div>
          <div className='flex items-center gap-4'>
            <div className='hidden sm:flex items-center gap-4 text-xs text-gray-500'>
              <span className='flex items-center gap-1.5'>
                <span className='w-2.5 h-2.5 rounded-full bg-amber-400 inline-block' />
                Donation
              </span>
              <span className='flex items-center gap-1.5'>
                <span className='w-2.5 h-2.5 rounded-full bg-red-500 inline-block' />
                Webshop
              </span>
              <span className='flex items-center gap-1.5'>
                <span className='w-2.5 h-2.5 rounded-full bg-lime-400 inline-block' />
                Consultant
              </span>
            </div>
            <select
              value={period}
              onChange={(e) => setPeriod(e.target.value)}
              className='text-sm border border-gray-200 rounded-lg px-3 py-1.5 text-gray-600 bg-white focus:outline-none focus:ring-2 focus:ring-orange-300'
            >
              <option>This year</option>
              <option>Last year</option>
              <option>Last 6 months</option>
            </select>
          </div>
        </div>
        <div className='h-80 sm:h-96'>
          <ResponsiveContainer width='100%' height='100%'>
            <AreaChart
              data={revenueData}
              margin={{ top: 10, right: 10, left: 10, bottom: 0 }}
            >
              <defs>
                <linearGradient id='colorDonation' x1='0' y1='0' x2='0' y2='1'>
                  <stop offset='5%' stopColor='#f59e0b' stopOpacity={0.4} />
                  <stop offset='95%' stopColor='#f59e0b' stopOpacity={0.05} />
                </linearGradient>
                <linearGradient id='colorWebshop' x1='0' y1='0' x2='0' y2='1'>
                  <stop offset='5%' stopColor='#ef4444' stopOpacity={0.4} />
                  <stop offset='95%' stopColor='#ef4444' stopOpacity={0.05} />
                </linearGradient>
                <linearGradient
                  id='colorConsultant'
                  x1='0'
                  y1='0'
                  x2='0'
                  y2='1'
                >
                  <stop offset='5%' stopColor='#a3e635' stopOpacity={0.5} />
                  <stop offset='95%' stopColor='#a3e635' stopOpacity={0.05} />
                </linearGradient>
              </defs>
              <CartesianGrid
                strokeDasharray='3 3'
                stroke='#f3f4f6'
                vertical={false}
              />
              <XAxis
                dataKey='month'
                tick={{ fontSize: 12, fill: '#9ca3af' }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                tickFormatter={formatYAxis}
                tick={{ fontSize: 12, fill: '#9ca3af' }}
                axisLine={false}
                tickLine={false}
                width={55}
              />
              <Tooltip
                formatter={(value) => [`€${value.toLocaleString()}`, undefined]}
                contentStyle={{
                  borderRadius: '8px',
                  border: '1px solid #e5e7eb',
                  fontSize: '12px',
                }}
              />
              <Area
                type='monotone'
                dataKey='donation'
                stroke='#f59e0b'
                strokeWidth={2}
                fill='url(#colorDonation)'
                name='Donation'
              />
              <Area
                type='monotone'
                dataKey='webshop'
                stroke='#ef4444'
                strokeWidth={2}
                fill='url(#colorWebshop)'
                name='Webshop'
              />
              <Area
                type='monotone'
                dataKey='consultant'
                stroke='#a3e635'
                strokeWidth={2}
                fill='url(#colorConsultant)'
                name='Consultant'
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
