import { useEffect, useState } from "react";
import { PropertyCard } from "../components/cards/PropertyCard";
import { PropertyService } from "../services/property.service";
import { useTranslation } from "react-i18next";
import { Loading } from "../components/ui/Loading";

const FavoritePropPage = () => {
    const { t } = useTranslation();
    const [properties, setProperties] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const userId = user.id;

    useEffect(() => {
        setIsLoading(true);
        PropertyService.getFavoriteProperties(userId).then((data) => {
            setProperties(data);
        }).finally(() => {
            setIsLoading(false);
        });
    }, []);

    if (isLoading) {
        return <Loading />;
    }

    return (
        <div className="min-h-screen p-10 w-full mx-auto">
            <h1 className="font-bold text-2xl">{t('user_dashboard.favorite.title')}</h1>
            <p className="text-gray-600 font-light mt-1">{t('user_dashboard.favorite.subtitle')}</p>
            <div className="w-full mt-6 pb-18">
                <section className="w-full h-auto">
                    <div className="grid xl:grid-cols-3 lg:grid-cols-2 md:grid-cols-1 gap-4 h-auto py-6">
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