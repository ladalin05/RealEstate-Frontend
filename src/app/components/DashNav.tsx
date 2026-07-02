import { User, Heart, LogOut } from 'lucide-react';
import { useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { AuthService } from '../services/auth.service';

export const DashNavigation = () => {
    const { t } = useTranslation();
    const location = useLocation();
    const navLinks = [
        { id: 1, label: t('nav.my_profile'), href: '/dashboard/profile', icon: User },
        { id: 2, label: t('nav.favorite'), href: '/dashboard/favorite', icon: Heart },
    ];
    const handleLogout = async () => {
        await AuthService.logout();
        window.location.href = "/";
    };

    return (
        <div className="fixed bottom-0 left-0 z-40 w-full h-20 bg-white border-t border-gray-200 lg:top-20 lg:bottom-auto lg:h-[calc(100%-5rem)] lg:w-63 lg:border-r lg:border-t-0">
            {/* Navigation Links */}
            <nav className="flex h-full items-center justify-around p-2 lg:h-auto lg:flex-1 lg:flex-col lg:items-stretch lg:justify-start lg:space-y-2 lg:p-4">
                {navLinks.map((link) => (
                    
                    <a key={link.id}
                        href={link.href}
                        className={`flex flex-col items-center justify-center px-3 py-2 rounded-xl text-gray-600 hover:bg-indigo-50 hover:text-indigo-600 transition-all lg:flex-row lg:justify-start lg:px-4 lg:py-3 ${location.pathname == link.href ? 'bg-indigo-50 text-indigo-600' : ''}`}
                    >
                        <link.icon className="w-5 h-5" />
                        <span className="text-[11px] font-medium mt-1 lg:text-base lg:mt-0 lg:ms-4">{link.label}</span>
                    </a>
                ))}
                
                <a onClick={() => handleLogout()}
                    className="flex flex-col items-center justify-center px-3 py-2 rounded-xl text-red-600 hover:bg-indigo-50 hover:text-indigo-600 transition-all cursor-pointer lg:flex-row lg:justify-start lg:px-4 lg:py-3 lg:mt-2"
                >
                    <LogOut className="w-5 h-5" />
                    <span className="text-[11px] font-medium mt-1 lg:text-base lg:mt-0 lg:ms-4">{t('nav.sign_out')}</span>
                </a>
            </nav>
        </div>
    )
}