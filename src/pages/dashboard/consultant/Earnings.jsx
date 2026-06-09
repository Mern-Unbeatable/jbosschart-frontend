import React, { memo, useState, useCallback, useMemo } from 'react';
import { Euro, ChevronDown } from 'lucide-react';

// --- Constants ---

const STAT_CARDS = [
  { id: 'today', label: "Today's Income", value: '€234.50' },
  { id: 'revenue', label: 'Total Revenue', value: '€1215.00' },
  { id: 'withdraw', label: 'Withdraw', value: '€1215.00' },
  { id: 'balance', label: 'Available Balance', value: '€5637.50' },
];

const Y_MAX = 253;
const Y_LABELS = [253, 190, 127, 63, 0];
const MONTHS = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
];

const PERIOD_OPTIONS = [
  { value: 'this_year', label: 'This year' },
  { value: 'last_year', label: 'Last year' },
  { value: 'last_6_months', label: 'Last 6 months' },
];

// Monthly earnings data ($) per period — approximated from Figma design
const EARNINGS_DATA = {
  this_year: [80, 73, 128, 90, 87, 87, 95, 145, 175, 145, 120, 115],
  last_year: [65, 78, 108, 95, 88, 100, 115, 138, 158, 130, 112, 100],
  last_6_months: [0, 0, 0, 0, 0, 0, 95, 145, 175, 145, 120, 115],
};

const CHART_W = 1000;
const CHART_H = 300;
const GRADIENT_ID = 'consultantEarningsGradient';

// --- Helpers ---

function buildSvgPaths(values, w, h, maxVal) {
  if (!values?.length) return { line: '', area: '' };
  const step = w / (values.length - 1);
  const pts = values.map((v, i) => ({
    x: i * step,
    y: h - (v / maxVal) * h,
  }));

  let line = `M ${pts[0].x.toFixed(2)} ${pts[0].y.toFixed(2)}`;
  for (let i = 1; i < pts.length; i++) {
    const cx = ((pts[i - 1].x + pts[i].x) / 2).toFixed(2);
    line += ` C ${cx} ${pts[i - 1].y.toFixed(2)} ${cx} ${pts[i].y.toFixed(2)} ${pts[i].x.toFixed(2)} ${pts[i].y.toFixed(2)}`;
  }

  const lastX = pts[pts.length - 1].x.toFixed(2);
  const area = `${line} L ${lastX} ${h} L 0 ${h} Z`;
  return { line, area };
}

// --- Sub-components ---

const StatCard = memo(({ label, value }) => (
  <div className='bg-white border border-gray-100 rounded-2xl p-5 sm:p-6 flex flex-col gap-4 sm:gap-5 h-full'>
    <div className='bg-[#e9f9ef] w-10 h-10 rounded-lg flex items-center justify-center shrink-0'>
      <Euro size={20} className='text-green-600' />
    </div>
    <div className='flex flex-col gap-2'>
      <span className='text-[#0c0c0c] text-[30px] sm:text-3xl font-semibold leading-tight'>
        {value}
      </span>
      <span className='text-[#373737] text-sm'>{label}</span>
    </div>
  </div>
));

StatCard.displayName = 'StatCard';

// --- Main component ---

const ConsultantEarnings = memo(() => {
  const [period, setPeriod] = useState('this_year');

  const handlePeriodChange = useCallback((e) => {
    setPeriod(e.target.value);
  }, []);

  const { line, area } = useMemo(
    () =>
      buildSvgPaths(
        EARNINGS_DATA[period] ?? EARNINGS_DATA.this_year,
        CHART_W,
        CHART_H,
        Y_MAX,
      ),
    [period],
  );

  return (
    <div className='flex flex-col gap-9'>
      {/* Page header */}
      <div className='flex flex-col gap-2'>
        <h1 className='dashboard-page-title'>Earnings</h1>
        <p className='dashboard-page-subtitle'>
          Track your income and revenue breakdown
        </p>
      </div>

      {/* Stat cards */}
      <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4'>
        {STAT_CARDS.map((card) => (
          <StatCard key={card.id} label={card.label} value={card.value} />
        ))}
      </div>

      {/* Earnings Over Time chart */}
      <div className='bg-white border border-gray-100 rounded-lg overflow-hidden'>
        {/* Chart header */}
        <div className='flex flex-col gap-3 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6'>
          <div className='flex flex-col gap-1'>
            <h3 className='text-[#191b1c] text-xl font-medium'>
              Earnings Over Time
            </h3>
            <p className='text-[#464646] text-sm'>
              Net earnings after platform fees
            </p>
          </div>

          {/* Period selector */}
          <div className='relative w-fit'>
            <select
              value={period}
              onChange={handlePeriodChange}
              className='appearance-none bg-[#f5f6f7] text-[#4a5154] text-sm pl-3 pr-8 py-1.5 rounded cursor-pointer focus:outline-none focus:ring-2 focus:ring-yellow-400'
            >
              {PERIOD_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
            <ChevronDown
              size={14}
              className='absolute right-2 top-1/2 -translate-y-1/2 text-[#4a5154] pointer-events-none'
            />
          </div>
        </div>

        {/* Chart body */}
        <div className='px-3 pt-6 pb-4 sm:px-6 sm:pt-7 sm:pb-5'>
          <div className='flex items-start gap-2 sm:gap-3'>
            {/* Y-axis labels */}
            <div className='relative h-64 w-11 shrink-0 overflow-visible text-right text-sm text-[#717171] sm:h-72 sm:w-12'>
              {Y_LABELS.map((val) => {
                const yPercent = (1 - val / Y_MAX) * 100;

                return (
                  <span
                    key={val}
                    className='absolute right-0 -translate-y-1/2 leading-none'
                    style={{ top: `${yPercent}%` }}
                  >
                    ${val}
                  </span>
                );
              })}
            </div>

            {/* SVG chart + X-axis labels */}
            <div className='min-w-0 flex-1'>
              <div className='flex min-w-0 flex-col gap-2'>
                <svg
                  viewBox={`0 0 ${CHART_W} ${CHART_H}`}
                  className='h-64 w-full sm:h-72'
                  preserveAspectRatio='none'
                  aria-hidden='true'
                >
                  <defs>
                    <linearGradient
                      id={GRADIENT_ID}
                      x1='0'
                      y1='0'
                      x2='0'
                      y2='1'
                    >
                      <stop
                        offset='0%'
                        stopColor='#E2AB0B'
                        stopOpacity='0.35'
                      />
                      <stop offset='100%' stopColor='#E2AB0B' stopOpacity='0' />
                    </linearGradient>
                  </defs>

                  {/* Horizontal grid lines */}
                  {Y_LABELS.map((val) => {
                    const yPos = CHART_H - (val / Y_MAX) * CHART_H;
                    return (
                      <line
                        key={val}
                        x1='0'
                        y1={yPos}
                        x2={CHART_W}
                        y2={yPos}
                        stroke='#e5e7e8'
                        strokeWidth='1.5'
                      />
                    );
                  })}

                  {/* Area fill */}
                  <path d={area} fill={`url(#${GRADIENT_ID})`} />

                  {/* Line */}
                  <path
                    d={line}
                    fill='none'
                    stroke='#E2AB0B'
                    strokeWidth='2.5'
                    strokeLinejoin='round'
                    strokeLinecap='round'
                  />
                </svg>

                {/* X-axis labels */}
                <div className='flex justify-between text-sm text-[#616874]'>
                  {MONTHS.map((month) => (
                    <span key={month}>{month}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

ConsultantEarnings.displayName = 'ConsultantEarnings';

export default ConsultantEarnings;
