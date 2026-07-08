import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { AuthService } from "../services/auth.service";
import { PropertyService } from "../services/property.service";


const RECENT_PROPERTIES = [
    {
        id: "prop-1",
        title: "Modern 3-Bed Villa with Pool",
        location: "Beverly Hills, CA",
        price: "$2,450,000",
        type: "For Sale",
        image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=500&q=80",
    },
    {
        id: "prop-2",
        title: "Luxury Penthouse Downtown",
        location: "Manhattan, NY",
        price: "$8,500 / mo",
        type: "For Rent",
        image: "https://images.unsplash.com/photo-1567496898669-ee935f5f647a?auto=format&fit=crop&w=500&q=80",
    },
];

const UserDashboard = () => {
    const { t } = useTranslation();
    const user = AuthService.getUser();
    const [properties, setProperties] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    console.log(user);
    useEffect(() => {
        setIsLoading(true);
        PropertyService.getFavoriteProperties(user.id)
            .then(setProperties)
            .catch((err) => console.error(err))
            .finally(() => setIsLoading(false));
    }, [user.id]);

    const property_count = properties.length;

    const MOCK_STATS = [
        { id: 1, label: "Saved Properties", count: property_count, icon: "💖", color: "bg-pink-100 text-pink-600" },
        { id: 2, label: "Active Inquiries", count: 3, icon: "📩", color: "bg-blue-100 text-blue-600" },
        { id: 3, label: "Tour Schedules", count: 2, icon: "📅", color: "bg-green-100 text-green-600" },
        { id: 4, label: "Saved Searches", count: 5, icon: "🔍", color: "bg-purple-100 text-purple-600" },
    ];


    return (
        <div className="p-4 md:p-8 space-y-8">
            
            {/* Header section */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
                <div>
                    <h1 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-white tracking-tight">
                        Welcome back, {user.name}!
                    </h1>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                        Manage your dream homes, scheduled tours, and inquiries here.
                    </p>
                </div>
                <button className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors shadow-sm">
                    ✨ Start New Search
                </button>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {MOCK_STATS.map((stat) => (
                    <div 
                        key={stat.id} 
                        className="p-6 bg-white dark:bg-slate-900 rounded-xl border border-gray-200/80 dark:border-slate-800 shadow-sm flex items-center space-x-4"
                    >
                        <div className={`p-3 rounded-lg text-2xl ${stat.color}`}>
                            {stat.icon}
                        </div>
                        <div>
                            <p className="text-2xl font-bold text-gray-800 dark:text-white">{stat.count}</p>
                            <p className="text-sm font-medium text-gray-400 dark:text-gray-500">{stat.label}</p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Layout Split: Favorites & Activity */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                
                {/* Left Side: Favorite/Recent Properties */}
                <div className="lg:col-span-2 space-y-4">
                    <div className="flex items-center justify-between">
                        <h2 className="text-xl font-bold text-gray-800 dark:text-white">Recently Saved Properties</h2>
                        <Link to="/dashboard/favorites" className="text-sm font-semibold text-blue-600 hover:underline">
                            View All
                        </Link>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {RECENT_PROPERTIES.map((property) => (
                            <div 
                                key={property.id} 
                                className="bg-white dark:bg-slate-900 rounded-xl border border-gray-200/80 dark:border-slate-800 overflow-hidden shadow-sm hover:shadow-md transition-shadow group"
                            >
                                <div className="relative h-44 overflow-hidden">
                                    <img 
                                        src={property.image} 
                                        alt={property.title} 
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                    />
                                    <span className="absolute top-3 left-3 px-2.5 py-1 text-xs font-semibold bg-white/90 text-gray-800 rounded-full shadow-sm">
                                        {property.type}
                                    </span>
                                </div>
                                <div className="p-4 space-y-2">
                                    <h3 className="font-semibold text-gray-800 dark:text-white truncate">
                                        {property.title}
                                    </h3>
                                    <p className="text-xs text-gray-400 dark:text-gray-500 flex items-center">
                                        📍 {property.location}
                                    </p>
                                    <div className="pt-2 flex items-center justify-between border-t border-gray-100 dark:border-slate-800">
                                        <span className="text-lg font-bold text-blue-600 dark:text-blue-400">
                                            {property.price}
                                        </span>
                                        <button className="text-xs font-medium text-gray-600 dark:text-gray-300 bg-gray-100 dark:bg-slate-800 hover:bg-gray-200 px-3 py-1.5 rounded-md transition-colors">
                                            Details
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Right Side: Upcoming Tours / Activity */}
                <div className="space-y-4">
                    <h2 className="text-xl font-bold text-gray-800 dark:text-white">Upcoming Tours</h2>
                    
                    <div className="bg-white dark:bg-slate-900 rounded-xl border border-gray-200/80 dark:border-slate-800 p-4 shadow-sm space-y-4">
                        <div className="p-3 bg-blue-50/50 dark:bg-blue-950/30 border border-blue-100 dark:border-blue-900/50 rounded-lg flex items-start space-x-3">
                            <span className="text-xl mt-0.5">🏡</span>
                            <div>
                                <h4 className="text-sm font-semibold text-gray-800 dark:text-white">In-Person Showing</h4>
                                <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">Modern 3-Bed Villa with Pool</p>
                                <p className="text-xs font-medium text-blue-600 dark:text-blue-400 mt-2">Tomorrow at 2:00 PM</p>
                            </div>
                        </div>

                        <div className="p-3 bg-purple-50/50 dark:bg-purple-950/30 border border-purple-100 dark:border-purple-900/50 rounded-lg flex items-start space-x-3">
                            <span className="text-xl mt-0.5">💻</span>
                            <div>
                                <h4 className="text-sm font-semibold text-gray-800 dark:text-white">Video Consultation</h4>
                                <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">Agent: Sarah Jenkins</p>
                                <p className="text-xs font-medium text-purple-600 dark:text-purple-400 mt-2">Friday, July 10 at 10:00 AM</p>
                            </div>
                        </div>

                        <button className="w-full text-center py-2 text-sm font-medium text-gray-600 dark:text-gray-400 bg-gray-50 dark:bg-slate-800/50 hover:bg-gray-100 dark:hover:bg-slate-800 rounded-lg transition-colors">
                            Manage All Schedules
                        </button>
                    </div>
                </div>

            </div>

        </div>
    );
};

export default UserDashboard;