
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import toast from 'react-hot-toast';
import {
  selectUser,
  logoutUser,
  selectUserRole,
} from '../../store/slices/authSlice';
import {
  LogOut,
  X,
  ChevronsRight,
  ChevronsLeft,
  ChevronRight,
} from 'lucide-react';


const NAV_BASE =
  'group flex items-center gap-3 rounded-lg border text-base font-medium transition-all duration-200 pl-3.25 pr-3 py-2.5 hover:-translate-y-0.5';


const getNavClass = (isActive, activeColor, inactiveColor) =>
  `${NAV_BASE} ${isActive
    ? `${activeColor}`
    : `text-gray-700 border-gray-100 ${inactiveColor}`
  }`;

const CommonSidebar = ({
  role = 'user',
  navItems = [],
  logoSrc = '/logo.webp',
  onClose,
  onDesktopClose,
  isCollapsed,
  onExpand,
  onAutoCollapse,
}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const user = useSelector(selectUser);
  const userRole = useSelector(selectUserRole);
  const logoDest = '/';

  // Get the actual role from Redux or prop
  const actualRole = role || (userRole ? userRole.toLowerCase() : 'user');

  // Role-based configuration
  const roleConfig = {
    user: {
      dashboardLabel: 'User Dashboard',
      bgGradient: 'from-purple-50 to-purple-100/50',
      borderColor: 'border-purple-100',
      bgCard: 'bg-purple-200',
      textCard: 'text-purple-700',
      activeNav:
        'bg-purple-100 text-purple-700 border-transparent shadow-[inset_3px_0_0_0_#7e22ce]',
      hoverNav:
        'hover:bg-purple-50/40 hover:text-gray-900 hover:border-purple-100',
      activeIcon: 'bg-purple-100 text-purple-600',
      hoverIcon: 'hover:bg-purple-50/40',
      collapseHover: 'hover:bg-purple-50/40',
      arrowColor: 'text-purple-500 drop-shadow-[0_0_6px_#a855f7]',
      avatarBg: 'from-purple-400 to-purple-600',
      avatarInitial: user?.name?.[0]?.toUpperCase() || 'U',
    },
    consultant: {
      dashboardLabel: 'Consultant Dashboard',
      bgGradient: 'from-yellow-50 to-yellow-100/50',
      borderColor: 'border-yellow-100',
      bgCard: 'bg-yellow-200',
      textCard: 'text-yellow-700',
      activeNav:
        'bg-yellow-100 text-yellow-700 border-transparent shadow-[inset_3px_0_0_0_#EAB308]',
      hoverNav:
        'hover:bg-yellow-50/40 hover:text-gray-900 hover:border-yellow-100',
      activeIcon: 'bg-yellow-100 text-yellow-600',
      hoverIcon: 'hover:bg-yellow-50/40',
      collapseHover: 'hover:bg-yellow-50/40',
      arrowColor: 'text-yellow-500 drop-shadow-[0_0_6px_#eab308]',
      avatarBg: 'from-yellow-400 to-yellow-600',
      avatarInitial: user?.name?.[0]?.toUpperCase() || 'C',
    },
    admin: {
      dashboardLabel: 'Admin Dashboard',
      bgGradient: 'from-orange-50 to-orange-100/50',
      borderColor: 'border-orange-100',
      bgCard: 'bg-gray-50',
      textCard: 'text-gray-900',
      activeNav:
        'bg-orange-100 text-orange-700 border-transparent shadow-[inset_3px_0_0_0_#ea580c]',
      hoverNav:
        'hover:bg-orange-50/40 hover:text-gray-900 hover:border-orange-100',
      activeIcon: 'bg-orange-100 text-orange-600',
      hoverIcon: 'hover:bg-orange-50/40',
      collapseHover: 'hover:bg-orange-50/40',
      arrowColor: 'text-orange-500 drop-shadow-[0_0_6px_#f97316]',
      avatarBg: 'from-orange-400 to-orange-600',
      avatarInitial: 'A',
    },
  };

  const config = roleConfig[actualRole] || roleConfig.user;
  const useStructuredNav = actualRole === 'admin' || actualRole === 'consultant';

  const handleLogout = async () => {
    try {
      const loadingToast = toast.loading('Logging out...');

      await dispatch(logoutUser()).unwrap();

      toast.dismiss(loadingToast);
      toast.success('Signed out successfully');

      navigate('/login', { replace: true });
    } catch (error) {
      console.error('Logout error:', error);
      toast.error('Failed to logout. Please try again.');

      localStorage.removeItem('token');
      localStorage.removeItem('refreshToken');
      localStorage.removeItem('user');
      localStorage.removeItem('auth');

      navigate('/login', { replace: true });
    }
  };

  // Collapsed view
  if (isCollapsed) {
    return (
      <div className='h-full w-full bg-white flex flex-col items-center border-r border-gray-100 py-3 gap-1'>
        <button
          type='button'
          onClick={onExpand}
          title={t('dashboard.sidebar.expandSidebar')}
          aria-label={t('dashboard.sidebar.expandSidebar')}
          className={`w-10 h-10 flex items-center justify-center rounded-lg text-gray-500 hover:text-gray-800 transition-colors duration-200 mb-2 shrink-0 ${config.collapseHover}`}
        >
          <ChevronsRight size={20} aria-hidden='true' />
        </button>

        <nav
          className='flex-1 flex flex-col items-center gap-1 w-full px-2 overflow-y-auto'
          aria-label='Main navigation'
        >
          {navItems.map(({ name, path, icon: Icon }) => (
            <NavLink
              key={path}
              to={path}
              end={path === navItems[0]?.path}
              title={name}
              onClick={onClose}
              className={({ isActive }) =>
                `w-10 h-10 flex items-center justify-center rounded-lg transition-colors duration-200 ${isActive
                  ? config.activeIcon
                  : `text-gray-400 hover:text-gray-900 ${config.hoverIcon}`
                }`
              }
            >
              <Icon size={20} aria-hidden='true' />
            </NavLink>
          ))}
        </nav>

        <button
          type='button'
          onClick={handleLogout}
          title={t('common.signOut')}
          aria-label={t('common.signOut')}
          className='mt-1 w-10 h-10 flex items-center justify-center rounded-lg text-gray-400 hover:text-red-500 hover:bg-red-50 transition-colors duration-200 shrink-0'
        >
          <LogOut size={20} aria-hidden='true' />
        </button>
      </div>
    );
  }

  // Expanded view
  return (
    <div className='h-full w-full bg-white flex flex-col border-r border-gray-100'>
      {/* Header */}
      <div
        className={`flex items-center justify-between px-5 py-4 border-b border-gray-100 shrink-0`}
      >
        <Link
          to={logoDest}
          title={t('dashboard.sidebar.goToDashboard')}
          className='flex-1 flex justify-center items-center'
        >
          <img
            src={logoSrc}
            alt='Logo'
            width={160}
            height={60}
            fetchpriority='high'
            className='h-14 w-auto object-contain mx-auto'
            onError={(e) => {
              e.currentTarget.style.display = 'none';
            }}
          />
        </Link>
        <div className='flex items-center gap-1 shrink-0'>
          <button
            type='button'
            onClick={onClose}
            className='lg:hidden p-1.5 rounded-md text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors'
            aria-label={t('dashboard.sidebar.closeNavigation')}
          >
            <X size={20} aria-hidden='true' />
          </button>
          <button
            type='button'
            onClick={onDesktopClose}
            className={`hidden lg:flex items-center justify-center p-1.5 rounded-md text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors cursor-pointer`}
            aria-label={t('dashboard.sidebar.collapseSidebar')}
          >
            <ChevronsLeft size={20} aria-hidden='true' />
          </button>
        </div>
      </div>

      {/* User Profile - user only */}
      {user && actualRole === 'user' && !useStructuredNav && (
        <div
          className={`flex items-center gap-3 px-5 py-4 bg-linear-to-br ${config.bgGradient} ${config.borderColor}`}
        >
          <div
            className={`w-10 h-10 rounded-full bg-linear-to-br ${config.avatarBg} flex items-center justify-center font-semibold shrink-0 text-white`}
          >
            {config.avatarInitial}
          </div>
          <div className='overflow-hidden'>
            <p className='text-sm font-semibold text-gray-900 truncate'>
              {user.name || 'User'}
            </p>
            <p className='text-xs text-gray-500 truncate'>{user.email}</p>
          </div>
        </div>
      )}

      {/* Navigation - User */}
      {actualRole === 'user' && !useStructuredNav && (
        <nav
          className='flex-1 px-4 py-4 space-y-1.5 overflow-y-auto'
          aria-label='Main navigation'
        >
          {navItems.map(({ name, path, icon: Icon }) => (
            <NavLink
              key={path}
              to={path}
              end={path === navItems[0]?.path}
              onClick={onClose}
              className={({ isActive }) =>
                getNavClass(isActive, config.activeNav, config.hoverNav)
              }
            >
              <Icon size={20} className='shrink-0' aria-hidden='true' />
              <span>{name}</span>
            </NavLink>
          ))}
        </nav>
      )}

      {/* Navigation - Admin & Consultant */}
      {useStructuredNav && (
        <nav
          className='flex-1 overflow-y-auto px-0 py-4'
          aria-label='Main navigation'
        >
          {actualRole === 'admin' && (
            <p className='px-5 mb-2 text-xs font-semibold text-gray-400 uppercase tracking-widest'>
              {t('dashboard.sidebar.mainMenu')}
            </p>
          )}
          <ul className='divide-y divide-gray-100' role='list'>
            {navItems.map(({ name, path, icon: Icon, autoCollapse }) => (
              <li key={path}>
                <NavLink
                  to={path}
                  end={path === navItems[0]?.path}
                  onClick={() => {
                    onClose();
                    if (autoCollapse && onAutoCollapse) onAutoCollapse();
                  }}
                  className={({ isActive }) =>
                    `group flex items-center gap-3 px-5 py-3 text-base font-medium transition-colors duration-150 ${isActive
                      ? actualRole === 'consultant'
                        ? 'bg-yellow-50 text-yellow-700 border-l-4 border-yellow-500'
                        : 'bg-orange-50 text-orange-600 border-l-4 border-orange-500'
                      : 'text-gray-600 border-l-4 border-transparent hover:bg-gray-50 hover:text-gray-900'
                    }`
                  }
                >
                  {({ isActive }) => (
                    <>
                      <Icon
                        size={18}
                        aria-hidden='true'
                        className={`shrink-0 transition-colors ${isActive
                          ? actualRole === 'consultant'
                            ? 'text-yellow-600'
                            : 'text-orange-500'
                          : 'text-gray-400 group-hover:text-gray-500'
                          }`}
                      />
                      <span className='flex-1 truncate'>{name}</span>
                      {isActive && (
                        <ChevronRight
                          size={16}
                          aria-hidden='true'
                          className={`shrink-0 animate-nav-arrow ${actualRole === 'consultant'
                            ? 'text-yellow-500'
                            : 'text-orange-400'
                            }`}
                        />
                      )}
                    </>
                  )}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      )}

      {/* Logout Button */}
      <div className={`border-t border-gray-100 shrink-0`}>
        <div className='px-5 py-3'>
          <button
            type='button'
            onClick={handleLogout}
            className='flex w-full items-center gap-3 px-0 py-2 text-base font-medium text-gray-500 transition-colors duration-200 hover:text-red-600'
          >
            <LogOut size={18} aria-hidden='true' />
            <span>{t('common.signOut')}</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default CommonSidebar;