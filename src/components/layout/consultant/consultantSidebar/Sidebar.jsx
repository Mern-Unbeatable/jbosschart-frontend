import CommonSidebar from '../../CommonSidebar';
import { ROUTES } from '../../../../config';
import {
  LayoutDashboard,
  CalendarDays,
  History,
  MessageCircle,
  Ticket,
  Wallet,
  User,
  Euro,
} from 'lucide-react';

const NAV_ITEMS = [
  {
    name: 'Overview',
    path: ROUTES.CONSULTANT_DASHBOARD,
    icon: LayoutDashboard,
  },
  { name: 'Schedule', path: ROUTES.CONSULTANT_SCHEDULE, icon: CalendarDays },
  {
    name: 'Sessions History',
    path: ROUTES.CONSULTANT_SESSIONS_HISTORY,
    icon: History,
  },
  { name: 'Chat', path: ROUTES.CONSULTANT_CHAT, icon: MessageCircle },
 
  { name: 'Earnings', path: ROUTES.CONSULTANT_EARNINGS, icon: Euro },
  { name: 'Payout', path: ROUTES.CONSULTANT_PAYOUT, icon: Wallet },
   {
    name: 'Support Tickets',
    path: ROUTES.CONSULTANT_SUPPORT_TICKETS,
    icon: Ticket,
  },
  { name: 'Profile', path: ROUTES.CONSULTANT_PROFILE, icon: User },
];

const Sidebar = ({
  onClose,
  onDesktopClose,
  onAutoCollapse,
  isCollapsed,
  onExpand,
}) => {
  return (
    <CommonSidebar
      role='consultant'
      navItems={NAV_ITEMS}
      logoSrc='/logo1.webp'
      onClose={onClose}
      onDesktopClose={onDesktopClose}
      isCollapsed={isCollapsed}
      onExpand={onExpand}
      onAutoCollapse={onAutoCollapse}
    />
  );
};

export default Sidebar;
