
import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { AuthService } from "../../services/auth.service";
import { useTranslation } from "react-i18next";

export const ProfileDropdown = ({ user, isScrolled, isHomePage }: { user: any, isScrolled: boolean, isHomePage: boolean }) => {
  const { t } = useTranslation(); 
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef(null);
  const defaultUserImage = "https://ui-avatars.com/api/?name=User&background=dbeafe&color=1d4ed8&bold=true";
  const handleLogout = async () => {
    await AuthService.logout();
    setIsOpen(false);
    window.location.href = "/";
  };

  useEffect(() => {
    const handleClickOutside = (e: any) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={ref} className="relative">

      {/* Trigger button */}
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        aria-haspopup="true"
        aria-expanded={isOpen}
        className="flex items-center gap-2 rounded-sm border border-gray-600 px-3 py-1.25 pl-1.5 text-sm font-medium text-gray-200 transition hover:border-gray-300"
      >
        {user?.image ? (
            <img src={user.image} alt="Profile" className="h-6 w-6 rounded-full object-cover" />
        ) : (
            <div className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-100 text-xs font-semibold text-blue-700">
                {user?.name?.charAt(0)?.toUpperCase() ?? "U"}
            </div>
        )}
        <p className={`text-sm font-medium text-gray-400 ms-2`}>{user?.name ?? "User"}</p>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className={`h-3.5 w-3.5 text-gray-400 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>

      {/* Dropdown panel */}
      <div
        className={`absolute -right-6 z-50 mt-2 w-40 rounded-xl overflow-hidden border border-gray-100 bg-white shadow-lg transition-all duration-150 ${
          isOpen
            ? "scale-100 opacity-100"
            : "pointer-events-none scale-95 opacity-0"
        }`}
      >
        {/* User info header */}
        <div className="flex flex-col items-start border-b border-gray-100 px-4 py-3 cursor-pointer"> 
            <p className="text-sm font-semibold text-gray-500">{user?.name ?? "User"}</p>
            <p className="text-xs font-normal text-gray-400">{user?.email ?? "user@gmail.com"}</p>
        </div>

        {/* Menu items */}
        <div className="py-1.5">
          <Link
            to="/dashboard/profile"
            onClick={() => setIsOpen(false)}
            className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
          >
            <svg className="h-4 w-4 text-gray-400" fill="none" stroke="currentColor" strokeWidth="1.75" viewBox="0 0 24 24"><circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/></svg>
            {t('general.view_profile')}
          </Link>
          <Link
            to="/dashboard/favorite"
            onClick={() => setIsOpen(false)}
            className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
          >
            <svg className="h-4 w-4 text-gray-400" fill="none" stroke="currentColor" strokeWidth="1.75" viewBox="0 0 24 24"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 1 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
            {t('general.favourites')}
          </Link>
        </div>

        {/* Logout */}
        <div className="border-t border-gray-100 py-1.5">
          <button
            onClick={() => handleLogout()}
            className="flex w-full items-center gap-3 px-4 py-2 text-sm text-red-500 hover:bg-red-50 cursor-pointer"
          >
            <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.75" viewBox="0 0 24 24"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>
            {t('nav.sign_out')}
          </button>
        </div>
      </div>
    </div>
  );
}