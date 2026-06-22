import { Link, NavLink, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { ProfileDropdown } from "./ui/ProfileDropdown";
import { LanguageSwitcher } from "./ui/LanguageSwitcher";
import { AuthService } from "../services/auth.service";

const Navigation = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const [isHomePage, setIsHomePage] = useState(true);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState(null);
    const location = useLocation();
    const links = [
        { id: 1, menu_title: 'Home', menu_link: '/home' },
        { id: 3, menu_title: 'Property', menu_link: '/property' },
        { id: 5, menu_title: 'Agents', menu_link: '/agents' },
        { id: 2, menu_title: 'About Us', menu_link: '/about-us' },
        { id: 4, menu_title: 'Blog', menu_link: '/blogs' },
        { id: 6, menu_title: 'Contact Us', menu_link: '/contact-us' },
    ];

    useEffect(() => {
        const user = AuthService.getUser();
        const isLoggedIn = AuthService.isAuthenticated();
        setUser(user);
        setIsLoggedIn(isLoggedIn);
    }, [isLoggedIn, user]);

    useEffect(() => {
        const onScroll = () => {
            setIsScrolled(window.scrollY > 100);
        };
        window.addEventListener('scroll', onScroll);
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    useEffect(() => {
        const HomePage = location.pathname === "/" || location.pathname === "/home";
        setIsHomePage(HomePage)
    })

    return (
            <header className={`fixed top-0 left-0 w-full z-50 py-2.5 backdrop-blur-sm transition-all duration-500 ease-in-out ${
                    isHomePage
                    ? isScrolled ? "bg-white text-black shadow-lg" : "bg-transparent text-white"
                    : "bg-white text-black shadow-sm " }`} >
                <nav className="px-4 py-1.5 flex justify-center">
                    <div className="flex flex-wrap items-center justify-between w-full max-w-7xl">
                        {/* Logo and Brand */}
                        <Link to="/home" className="inline-flex items-center gap-2 py-1 whitespace-nowrap">
                            <img src="https://wpresidence.net/wp-content/uploads/2020/11/logo.png" alt="Real Estate Logo" className="h-9 w-auto" />
                        </Link>

                        {/* Mobile Toggle Button */}
                        <button 
                            className="p-2 text-lg bg-transparent md:hidden block focus:outline-none" 
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            aria-label="Toggle navigation"
                        >
                            {/* Modern Tailwind hamburger menu */}
                            <div className="space-y-1.5 w-6 h-5 flex flex-col justify-between">
                                <span className={`block h-0.5 bg-white rounded-full transition-transform duration-300 ${isMobileMenuOpen ? 'rotate-45 translate-y-[8.5px]' : ''}`}></span>
                                <span className={`block h-0.5 bg-white rounded-full transition-opacity duration-300 ${isMobileMenuOpen ? 'opacity-0' : ''}`}></span>
                                <span className={`block h-0.5 bg-white rounded-full transition-transform duration-300 ${isMobileMenuOpen ? '-rotate-45 -translate-y-[8.5px]' : ''}`}></span>
                            </div>
                        </button>

                        {/* Nav Links Container */}
                        
                        <div className={`w-full md:flex md:items-center md:w-auto mt-4 md:mt-0 bg-dark ${isMobileMenuOpen ? 'block' : 'hidden'}`}>
                            <ul className="flex flex-col md:flex-row pl-0 mb-0 list-none items-center gap-2 md:gap-4">
                                {links.map((link) => (
                                    <li className="whitespace-nowrap relative" key={link.id}>
                                        <NavLink to={link.menu_link || '#'} onClick={(e) => {
                                                                                                e.preventDefault();
                                                                                                window.location.href = link.menu_link;
                                                                                            }}
                                            className={({ isActive }) => `nav-link inline-block px-4 py-2 transition-colors text-sm uppercase
                                                ${isActive  ? 'text-[#00C2E0] font-semibold before:content-[""] before:absolute before:bottom-0 before:left-4 before:right-4 before:h-0.5 before:bg-[#00C2E0] before:rounded-full' : 'hover:text-[#00C2E0]' }`
                                            }>
                                            {link.menu_title}
                                        </NavLink>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className={`w-full md:flex md:items-center md:w-auto mt-4 md:mt-0 bg-dark ${isMobileMenuOpen ? 'block' : 'hidden'}`}> 
                            {/* Right Side / Auth */}
                            <div className="flex items-center justify-between mt-4 md:mt-0 ml-8 md:ml-12 relative">
                                {/* Desktop i18n */}
                                <div className="hidden me-8 md:flex items-center">
                                    <LanguageSwitcher />
                                </div>
                                {isLoggedIn ? (
                                    <ProfileDropdown user={user} isScrolled={isScrolled} isHomePage={isHomePage} />
                                ) : (
                                    <a href="/login" className="inline-block bg-[#007BFF] text-white hover:bg-[#0069D9] rounded-xl px-6 py-2 text-[15px] font-medium transition-colors">
                                        Sign In
                                    </a>
                                )}
                            </div>
                        </div>
                    </div>
            </nav>
        </header>
    )
}

export default Navigation;