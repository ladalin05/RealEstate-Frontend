import { useEffect, useState } from "react";
import { PropertyCard } from "../components/cards/PropertyCard";
import { PropertyService } from "../services/property.service";
import { useTranslation } from "react-i18next";

const FavoritePropPage = () => {
    const { t } = useTranslation();
    const [properties, setProperties] = useState([]);
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const userId = user.id;

    useEffect(() => {
        PropertyService.getFavoriteProperties(userId).then((data) => {
            setProperties(data);
        });
    }, []);

    return (
        <div className="min-h-screen p-10 w-full mx-auto">
            <h1 className="font-bold text-2xl">{t('user_dashboard.favorite.title')}</h1>
            <p className="text-gray-600 font-light mt-1">{t('user_dashboard.favorite.subtitle')}</p>
            <div className="w-full mt-6">
                <section className="w-full h-[600px]">
                    <div className="grid grid-cols-3 gap-4 h-auto py-6">
                        { properties.map((property) => (
                            <div key={property.id}>
                                <PropertyCard property={property} />
                            </div>
                        ))}
                    </div>
                </section>
            </div>
        </div>
    );
};

export default FavoritePropPage;