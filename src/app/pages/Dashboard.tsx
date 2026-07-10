import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { AuthService } from "../services/auth.service";
import { PropertyService } from "../services/property.service";
import { CMSService } from "../services/cms.service";
import { PropertyCard } from "../components/cards/PropertyCard";
import { formatTimeOnly } from "../utils/helper";
import { Loading } from "../components/ui/Loading";


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
    const { t, i18n } = useTranslation();
    const user = AuthService.getUser();
    const [properties, setProperties] = useState([]);
    const [inquiries, setInquiries] = useState([]);
    const [tourSchedules, setTourSchedules] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    
    useEffect(() => {
        setIsLoading(true);
        CMSService.getUserDashboard()
            .then((res) => {
                console.log('data is ',res)
                setProperties(res.favouriteProperties);
                setInquiries(res.inquiries);
                setTourSchedules(res.tourSchedules);
            })
            .catch((err) => console.error(err))
            .finally(() => setIsLoading(false));
    }, []);


    const MOCK_STATS = [
        { id: 1, label: t('user_dashboard.recently_saved_properties'), count: properties?.length, icon: "💖", color: "bg-pink-100 text-pink-600" },
        { id: 2, label: t('user_dashboard.active_inquiries'), count: inquiries?.length, icon: "📩", color: "bg-blue-100 text-blue-600" },
        { id: 3, label: t('user_dashboard.tour_schedules'), count: tourSchedules?.length, icon: "📅", color: "bg-green-100 text-green-600" },
    ];

    if(isLoading){
        return <Loading />
    }


    return (
        <div className="p-4 md:p-8 space-y-8">
            
            {/* Header section */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
                <div>
                    <h1 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-white tracking-tight">
                        {t('user_dashboard.welcome_back', { name: user.name })}
                    </h1>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                        {t('user_dashboard.manage_your_properties')}
                    </p>
                </div>
                <button className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors shadow-sm">
                    ✨ {t('user_dashboard.start_new_search')}
                </button>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
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

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-4">
                    <div className="flex items-center justify-between">
                        <h2 className="text-xl font-bold text-gray-800 dark:text-white">{t('user_dashboard.recently_saved_properties')}</h2>
                        <Link to="/dashboard/favorites" className="text-sm font-semibold text-blue-600 hover:underline">
                            {t('general.view_all')}
                        </Link>
                    </div>

                    <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
                        {properties.slice(0, 2).map((property) => (
                            <PropertyCard key={property.id} property={property} />
                        ))}
                    </div>
                </div>

                <div className="space-y-4">
                    <h2 className="text-xl font-bold text-gray-800 dark:text-white">{t('user_dashboard.upcoming_tours')}</h2>
                    
                    <div className="bg-white dark:bg-slate-900 rounded-xl border border-gray-200/80 dark:border-slate-800 p-4 shadow-sm space-y-4">
                        {tourSchedules.slice(0,2).map((tour, index) => {
                            return (
                                <div key={index} className="p-3 bg-blue-50/50 dark:bg-blue-950/30 border border-blue-100 dark:border-blue-900/50 rounded-lg flex items-start space-x-3">
                                    <span className="text-xl mt-0.5">🏡</span>
                                    <div>
                                        <h4 className="text-sm font-semibold text-gray-800 dark:text-white">{t(`user_dashboard.tour_type.${tour?.tour_type}`)}</h4>
                                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{tour[`property_title_${i18n.language}`]}</p>
                                        <p className="text-xs font-medium text-blue-600 dark:text-blue-400 mt-2">{new Date(tour?.requested_date).toDateString()} {t('general.at')} {formatTimeOnly(tour?.requested_time)}</p>
                                    </div>
                                </div>
                            )
                        })}

                        <button className="w-full text-center py-2 text-sm font-medium text-gray-600 dark:text-gray-400 bg-gray-50 dark:bg-slate-800/50 hover:bg-gray-100 dark:hover:bg-slate-800 rounded-lg transition-colors">
                            {t('user_dashboard.manage_all_schedules')}
                        </button>
                    </div>
                </div>

            </div>

        </div>
    );
};

export default UserDashboard;