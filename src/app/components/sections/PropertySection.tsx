
import { PropertyCard } from "../cards/PropertyCard";
import { useState } from "react";
import { CMSService } from "../../services/cms.service";
import { useTranslation } from 'react-i18next';


export const PropertySection = ({propertiesData}: {propertiesData: any}) => {
    const { t } = useTranslation();

    const [numOfProp, setNumOfProp] = useState(4);
    const [featuredProperties, setFeaturedProperties] = useState(propertiesData);
    const [isLoading, setIsLoading] = useState(false);
    
    const addPropMore = () => {
            const nextNum = numOfProp + 4;
            setIsLoading(true);
            CMSService.getFeaturedProperties(nextNum)
                .then((data) => {
                    setFeaturedProperties(data);
                    setNumOfProp(nextNum);
                })
                .finally(() => {
                    setIsLoading(false);
                });
        };
        
    return (
        <section className="container py-12 px-6">
            <div className="flex justify-between items-center mb-12">
                <div className="w-3/4">
                    <h1 className="md:text-4xl text-2xl font-bold text-gray-800 dark:text-gray-200">{t('property.feature_title')} </h1>
                    <p className="text-sm">{t('property.feature_description')}</p>
                </div>
                <a href="/property" className="text-blue-500 md:text-sm text-xs font-medium flex items-center">{t('general.see_more')} →</a>
            </div>
            <div className="py-3">
                {isLoading ? (
                    <div className="w-full flex items-center justify-center py-32">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-sky-500" />
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 h-auto">
                        {featuredProperties.map((property:any) => (
                            <div key={property.id}>
                                <PropertyCard property={property} />
                            </div>
                        ))}
                    </div>
                )}
            </div>
            <div className="flex justify-center mt-8">
                <button type="button" onClick={() => addPropMore()} className="border-2 border-blue-500 bg-blue-500 hover:bg-white hover:text-blue-500 text-white font-bold py-2 px-8 rounded">
                    {t('general.load_more')}
                </button>
            </div>
        </section>
    );
}