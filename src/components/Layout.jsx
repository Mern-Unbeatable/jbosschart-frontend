
import React, { memo, useState } from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import ScrollToTop from './ScrollToTop';

const Layout = memo(() => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className='min-h-screen bg-gray-50'>
      <ScrollToTop />
      <Navbar menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
      <main className=''>
        <Outlet />
      </main>
      {/* Common Footer */}
      <Footer />
    </div>
  );
});

import Footer from './Footer';
Layout.displayName = 'Layout';

export default Layout;
