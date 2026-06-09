export const toDisplayStatus = (raw = '') => {
  switch (raw?.toUpperCase()) {
    case 'ONLINE': return 'Available Now';
    case 'BUSY': return 'Busy';
    default: return 'Offline';
  }
};

export const getStatusBadgeStyle = (display) => {
  switch (display) {
    case 'Available Now': return 'bg-green-500/90';
    case 'Busy': return 'bg-yellow-500/90';
    default: return 'bg-gray-400/80';
  }
};

export const getStatusStyle = (display) => {
  switch (display) {
    case 'Online': return 'bg-[#05BC27] text-white';
    case 'Busy': return 'bg-[#E2AB0B] text-white';
    default: return 'bg-gray-100 text-gray-500';
  }
};