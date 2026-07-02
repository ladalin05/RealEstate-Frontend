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
        <div className="fixed w-63 h-full bg-white border-r border-gray-200">
            {/* Navigation Links */}
            <nav className="flex-1 p-4 space-y-2">
                {navLinks.map((link) => (
                    <a
                        key={link.id}
                        href={link.href}
                        className={`flex items-center px-4 py-3 rounded-xl text-gray-600 hover:bg-indigo-50 hover:text-indigo-600 transition-all ${location.pathname == link.href ? 'bg-indigo-50 text-indigo-600' : ''}`}
                    >
                        <link.icon className="w-5 h-5" />
                        <span className="font-medium ms-4">{link.label}</span>
                    </a>
                ))}
                <a onClick={() => handleLogout()} className="flex items-center px-4 py-3 mt-2 rounded-xl text-red-600 hover:bg-indigo-50 hover:text-indigo-600 transition-all">
                    <LogOut className="w-5 h-5" />
                    <span className="font-medium ms-4">{t('nav.sign_out')}</span>
                </a>
            </nav>

            {/* User Info */}
            {/* <div className="p-4 border-t border-gray-100">
                <div className="flex items-center p-3 bg-gray-50 rounded-xl">
                    <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center text-indigo-600 mr-3">
                        {user.avatar ? (
                            <img src={user.avatar} alt="Avatar" className="w-full h-full object-cover rounded-lg" />
                        ) : (
                            user.name.charAt(0).toUpperCase()
                        )}
                    </div>
                    <div>
                        <p className="text-sm font-semibold text-gray-800">{user.name}</p>
                        <p className="text-xs text-gray-500">Admin</p>
                    </div>
                </div>
            </div> */}
        </div>
    )
}