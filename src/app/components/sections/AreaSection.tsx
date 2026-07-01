import { ArrowRight } from 'react-bootstrap-icons';
import { useEffect } from 'react';
import { useAutoScrollCarousel } from '../../utils/helper';
import { useTranslation } from 'react-i18next';

const AUTO_SCROLL_INTERVAL = 3000;
const GAP = 24;

export const AreaSection = ({ areas }: { areas: any[] }) => {
    const { t, i18n } = useTranslation();

    const { scrollRef, innerRef, active, number, isPausedRef, calculateNumber, scrollToIndex, startAutoScroll, stopAutoScroll, handleScrollEvent,} = useAutoScrollCarousel(areas.length, AUTO_SCROLL_INTERVAL, GAP);

    useEffect(() => {
        calculateNumber();
        scrollToIndex(0);
    }, [areas.length]);

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

    return (
        <section className="container py-16 px-6">
            <div className="flex justify-between items-center mb-10">
                <div>
                    <h1 className="text-4xl font-bold text-gray-800 dark:text-gray-200">
                        {t('area.title')} <span className="text-blue-500"> {t('area.title_2')} </span>
                    </h1>
                    <p className="text-gray-600 dark:text-gray-400 mt-2 w-3/4">
                        {t('area.description')}
                    </p>
                </div>
                <div>
                    <button className="flex items-center text-black font-bold py-2 px-4 rounded-full whitespace-nowrap">
                        {t('general.see_more')} <ArrowRight className="ml-2" />
                    </button>
                </div>
            </div>

            <div
                ref={scrollRef}
                className="w-full overflow-x-auto overflow-hidden py-6"
                style={{ scrollBehavior: 'smooth', scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                onMouseEnter={() => { isPausedRef.current = true; }}
                onMouseLeave={() => { isPausedRef.current = false; }}
            >
                <div ref={innerRef} className="flex gap-5 px-2 items-center">
                    {areas.map((area, index) => (
                        <div
                            key={index}
                            className="flex items-center gap-3 bg-white shadow-lg rounded-xl p-4 min-w-[22rem] flex-shrink-0 cursor-pointer transition-all"
                        >
                            <img
                                src={area.image}
                                className="w-16 h-16 rounded-lg object-cover flex-shrink-0"
                                alt={area[`name_${i18n.language}`]}
                            />
                            <div>
                                <h3 className="font-semibold text-gray-800">{area[`name_${i18n.language}`]}</h3>
                                <p className="text-sm text-gray-500">{area.properties_count} {t('general.properties')}</p>
                            </div>
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
                        className={`h-2 rounded-full transition-all duration-300 ${
                            active === i ? 'bg-gray-900 w-4' : 'bg-gray-300 w-2'
                        }`}
                    />
                ))}
            </div>
        </section>
    );
};