import { Link, NavLink, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { ProfileDropdown } from "./ui/ProfileDropdown";
import { LanguageSwitcher } from "./ui/LanguageSwitcher";
import { AuthService } from "../services/auth.service";
import { useTranslation } from "react-i18next";
import logoImage from "../../assets/win-realty-logo.png";

const Navigation = () => {
    const { t } = useTranslation();
    const location = useLocation();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const [isHomePage, setIsHomePage] = useState(true);
    const user = AuthService.getUser();
    const isLoggedIn = AuthService.isAuthenticated();

    const links = [
        { id: 1, menu_title: t('nav.home'), menu_link: '/home' },
        { id: 3, menu_title: t('nav.property'), menu_link: '/property' },
        { id: 5, menu_title: t('nav.agents'), menu_link: '/agents' },
        { id: 2, menu_title: t('nav.about_us'), menu_link: '/about-us' },
        { id: 4, menu_title: t('nav.blog'), menu_link: '/blogs' },
        { id: 6, menu_title: t('nav.contact_us'), menu_link: '/contact-us' },
    ];

    // Central helper: treat "/" the same as "/home" for active-state matching
    const isLinkActive = (menuLink: string) => {
        if (menuLink === '/home') {
            return location.pathname === '/home' || location.pathname === '/';
        }
        return location.pathname === menuLink;
    };

    useEffect(() => {
        const onScroll = () => {
            setIsScrolled(window.scrollY > 100);
        };
        window.addEventListener('scroll', onScroll);
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    useEffect(() => {
        setIsHomePage(location.pathname === "/" || location.pathname === "/home");
    }, [location.pathname]); // only recompute when the path actually changes

    return (
        <header className={`fixed top-0 left-0 w-full z-50 py-2.5 backdrop-blur-sm transition-all duration-500 ease-in-out ${
                isHomePage
                ? isScrolled ? "bg-white text-black shadow-lg" : "bg-transparent text-white"
                : "bg-white text-black shadow-sm " }`} >
            <nav className="px-4 py-1.5 flex justify-center">
                <div className="flex flex-wrap items-center justify-between w-full max-w-7xl">
                    {/* Logo and Brand */}
                    <Link to="/home" className="inline-flex items-center gap-2 py-1 whitespace-nowrap">
                        <img src={logoImage} alt="Real Estate Logo" className="h-9 w-auto" />
                    </Link>

                    {/* Mobile Toggle Button */}
                    <button 
                        className="p-2 text-lg md:hidden block focus:outline-none" 
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        aria-label="Toggle navigation"
                    >
                        <div className="space-y-1.5 w-6 h-5 flex flex-col justify-between">
                            <span className={`block h-0.5 bg-gray-700 rounded-full transition-transform duration-300 ${isMobileMenuOpen ? 'rotate-45 translate-y-[8.5px]' : ''}`}></span>
                            <span className={`block h-0.5 bg-gray-700 rounded-full transition-opacity duration-300 ${isMobileMenuOpen ? 'opacity-0' : ''}`}></span>
                            <span className={`block h-0.5 bg-gray-700 rounded-full transition-transform duration-300 ${isMobileMenuOpen ? '-rotate-45 -translate-y-[8.5px]' : ''}`}></span>
                        </div>
                    </button>

                    {/* Nav Links Container */}
                    <div className={`w-full md:flex md:items-center md:w-auto mt-4 md:mt-0 bg-dark ${isMobileMenuOpen ? 'block' : 'hidden'}`}>
                        <ul className="flex flex-col md:flex-row pl-0 mb-0 list-none items-center gap-2 md:gap-4">
                            {links.map((link) => (
                                <li className="whitespace-nowrap relative" key={link.id}>
                                    <NavLink
                                        to={link.menu_link || '#'}
                                        onClick={() => setIsMobileMenuOpen(false)} // close mobile menu on nav
                                        className={() => `nav-link inline-block lg:px-2 py-2 transition-colors text-sm uppercase
                                            ${isLinkActive(link.menu_link)
                                                ? 'text-[#00C2E0] font-semibold before:content-[""] before:absolute before:bottom-0 before:left-4 before:right-4 before:h-0.5 before:bg-[#00C2E0] before:rounded-full'
                                                : 'hover:text-[#00C2E0]'
                                            }`
                                        }
                                    >
                                        {link.menu_title}
                                    </NavLink>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className={`w-full md:flex md:items-center md:w-auto mt-4 md:mt-0 bg-dark ${isMobileMenuOpen ? 'block' : 'hidden'}`}> 
                        <div className="flex flex-col md:hidden items-center justify-center py-3">
                            <LanguageSwitcher />
                            <div className="md:hidden block mt-6">
                                {isLoggedIn ? (
                                    <ProfileDropdown user={user} isScrolled={isScrolled} isHomePage={isHomePage} />
                                ) : (
                                    <a href="/login" className="inline-block bg-[#007BFF] text-white hover:bg-[#0069D9] rounded-xl px-6 py-2 text-[15px] font-medium transition-colors">
                                        {t('nav.sign_in')}
                                    </a>
                                )}
                            </div>
                        </div>
                        {/* Right Side / Auth */}
                        <div className="flex items-center justify-between mt-4 md:mt-0 ml-4 lg:ml-12 relative">
                            <div className="hidden lg:me-8 me-4 md:flex items-center">
                                <LanguageSwitcher /> 
                            </div>
                            <div className="md:block hidden">
                                {isLoggedIn ? (
                                    <ProfileDropdown user={user} isScrolled={isScrolled} isHomePage={isHomePage} />
                                ) : (
                                    <a href="/login" className="inline-block bg-[#007BFF] text-white hover:bg-[#0069D9] rounded-xl px-6 py-2 text-[15px] font-medium transition-colors">
                                        {t('nav.sign_in')}
                                    </a>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
        </header>
    )
}

export default Navigation;