import { useState } from "react";
import { toggleFavourite, formatPeriod } from "../../utils/helper";
import { ArrowsAngleExpand, HeartFill } from "react-bootstrap-icons"
import { Heart, MapPin, PlusCircle } from "lucide-react"
import { useTranslation } from "react-i18next"


export const FeatureCard = ({ property }: { property: any }) => {
    const { t, i18n } = useTranslation();
    const [isFavorite, setIsFavorite] = useState(property.favorite);
    const handleToggleFavourite = async (id: number) => {
        setIsFavorite(!isFavorite);
        const result = await toggleFavourite(id);
        if (!result) {
            setIsFavorite(!isFavorite);
        }
    };

    return (
        <div className="min-w-full xl:p-6 xl:px-4 p-10 rounded-2xl bg-sky-500/30">
            <h1 className="text-lg font-bold">{property[`name_${i18n.language}`]}</h1>
            <p className="text-md text-gray-500 flex items-center gap-2">
                <MapPin className="text-blue-500" size={20} />
                {property[`address_${i18n.language}`]}
            </p>

            <div className="relative xl:mt-4 mt-6">
                <div className="flex gap-2 absolute top-2 left-2 z-10">
                    <p className="px-3 py-1 rounded-full bg-white text-gray-700 xl:text-xs text-md font-semibold">
                        {t(`filter.purpose.${property.purpose}`)}
                    </p>
                    {property.featured && (
                        <p className="px-3 py-1 rounded-full bg-blue-500 text-white xl:text-xs text-md font-semibold">
                            {t('property.featured')}
                        </p>
                    )}
                </div>
                <p className="absolute top-2 right-4 z-10 px-3 py-1 text-gray-700 rounded-full bg-white xl:text-xs text-md font-semibold">
                    {t('general.built')} {property.year_built}
                </p>
                <p className="absolute bottom-4 left-4 z-10 xl:text-xl text-2xl font-medium text-white mb-2">
                    {formatPeriod(property.price, t)}
                </p>
                <div className="absolute bottom-4 right-4 z-10 flex gap-2">
                    <p className="xl:w-8 xl:h-8 w-9 h-9 bg-black/65 flex items-center justify-center rounded-md">
                        <ArrowsAngleExpand className="text-white xl:w-4 xl:h-4 w-5.5 h-5.5" />
                    </p>
                    <p className="xl:w-8 xl:h-8 w-9 h-9 bg-black/65 flex items-center justify-center rounded-md"
                        onClick={(e) => {
                            e.stopPropagation();
                            handleToggleFavourite(property.id);
                        }}>
                        {isFavorite ? <HeartFill size={16} className="text-red-500" /> : <Heart size={16} className="text-white" />} 
                    </p>
                    <p className="xl:w-8 xl:h-8 w-9 h-9 bg-black/65 flex items-center justify-center rounded-md">
                        <PlusCircle className="text-white xl:w-5 xl:h-5 w-6 h-6" />
                    </p>
                </div>

                <img src={property.image} alt={property.name} className="rounded-lg w-full object-cover xl:h-65 h-120" />
            </div>
        </div>
    )
}