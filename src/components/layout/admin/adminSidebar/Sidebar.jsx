import CommonSidebar from '../../CommonSidebar';
import { ROUTES } from '../../../../config';
import {
  LayoutDashboard,
  Users,
  User,
  ShoppingBag,
  Package,
  Heart,
  PlusCircle,
  RefreshCw,
  Euro,
  FileText,
  Settings,
  UserCircle,
  HelpCircle,
} from 'lucide-react';

const NAV_ITEMS = [
  { name: 'Dashboard', path: ROUTES.ADMIN_DASHBOARD, icon: LayoutDashboard },
  { name: 'Consultants', path: ROUTES.ADMIN_CONSULTANTS, icon: Users },
  { name: 'User', path: ROUTES.ADMIN_USERS, icon: User },
  { name: 'Webshop', path: ROUTES.ADMIN_WEBSHOP, icon: ShoppingBag },
  { name: 'Order', path: ROUTES.ADMIN_ORDERS, icon: Package },
  { name: 'Donation', path: ROUTES.ADMIN_DONATION, icon: Heart },
  { name: 'Adds Management', path: ROUTES.ADMIN_ADS, icon: PlusCircle },
  { name: 'Session', path: ROUTES.ADMIN_SESSION, icon: RefreshCw },
  { name: 'Payout', path: ROUTES.ADMIN_PAYOUT, icon: Euro },
  { name: 'Blog', path: ROUTES.ADMIN_BLOG, icon: FileText },
  { name: 'FAQ', path: ROUTES.ADMIN_FAQ, icon: HelpCircle },
  { name: 'Setting', path: ROUTES.ADMIN_SETTINGS, icon: Settings },
  { name: 'Profile', path: ROUTES.ADMIN_PROFILE, icon: UserCircle },
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
      role='admin'
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
