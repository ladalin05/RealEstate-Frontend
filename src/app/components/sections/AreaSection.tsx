import { ArrowRight } from 'react-bootstrap-icons';
import { useEffect } from 'react';
import { useAutoScrollCarousel } from '../../utils/helper';

const AUTO_SCROLL_INTERVAL = 3000;
const GAP = 16;

export const AreaSection = ({ areas }: { areas: any[] }) => {

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
                        Explore by <span className="text-blue-500">Area</span>
                    </h1>
                    <p className="text-gray-600 dark:text-gray-400 mt-2 w-3/4">
                        Highlight the best of your properties by using the List Category shortcode. You can list categories, types, cities, areas and states of your choice.
                    </p>
                </div>
                <div>
                    <button className="flex items-center text-black font-bold py-2 px-4 rounded-full">
                        See more <ArrowRight className="ml-2" />
                    </button>
                </div>
            </div>

            <div
                ref={scrollRef}
                className="w-full overflow-x-auto py-6"
                style={{ scrollBehavior: 'smooth', scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                onMouseEnter={() => { isPausedRef.current = true; }}
                onMouseLeave={() => { isPausedRef.current = false; }}
            >
                <div ref={innerRef} className="flex gap-4 px-2 items-center">
                    {areas.map((area, index) => (
                        <div
                            key={index}
                            className="flex items-center gap-3 bg-white shadow-lg rounded-xl p-4 min-w-[22rem] flex-shrink-0 cursor-pointer transition-all"
                        >
                            <img
                                src={area.image}
                                className="w-16 h-16 rounded-lg object-cover flex-shrink-0"
                                alt={area.name}
                            />
                            <div>
                                <h3 className="font-semibold text-gray-800">{area.name}</h3>
                                <p className="text-sm text-gray-500">{area.count} Properties</p>
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