import React, { memo } from "react";
import { NavLink, Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { Menu, X } from "lucide-react";
import { ROUTES } from "../config";
import LanguageSelector from "./LanguageSelector";
import {
  selectIsAuthenticated,
  selectUserRole,
} from "../store/slices/authSlice";

const DASHBOARD_MAP = {
  admin: ROUTES.ADMIN_DASHBOARD,
  user: ROUTES.USER_DASHBOARD,
  consultant: ROUTES.CONSULTANT_DASHBOARD,
};

const NAV_LINKS = [
  { to: ROUTES.HOME, labelKey: "common.home", end: true },

  { to: ROUTES.CONSULTANTS, labelKey: "common.consultants" },
  { to: ROUTES.CREDIT, labelKey: "common.credit" },
  { to: ROUTES.WEBSHOP, labelKey: "common.webshop" },
  { to: ROUTES.DONATION, labelKey: "common.donation" },
  { to: ROUTES.COMMUNITY, labelKey: "common.community" },
  { to: ROUTES.BLOG, labelKey: "common.blog" },
  { to: ROUTES.ENTREPRENEURSHIP, labelKey: "common.entrepreneurship" },
  { to: ROUTES.FAQ, labelKey: "common.faq" },
];

const navLinkClass = ({ isActive }) =>
  [
    "group relative inline-flex items-center px-2 py-1 text-base font-medium transition-all duration-300 ease-out",
    "hover:-translate-y-0.5 active:translate-y-0 active:scale-95 active:animate-nav-pop motion-reduce:transform-none motion-reduce:transition-none",
    "after:absolute after:left-0 after:-bottom-0.5 after:h-0.5 after:w-full after:origin-left after:rounded-full after:transition-transform after:duration-300 after:content-['']",
    isActive
      ? "text-purple-700 after:scale-x-100 after:bg-purple-700"
      : "text-gray-600 after:scale-x-0 after:bg-purple-300 hover:text-purple-600 hover:after:scale-x-100",
  ].join(" ");

const mobileNavLinkClass = ({ isActive }) =>
  [
    "block px-6 py-4 text-base font-semibold transition-all duration-300 ease-out",
    "active:scale-[0.98] active:animate-nav-pop motion-reduce:transform-none motion-reduce:transition-none",
    isActive
      ? "bg-purple-50 text-[#6E35AE] shadow-[inset_3px_0_0_0_#7e22ce]"
      : "text-gray-700 hover:bg-gray-50 hover:text-[#6E35AE]",
  ].join(" ");

const Navbar = memo(({ menuOpen, setMenuOpen }) => {
  const { t } = useTranslation();
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const userRole = useSelector(selectUserRole);
  const logoTo = isAuthenticated
    ? DASHBOARD_MAP[userRole] || ROUTES.HOME
    : ROUTES.HOME;
  const closeMenu = () => setMenuOpen(false);
  return (
    <nav className="sticky top-0 z-100 border-b border-gray-100 bg-white shadow-sm">
      <div className="relative z-10 w-full container mx-auto px-4 lg:px-6 ">
        <div className="flex h-20 items-center justify-between">
          <div className="shrink-0">
            <Link to={ROUTES.HOME} className="flex items-center gap-2">
              <img
                src="/logo1.webp"
                alt="Netwerkmediums Logo"
                className="h-18 w-auto object-contain "
              />
            </Link>
          </div>

          <div className="hidden xl:flex items-center gap-6">
            {NAV_LINKS.map(({ to, labelKey, end }) => (
              <NavLink
                key={labelKey}
                to={to}
                end={end}
                className={navLinkClass}
              >
                {t(labelKey)}
              </NavLink>
            ))}
          </div>

          <div className="hidden xl:flex items-center gap-3">
            <LanguageSelector />
            {isAuthenticated ? (
              <Link
                to={DASHBOARD_MAP[userRole] || ROUTES.HOME}
                className="rounded-md bg-green-500/60 px-6 py-2.5 text-sm font-semibold text-white shadow-sm transition-all uppercase tracking-wide"
              >
                Dashboard
              </Link>
            ) : (
              <>
                <Link
                  to={ROUTES.REGISTER}
                  className="rounded-md bg-green-500/60 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-all "
                >
                  {t("common.becomeConsultant")}
                </Link>
                <Link
                  to={ROUTES.LOGIN}
                  className="rounded-md bg-[#6E35AE] px-6 py-2.5 text-sm font-semibold text-white shadow-sm transition-all "
                >
                  {t("common.signIn")}
                </Link>
              </>
            )}
          </div>

          <div className="flex xl:hidden items-center gap-3 ml-auto">
            <LanguageSelector />
            <button
              type="button"
              onClick={() => setMenuOpen((v) => !v)}
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              className="rounded-md p-2 text-gray-600 transition-colors hover:bg-gray-100"
            >
              {menuOpen ? (
                <X size={28} className="text-gray-800" />
              ) : (
                <Menu size={28} />
              )}
            </button>
          </div>
        </div>
      </div>

      {menuOpen && (
        <div
          className="fixed inset-0 top-20 z-90 bg-black/30 backdrop-blur-sm xl:hidden"
          onClick={closeMenu}
        >
          <div
            id="mobile-menu"
            className="absolute left-0 top-0 z-100 flex w-full flex-col border-t border-gray-100 bg-white shadow-2xl xl:hidden animate-in slide-in-from-top duration-200"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="py-1">
              {NAV_LINKS.map(({ to, labelKey, end }) => (
                <NavLink
                  key={labelKey}
                  to={to}
                  end={end}
                  onClick={closeMenu}
                  className={mobileNavLinkClass}
                >
                  {t(labelKey)}
                </NavLink>
              ))}
            </div>

            <div className="flex flex-col gap-3 border-t border-gray-100 p-6">
              {isAuthenticated ? (
                <Link
                  to={DASHBOARD_MAP[userRole] || ROUTES.HOME}
                  onClick={closeMenu}
                  className="w-full rounded-md bg-green-500/60 py-4 text-center text-lg font-bold text-white shadow-md uppercase tracking-wide"
                >
                  Dashboard
                </Link>
              ) : (
                <>
                  <Link
                    to={ROUTES.REGISTER}
                    onClick={closeMenu}
                    className="w-full rounded-md bg-green-500/60 py-4 text-center text-lg font-bold text-white shadow-md"
                  >
                    {t("common.becomeConsultant")}
                  </Link>
                  <Link
                    to={ROUTES.LOGIN}
                    onClick={closeMenu}
                    className="w-full rounded-md bg-[#6E35AE] py-4 text-center text-lg font-bold text-white shadow-md"
                  >
                    {t("common.signIn")}
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
});

Navbar.displayName = "Navbar";

export default Navbar;
