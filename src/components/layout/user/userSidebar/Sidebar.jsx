import { useTranslation } from 'react-i18next';
import CommonSidebar from '../../CommonSidebar';
import { ROUTES } from '../../../../config';
import {
  LayoutDashboard,
  CalendarDays,
  MessageCircle,
  User,
  Package,
} from 'lucide-react';

const Sidebar = ({
  onClose,
  onDesktopClose,
  onAutoCollapse,
  isCollapsed,
  onExpand,
}) => {
  const { t } = useTranslation();

  const NAV_ITEMS = [
    {
      name: t('dashboard.user.sidebar.dashboard'),
      path: ROUTES.USER_DASHBOARD,
      icon: LayoutDashboard,
    },
    {
      name: t('dashboard.user.sidebar.bookedSchedule'),
      path: ROUTES.USER_BOOKED_SCHEDULE,
      icon: CalendarDays,
    },
    { name: t('dashboard.user.sidebar.chat'), path: ROUTES.USER_CHAT, icon: MessageCircle },
    { name: t('dashboard.user.sidebar.orders'), path: ROUTES.USER_ORDERS, icon: Package },
    { name: t('dashboard.user.sidebar.profile'), path: ROUTES.USER_PROFILE, icon: User },
  ];

  return (
    <CommonSidebar
      role='user'
      navItems={NAV_ITEMS}
      logoSrc='/logo1.webp'
      onClose={onClose}
      onDesktopClose={onDesktopClose}
      onAutoCollapse={onAutoCollapse}
      isCollapsed={isCollapsed}
      onExpand={onExpand}
    />
  );
};

export default Sidebar;
