import React, { lazy, Suspense } from 'react';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  Navigate,
  useLocation,
} from 'react-router-dom';
import { useSelector } from 'react-redux';
import Layout from '../components/Layout';
import AdminLayout from '../components/layout/admin/Layout';
import UserLayout from '../components/layout/user/Layout';
import ConsultantLayout from '../components/layout/consultant/Layout';
import { ROUTES } from '../config';
import {
  selectIsAuthenticated,
  selectUserRole,
} from '../store/slices/authSlice';

// Role to dashboard path mapping - UPPERCASE keys
const dashboardMap = {
  ADMIN: ROUTES.ADMIN_DASHBOARD,
  USER: ROUTES.USER_DASHBOARD,
  CONSULTANT: ROUTES.CONSULTANT_DASHBOARD,
};

// Derive a relative segment from an absolute admin route path
const seg = (route) => route.replace(`${ROUTES.ADMIN}/`, '');

// Lazy imports (your existing imports remain the same)
const Home = lazy(() => import('../pages/home/Home'));
const About = lazy(() => import('../pages/About'));
const Entrepreneurship = lazy(() => import('../pages/entrepreneurship/Entrepreneurship'));
const Community = lazy(() => import('../pages/community/Community'));
const Services = lazy(() => import('../pages/Services'));
const Consultants = lazy(() => import('../pages/consultants/Consultants'));
const ConsultantDetail = lazy(() => import('../pages/consultants/ConsultantDetail'));
const ConsultantChatPage = lazy(() => import('../pages/consultants/UserChatPage'));
const Credit = lazy(() => import('../pages/credit/Credit'));
const Webshop = lazy(() => import('../pages/webshop/Webshop'));
const ProductDetail = lazy(() => import('../pages/webshop/ProductDetail'));
const Checkout = lazy(() => import('../pages/webshop/Checkout'));
const Donation = lazy(() => import('../pages/donation/Donation'));
const BlogPage = lazy(() => import('../pages/blog/Blog'));
const FaqPage = lazy(() => import('../pages/FAQ'));
const BlogDetail = lazy(() => import('../pages/blog/BlogDetail'));
const Login = lazy(() => import('../pages/Login'));
const Register = lazy(() => import('../pages/auth/regester/Regester'));

// Admin pages
const Dashboard = lazy(() => import('../pages/dashboard/admin/Dashboard'));
const Emails = lazy(() => import('../pages/dashboard/admin/Emails'));
const Leads = lazy(() => import('../pages/dashboard/admin/Leads'));
const Orders = lazy(() => import('../pages/dashboard/admin/Orders'));
const MarketplaceOrders = lazy(() => import('../pages/dashboard/admin/MarketplaceOrders'));
const CaseStudies = lazy(() => import('../pages/dashboard/admin/CaseStudies'));
const Blog = lazy(() => import('../pages/dashboard/admin/Blog'));
const Jobs = lazy(() => import('../pages/dashboard/admin/Jobs'));
const Pricing = lazy(() => import('../pages/dashboard/admin/Pricing'));
const AdminConsultants = lazy(() => import('../pages/dashboard/admin/Consultants'));
const AdminUsers = lazy(() => import('../pages/dashboard/admin/Users'));
const AdminWebshop = lazy(() => import('../pages/dashboard/admin/Webshop'));
const AdminAddNewProduct = lazy(() => import('../pages/dashboard/admin/AddNewProduct'));
const AdminProductView = lazy(() => import('../pages/dashboard/admin/ProductView'));
const AdminDonation = lazy(() => import('../pages/dashboard/admin/Donation'));
const AdminAds = lazy(() => import('../pages/dashboard/admin/AdsManagement'));
const AdminAdsPublished = lazy(() => import('../pages/dashboard/admin/PublishedAds'));
const AdminSession = lazy(() => import('../pages/dashboard/admin/Session'));
const AdminPayout = lazy(() => import('../pages/dashboard/admin/Payout'));
const AdminSettings = lazy(() => import('../pages/dashboard/admin/Settings'));
const AdminProfile = lazy(() => import('../pages/dashboard/admin/Profile'));
const AdminFaq = lazy(() => import('../pages/dashboard/admin/Faq'));

// User pages
const UserDashboard = lazy(() => import('../pages/dashboard/user/Dashboard'));
const UserBookedSchedule = lazy(() => import('../pages/dashboard/user/BookedSchedule'));
const UserChat = lazy(() => import('../pages/dashboard/user/Chat'));
const UserProfile = lazy(() => import('../pages/dashboard/user/Profile'));
const UserOrders = lazy(() => import('../pages/dashboard/user/Orders'));
const UserSettings = lazy(() => import('../pages/dashboard/user/Settings'));

// Consultant pages
const ConsultantDashboard = lazy(() => import('../pages/dashboard/consultant/Dashboard'));
const ConsultantSchedule = lazy(() => import('../pages/dashboard/consultant/Schedule'));
const ConsultantSessionsHistory = lazy(() => import('../pages/dashboard/consultant/SessionsHistory'));
const UserChatPage = lazy(() => import('../pages/dashboard/consultant/Chat'));
const ConsultantProfile = lazy(() => import('../pages/dashboard/consultant/Profile'));
const ConsultantSupportTickets = lazy(() => import('../pages/dashboard/consultant/SupportTickets'));
const ConsultantBookings = lazy(() => import('../pages/dashboard/consultant/Bookings'));
const ConsultantEarnings = lazy(() => import('../pages/dashboard/consultant/Earnings'));
const ConsultantPayout = lazy(() => import('../pages/dashboard/consultant/Payout'));
const ConsultantSettings = lazy(() => import('../pages/dashboard/consultant/Settings'));

const PageLoader = () => (
  <div className='flex items-center justify-center min-h-screen'>
    <div className='w-8 h-8 border-4 border-orange-500 border-t-transparent rounded-full animate-spin' />
  </div>
);

const NotFound = () => (
  <div className='flex flex-col items-center justify-center min-h-screen gap-4 text-center px-4'>
    <h1 className='text-6xl font-bold text-gray-800'>404</h1>
    <p className='text-xl text-gray-500'>Page not found</p>
    <a href={ROUTES.HOME} className='mt-2 text-blue-600 hover:underline text-sm font-medium'>
      Back to Home
    </a>
  </div>
);

// Redirect already-authenticated users away from login to their dashboard
const GuestOnlyRoute = ({ children }) => {
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const userRole = useSelector(selectUserRole);

  if (isAuthenticated) {
    const redirectPath = dashboardMap[userRole] || ROUTES.HOME;
    return <Navigate to={redirectPath} replace />;
  }
  return children;
};

const ProtectedRoute = ({ children }) => {
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const location = useLocation();
  if (!isAuthenticated) {
    return <Navigate to={ROUTES.LOGIN} state={{ from: location }} replace />;
  }
  return children;
};

// Updated RoleBasedRoute with UPPERCASE roles
const RoleBasedRoute = ({ children, allowedRoles }) => {
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const userRole = useSelector(selectUserRole);
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to={ROUTES.LOGIN} state={{ from: location }} replace />;
  }

  if (!allowedRoles.includes(userRole)) {
    const redirectPath = dashboardMap[userRole] || ROUTES.HOME;
    return <Navigate to={redirectPath} replace />;
  }

  return children;
};

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      {/* Public routes */}
      <Route
        element={
          <Suspense fallback={<PageLoader />}>
            <Layout />
          </Suspense>
        }
      >
        <Route path={ROUTES.HOME} element={<Home />} />
        <Route path={ROUTES.CONSULTANTS} element={<Consultants />} />
        <Route path={ROUTES.ENTREPRENEURSHIP} element={<Entrepreneurship />} />
        <Route path={ROUTES.CONSULTANT_DETAIL} element={<ConsultantDetail />} />
        <Route path={ROUTES.CONSULTANT_DETAIL_CHAT} element={<ConsultantChatPage />} />
        <Route path={ROUTES.CREDIT} element={<Credit />} />
        <Route path={ROUTES.WEBSHOP} element={<Webshop />} />
        <Route path={ROUTES.PRODUCT_DETAIL} element={<ProductDetail />} />
        <Route path={ROUTES.CHECKOUT} element={<Checkout />} />
        <Route path={ROUTES.DONATION} element={<Donation />} />
        <Route path={ROUTES.BLOG} element={<BlogPage />} />
        <Route path={ROUTES.FAQ} element={<FaqPage />} />
        <Route path={ROUTES.BLOG_DETAIL} element={<BlogDetail />} />
        <Route path={ROUTES.ABOUT} element={<About />} />
        <Route path={ROUTES.SERVICES} element={<Services />} />
        <Route path={ROUTES.COMMUNITY} element={<Community />} />
      </Route>

      {/* Auth routes */}
      <Route
        path={ROUTES.LOGIN}
        element={
          <Suspense fallback={<PageLoader />}>
            <GuestOnlyRoute>
              <Login />
            </GuestOnlyRoute>
          </Suspense>
        }
      />
      <Route
        path={ROUTES.REGISTER}
        element={
          <Suspense fallback={<PageLoader />}>
            <GuestOnlyRoute>
              <Register />
            </GuestOnlyRoute>
          </Suspense>
        }
      />

      {/* Admin routes - UPPERCASE */}
      <Route
        path={ROUTES.ADMIN}
        element={
          <Suspense fallback={<PageLoader />}>
            <RoleBasedRoute allowedRoles={['ADMIN']}>
              <AdminLayout />
            </RoleBasedRoute>
          </Suspense>
        }
      >
        <Route index element={<Navigate to={ROUTES.ADMIN_DASHBOARD} replace />} />
        <Route path={seg(ROUTES.ADMIN_DASHBOARD)} element={<Dashboard />} />
        <Route path={seg(ROUTES.ADMIN_EMAILS)} element={<Emails />} />
        <Route path={seg(ROUTES.ADMIN_LEADS)} element={<Leads />} />
        <Route path={seg(ROUTES.ADMIN_ORDERS)} element={<Orders />} />
        <Route path={seg(ROUTES.ADMIN_MARKETPLACE_ORDERS)} element={<MarketplaceOrders />} />
        <Route path={seg(ROUTES.ADMIN_CASE_STUDIES)} element={<CaseStudies />} />
        <Route path={seg(ROUTES.ADMIN_BLOG)} element={<Blog />} />
        <Route path={seg(ROUTES.ADMIN_JOBS)} element={<Jobs />} />
        <Route path={seg(ROUTES.ADMIN_PRICING)} element={<Pricing />} />
        <Route path={seg(ROUTES.ADMIN_CONSULTANTS)} element={<AdminConsultants />} />
        <Route path={seg(ROUTES.ADMIN_USERS)} element={<AdminUsers />} />
        <Route path={seg(ROUTES.ADMIN_WEBSHOP)} element={<AdminWebshop />} />
        <Route path={seg(ROUTES.ADMIN_WEBSHOP_ADD_PRODUCT)} element={<AdminAddNewProduct />} />
        <Route path={seg(ROUTES.ADMIN_WEBSHOP_PRODUCT_VIEW)} element={<AdminProductView />} />
        <Route path={seg(ROUTES.ADMIN_DONATION)} element={<AdminDonation />} />
        <Route path={seg(ROUTES.ADMIN_ADS)} element={<AdminAds />} />
        <Route path={seg(ROUTES.ADMIN_ADS_PUBLISHED)} element={<AdminAdsPublished />} />
        <Route path={seg(ROUTES.ADMIN_SESSION)} element={<AdminSession />} />
        <Route path={seg(ROUTES.ADMIN_PAYOUT)} element={<AdminPayout />} />
        <Route path={seg(ROUTES.ADMIN_SETTINGS)} element={<AdminSettings />} />
        <Route path={seg(ROUTES.ADMIN_PROFILE)} element={<AdminProfile />} />
        <Route path={seg(ROUTES.ADMIN_FAQ)} element={<AdminFaq />} />
      </Route>

      {/* User routes - UPPERCASE */}
      <Route
        path={ROUTES.USER}
        element={
          <Suspense fallback={<PageLoader />}>
            <RoleBasedRoute allowedRoles={['USER']}>
              <UserLayout />
            </RoleBasedRoute>
          </Suspense>
        }
      >

        <Route path={seg(ROUTES.USER_DASHBOARD)} element={<UserDashboard />} />
        <Route path={seg(ROUTES.USER_BOOKED_SCHEDULE)} element={<UserBookedSchedule />} />
        <Route path={seg(ROUTES.USER_CHAT)} element={<UserChat />} />
        <Route path={seg(ROUTES.USER_PROFILE)} element={<UserProfile />} />
        <Route path={seg(ROUTES.USER_ORDERS)} element={<UserOrders />} />
        <Route path={seg(ROUTES.USER_SETTINGS)} element={<UserSettings />} />
      </Route>

      {/* Consultant routes - UPPERCASE */}
      <Route
        path={ROUTES.CONSULTANT}
        element={
          <Suspense fallback={<PageLoader />}>
            <RoleBasedRoute allowedRoles={['CONSULTANT']}>
              <ConsultantLayout />
            </RoleBasedRoute>
          </Suspense>
        }
      >
        <Route path={seg(ROUTES.CONSULTANT_DASHBOARD)} element={<ConsultantDashboard />} />
        <Route path={seg(ROUTES.CONSULTANT_SCHEDULE)} element={<ConsultantSchedule />} />
        <Route path={seg(ROUTES.CONSULTANT_SESSIONS_HISTORY)} element={<ConsultantSessionsHistory />} />
        <Route path={seg(ROUTES.CONSULTANT_CHAT)} element={<UserChatPage />} />
        <Route path={seg(ROUTES.CONSULTANT_SUPPORT_TICKETS)} element={<ConsultantSupportTickets />} />
        <Route path={seg(ROUTES.CONSULTANT_PROFILE)} element={<ConsultantProfile />} />
        <Route path={seg(ROUTES.CONSULTANT_BOOKINGS)} element={<ConsultantBookings />} />
        <Route path={seg(ROUTES.CONSULTANT_EARNINGS)} element={<ConsultantEarnings />} />
        <Route path={seg(ROUTES.CONSULTANT_PAYOUT)} element={<ConsultantPayout />} />
        <Route path={seg(ROUTES.CONSULTANT_SETTINGS)} element={<ConsultantSettings />} />
      </Route>

      {/* 404 route */}
      <Route path='*' element={<NotFound />} />
    </>
  )
);

export default router;