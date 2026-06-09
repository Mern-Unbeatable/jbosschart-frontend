import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { Menu, User } from 'lucide-react';
import Sidebar from './userSidebar/Sidebar';
import LanguageSelector from '../../LanguageSelector';
import ScrollToTop from '../../ScrollToTop';
import { ROUTES } from '../../../config';
import { selectUser } from '../../../store/slices/authSlice';

const Layout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [desktopOpen, setDesktopOpen] = useState(true);
  const location = useLocation();
  const user = useSelector(selectUser);
  const isChatPage = location.pathname === ROUTES.USER_CHAT;
  const userName = user?.name || 'User';
  const userRole = user?.role || 'User';

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'Escape') setSidebarOpen(false);
    };
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) setSidebarOpen(false);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    document.body.style.overflow = sidebarOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [sidebarOpen]);

  return (
    <div className='fixed inset-0 flex overflow-hidden bg-gray-50'>
      <ScrollToTop />
      <div
        className={`fixed inset-0 z-20 bg-black/40 backdrop-blur-sm lg:hidden transition-opacity duration-300 ${
          sidebarOpen
            ? 'opacity-100 pointer-events-auto'
            : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setSidebarOpen(false)}
        aria-hidden='true'
      />

      <aside
        id='sidebar'
        aria-label='Sidebar navigation'
        className={`
          fixed inset-y-0 left-0 z-30 w-72 transform transition-all duration-300 ease-in-out
          lg:relative lg:z-auto lg:shrink-0
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
          ${desktopOpen ? 'lg:translate-x-0 lg:w-72' : 'lg:translate-x-0 lg:w-16'}
        `}
      >
        <Sidebar
          onClose={() => setSidebarOpen(false)}
          onDesktopClose={() => setDesktopOpen(false)}
          onAutoCollapse={() => setDesktopOpen(false)}
          isCollapsed={!desktopOpen}
          onExpand={() => setDesktopOpen(true)}
        />
      </aside>

      <main className='flex-1 flex flex-col min-w-0 overflow-hidden'>
        <header className='hidden lg:flex h-22 shrink-0 items-center justify-between border-b border-gray-100 bg-white px-8 shadow-sm'>
          <div className='h-10 w-10' aria-hidden='true' />

          <div className='flex items-center gap-6'>
             <LanguageSelector />
            <div className='flex items-center gap-3'>
              <div className='flex h-12 w-12 items-center justify-center rounded-full border-2 border-[#E2AB0B] bg-purple-100'>
                <User size={24} className='text-[#6E35AE]' />
              </div>
              <div className='text-left'>
                <p className='text-base font-semibold text-[#0f172a]'>{userName}</p>
                <p className='text-base capitalize text-[#6b7280]'>{userRole}</p>
              </div>
            </div>
           
          </div>
        </header>

        <header className='lg:hidden shrink-0 border-b border-gray-100 bg-white px-4 shadow-sm'>
          <div className='flex h-15 items-center justify-between'>
            <button
              type='button'
              onClick={() => setSidebarOpen(true)}
              aria-expanded={sidebarOpen}
              aria-controls='sidebar'
              aria-label='Open navigation'
              className='inline-flex items-center justify-center rounded-md p-2 text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-800'
            >
              <Menu size={22} aria-hidden='true' />
            </button>

            <Link to={ROUTES.USER_DASHBOARD} className='flex items-center flex-1 justify-center'>
              <img
                src='/logo.webp'
                alt='Skyridge Group'
                className='h-10 w-auto object-contain'
              />
            </Link>

            <LanguageSelector />
          </div>
        </header>

        {/* Scrollable page area */}
        <div
          className={`flex-1 min-h-0 ${
            isChatPage ? 'overflow-hidden' : 'overflow-y-auto'
          }`}
          data-lenis-prevent
        >
          <div
            className={`w-full px-6 py-5 sm:px-8 sm:py-6 lg:px-10 lg:py-8 ${
              isChatPage ? 'h-full min-h-0' : ''
            }`}
          >
            <Outlet />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Layout;
