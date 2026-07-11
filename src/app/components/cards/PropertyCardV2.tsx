import { ArrowsAngleExpand, Heart, PlusCircle, GeoAlt, HeartFill} from "react-bootstrap-icons";
import { BedDouble, ShowerHead, TriangleRight, Paperclip, ChevronLeft, ChevronRight  } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { formatPeriod, toggleFavourite } from "../../utils/helper";

export const PropertyCardV2 = ({ property }: { property: any }) => {
    const navigation = useNavigate();
    const { t, i18n } = useTranslation();
    const [isFavorite, setIsFavorite] = useState(property.favorite);
    const scrollImageRef = useRef(null);
    const handleNextImage = () => {
        const container = scrollImageRef.current;
        if (!container) return;
        const width = container.offsetWidth;
        const currentIndex = Math.round(container.scrollLeft / width);
        const nextIndex = currentIndex + 1;

        container.scrollTo({
            left: nextIndex * width,
            behavior: "smooth",
        });
    }

    const handlePreImage = () => {
        const container = scrollImageRef.current;
        if (!container) return;
        const width = container.offsetWidth;
        const currentIndex = Math.round(container.scrollLeft / width);
        const prevIndex = currentIndex - 1;

        container.scrollTo({
            left: prevIndex * width,
            behavior: "smooth",
        });
    }
    
    const handleToggleFavourite = async (id: number) => {
        setIsFavorite(!isFavorite);
        const result = await toggleFavourite(id);
        if (!result) {
            setIsFavorite(!isFavorite);
        }
    };
    
    const toPropDetail = (id: number) => {
        navigation(`/property/${id}`);
    }

    return (
        <div className="relative bg-white shadow-md rounded-md overflow-hidden p-2 h-auto grid lg:grid-cols-5 md:grid-cols-3 grid-cols-1">
            <div className="relative lg:col-span-2 md:col-span-1 group cursor-pointer rounded-lg overflow-hidden" onClick={() => toPropDetail(property.id)}>
                { property.featured && (
                    <p className="absolute top-4 left-4 z-10 bg-lime-500 text-white text-sm font-thin py-1 px-1 rounded-sm uppercase">{t('property.featured')}</p>
                )}
                <div className="w-full h-full relative flex justify-start overflow-hidden" ref={scrollImageRef} >
                    <img src={property.image || 'http://localhost:9000/images/properties/no-image-found.jpg'} alt={property[`name_${i18n.language}`]}
                        className="w-full h-full object-cover flex-shrink-0"
                        onError={(e) => {
                            e.currentTarget.onerror = null;
                            e.currentTarget.src = 'http://localhost:9000/images/properties/no-image-found.jpg';
                        }}
                    />
                    {Object.entries(JSON.parse(property.gallery)).map(([index, img]) => (
                        <img key={index} src={img as string} alt={`${property.name} ${index + 1}`} className="w-full h-full object-cover flex-shrink-0" />
                    ))}
                </div>
                <div className="w-full flex items-center justify-between absolute top-1/2 -translate-y-1/2 z-10 px-3">
                    <button className="" 
                            onClick={(e) => {
                                e.stopPropagation(); 
                                handlePreImage()}}>
                                <ChevronLeft size={42} className="text-white font-bold" /> 
                    </button>
                    <button className="" 
                            onClick={(e) => {
                                e.stopPropagation();
                                handleNextImage()}}> 
                                <ChevronRight size={42} className="text-white font-bold" /> 
                    </button>
                </div>
                <div className="absolute bottom-4 right-4 z-10 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <p className="w-7 h-7 bg-black/65 flex items-center justify-center rounded-md"> <ArrowsAngleExpand size={16} className="text-white" /> </p>
                    <p className="w-7 h-7 bg-black/65 flex items-center justify-center rounded-md" 
                        onClick={(e) => {
                            e.stopPropagation();
                            handleToggleFavourite(property.id);
                        }}>
                            {isFavorite ? <HeartFill size={16} className="text-red-500" /> : <Heart size={16} className="text-white" />} 
                    </p>
                    <p className="w-7 h-7 bg-black/65 flex items-center justify-center rounded-md"> <PlusCircle size={16} className="text-white" /> </p>
                </div>
                <div className="absolute inset-0 z-0  bg-gradient-to-b from-black/10 via-transparent to-black/40 group-hover:opacity-0 transition-opacity"></div>
            </div>
            <div className="lg:col-span-3 md:col-span-2 p-4 px-8 py06">
                <div className="w-full flex items-center justify-between mb-3">
                    <p className="bg-black/65 text-white lg:text-sm text-xs font-thin p-2 rounded-sm uppercase">{t(`filter.purpose.${property.purpose}`)}</p>
                    <p className="text-xl font-bold text-slate-800 mb-2">{formatPeriod(property.price, t)}</p>
                </div>
                <h3 className="lg:text-lg text-md font-medium text-gray-800 mb-3 hover:text-blue-500 cursor-pointer" onClick={() => toPropDetail(property.id)}>{property.name}</h3>
                <p className="lg:text-md text-sm font-medium text-gray-500 mb-3 flex items-center"><GeoAlt className="me-2"/> {property.address}</p>
                <div className="flex items-center mb-3">
                    { 
                        property.bedrooms > 0 
                        ? <p className="flex items-center text-md text-gray-600 mr-4"><BedDouble size={28} className="mr-2" />{property.bedrooms}</p>
                        : ''
                    }
                    { 
                        property.bathrooms > 0 
                        ? <p className="flex items-center text-md text-gray-600 mr-4"><ShowerHead size={28} className="mr-2" />{property.bathrooms}</p>
                        : ''
                    }
                    <p className="flex items-center text-md text-gray-600"><TriangleRight size={28} className="mr-2" />{property.size}</p>
                </div>
                <p className="lg:text-md text-sm font-bold text-black-500 flex items-center uppercase">{property[`category_${i18n.language}`]}</p>
                <div className="py-4 flex items-center justify-between">
                    <div className="flex items-center">
                        <div className="rounded-full w-8 h-8">
                            <img src={property.agent.image} alt="" className="rounded-full w-full h-full" />
                        </div>
                        <span className="text-gray-500 ms-2 text-sm">{property.agent.name}</span>
                        <div className="flex items-center text-gray-400 ms-6">
                            <Paperclip size={14}/>
                            <span className="ms-2 text-sm">{property.agent.experience == "new_agent" ? t('agents.new_agent') : (formatPeriod(property.agent.experience, t) + ' ' + t('property.ago'))}</span>
                        </div>
                    </div>
                    <div className="flex items-center text-gray-400">
                        <button className="font-bold text-md py-1 px-3 bg-sky-400 rounded-sm text-white" onClick={()=> {toPropDetail(property.id)}}>
                            {t('general.details')}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}   