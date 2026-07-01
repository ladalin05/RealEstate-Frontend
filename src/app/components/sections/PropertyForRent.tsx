import { ArrowRight } from "react-bootstrap-icons";
import { useEffect } from 'react';
import { PropertyCard } from "../cards/PropertyCard";
import { useAutoScrollCarousel } from "../../utils/helper";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const AUTO_SCROLL_INTERVAL = 3000;
const GAP = 16;

export const PropertyForRent = ({properties}: {properties: any}) => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const { scrollRef, innerRef, active, number, isPausedRef, calculateNumber, scrollToIndex, startAutoScroll, stopAutoScroll, handleScrollEvent,} = useAutoScrollCarousel(properties.length, AUTO_SCROLL_INTERVAL, GAP);

    useEffect(() => {
        calculateNumber();
        scrollToIndex(0);
    }, [properties.length]);

    useEffect(() => {
        if (number > 1) startAutoScroll();
        return () => stopAutoScroll();
    }, [number]);

    useEffect(() => {
        const el = scrollRef.current;
        if (!el) return;

        el.addEventListener("scroll", handleScrollEvent);
        return () => el.removeEventListener("scroll", handleScrollEvent);
    }, []);
    
    const handleFiltter = () => {
        navigate('/property', { state: { filters: {status: 'for rent'} } })
    }

    return (
        <section className="container py-12 px-6 mb-18">
            <div className="flex justify-between items-center mb-12">
                <div>
                    <h1 className="text-4xl font-bold text-gray-800 dark:text-gray-200">{t('property.for_rent_title')}</h1>
                    <p className="w-3/4">{t('property.for_rent_description')}</p>
                </div>
                <p onClick={() => handleFiltter()} className="text-blue-500 font-medium flex items-center cursor-pointer whitespace-nowrap">
                    {t('general.see_more')} <ArrowRight className="ml-2" />
                </p>
            </div>

            <div ref={scrollRef}
                className="w-full overflow-x-auto py-6"
                style={{ scrollBehavior: 'smooth', scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                onMouseEnter={() => { isPausedRef.current = true; }}
                onMouseLeave={() => { isPausedRef.current = false; }}>
                <div ref={innerRef} className="flex gap-4 px-2 items-center">
                    {properties.map((property) => (
                        <div key={property.id} className="flex-shrink-0 lg:w-[25.8%] w-[50%]">
                            <PropertyCard property={property} />
                        </div>
                    ))}
                </div>
            </div>


            <div className="flex justify-center gap-2 mt-4">
                {Array.from({ length: number }).map((_, i) => (
                    <button
                        key={i}
                        onClick={() => {
                            scrollToIndex(i);
                            startAutoScroll();
                        }}
                        className={`w-3 h-3 rounded-full transition-all duration-300 ${
                            active === i ? 'bg-sky-700' : 'bg-sky-300'
                        }`}
                    />
                ))}
            </div>
        </section>
    );
};