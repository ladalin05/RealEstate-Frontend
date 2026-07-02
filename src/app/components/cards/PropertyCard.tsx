import { ArrowsAngleExpand, Heart, PlusCircle, GeoAlt, HeartFill} from "react-bootstrap-icons";
import { BedDouble, ShowerHead, TriangleRight, Paperclip, ChevronLeft, ChevronRight} from "lucide-react";
import { useRef, useState } from "react";
import { formatPeriod, toggleFavourite } from "../../utils/helper";
import { useTranslation } from "react-i18next";

export const PropertyCard = ({ property }: { property: any }) => { 
    const { t, i18n } = useTranslation();
    const scrollImageRef = useRef(null);
    const [isFavorite, setIsFavorite] = useState(property.favorite);
    
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
        window.location.href = `/property/${id}`;
    }

    return (
        <div className="h-full relative bg-white shadow-lg rounded-md overflow-hidden">
            <div className="relative w-full h-68 group cursor-pointer overflow-hidden" onClick={() => toPropDetail(property.id)}>
                { property.featured && (
                    <p className="absolute top-4 left-4 z-10 bg-lime-500 text-white text-[9px] font-bold py-1 px-1 rounded-sm uppercase">{t('property.featured')}</p>
                )}
                <p className="absolute top-4 right-4 z-10 bg-black/65 text-white text-[9px] font-bold py-1 px-1 rounded-sm uppercase">{t(`status.${property.status}`)}</p>
                <div className="w-full h-full relative flex justify-start overflow-hidden" ref={scrollImageRef} >
                    <img  src={property.image}alt={property.name} className="w-full h-full object-cover flex-shrink-0" />
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
                <p className="absolute bottom-2 left-4 z-10 text-xl font-medium text-white mb-2">{formatPeriod(property.price, t)}</p>
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
            <div className="p-6">
                <h3 className="lg:text-lg text-md font-bold text-gray-800 mb-2 hover:text-blue-500 cursor-pointer" onClick={() => toPropDetail(property.id)}>
                    {property.name}
                </h3>
                <p className="lg:text-md text-sm font-medium text-gray-500 mb-2 flex items-center"><GeoAlt className="me-2"/> {property.address}</p>
                <div className="flex items-center mb-2">
                    { 
                        property.bedrooms > 0 
                        ? <p className="flex items-center text-gray-600 mr-4"><BedDouble className="mr-2" />{property.bedrooms}</p>
                        : ''
                    }
                    { 
                        property.bathrooms > 0 
                        ? <p className="flex items-center text-gray-600 mr-4"><ShowerHead className="mr-2" />{property.bathrooms}</p>
                        : ''
                    }
                    <p className="flex items-center text-gray-600"><TriangleRight className="mr-2" />{property.size}</p>
                </div>
                <p className="lg:text-sm text-xs font-bold text-black-500 flex items-center uppercase">{property[`category_${i18n.language}`]}</p>
            </div>
            <hr className="w-full border-gray-400 mt-2" />
            <div className="px-6 py-4 flex items-center justify-between">
                <div className="flex items-center">
                    <div className="rounded-full w-8 h-8">
                        <img src={property.agent.image} alt="" className="rounded-full w-full h-full" />
                    </div>
                    <span className="text-gray-500 ms-2 text-sm">{property.agent.name}</span>
                </div>
                <div className="flex items-center text-gray-400">
                    <Paperclip size={14}/>
                    <span className="ms-2 text-sm">{property.agent.experience == "new_agent" ? t('agents.new_agent') : (formatPeriod(property.agent.experience, t) + ' ' + t('property.ago'))}</span>
                </div>
            </div>
        </div>
    );
}   