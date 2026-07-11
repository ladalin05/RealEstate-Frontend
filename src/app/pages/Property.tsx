import { Grid, ListUl } from "react-bootstrap-icons";
import { PropertyListSection } from "../components/sections/PropertyListSection";
import { Filter as FilterSection } from "../components/sections/Filter";
import { Pagination } from "../components/ui/Pagination";
import { Loading } from "../components/ui/Loading";
import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ScrollToTop } from "../utils/helper";
import { PropertyService } from "../services/property.service";
import { useTranslation } from "react-i18next";

const defaultFilter = {
    search: '', category_id: '', area_id: '', purpose: '',
    furnishing: '', bathrooms: '', rooms: '',
    min_price: '', max_price: '',
    sort_by: 'properties.id', sort_dir: 'desc',
};

const PropertyPage = () => {
    const { t } = useTranslation();
    const location = useLocation();
    const navigate = useNavigate();

    const [viewMode,         setViewMode]         = useState<"grid" | "list">("grid");
    const [propertiesData,   setPropertiesData]   = useState<any[]>([]);
    const [isInitialLoading, setIsInitialLoading] = useState(true);
    const [isFilterLoading,  setIsFilterLoading]  = useState(false);

    // pagination state (server-driven)
    const [page, setPage]         = useState(1);
    const [lastPage, setLastPage] = useState(1);
    const [total, setTotal]       = useState(0);
    const limit = 10;

    const [filter, setFilter] = useState(() => {
        const incoming = location.state?.filters;
        if (!incoming) return defaultFilter;
        const { search_address, category_id, area_id, purpose } = incoming;
        return {
            ...defaultFilter,
            ...(search_address  ? { search: search_address }  : {}),
            ...(category_id     ? { category_id } : {}),
            ...(area_id  ? { area_id }  : {}),
            ...(purpose  ? { purpose }  : {}),
        };
    });

    // the value actually used to fetch, updated (debounced) after `filter` settles
    const [debouncedFilter, setDebouncedFilter] = useState(filter);

    const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    const isFirstRender = useRef(true);

    const hasFilter = (f: typeof filter) =>
        !!(f.search || f.category_id || f.area_id || f.purpose || f.furnishing || f.bathrooms || f.rooms || f.min_price || f.max_price);

    // consume incoming nav-state filters once, then clear them
    useEffect(() => {
        if (location.state?.filters) {
            navigate(location.pathname, { replace: true, state: null });
        }
    }, []);

    // debounce filter changes -> reset to page 1 -> commit to debouncedFilter
    useEffect(() => {
        if (isFirstRender.current) return; // skip on mount, debouncedFilter already == filter

        if (debounceRef.current) clearTimeout(debounceRef.current);
        debounceRef.current = setTimeout(() => {
            setPage(1);
            setDebouncedFilter(filter);
        }, 400);

        return () => { if (debounceRef.current) clearTimeout(debounceRef.current); };
    }, [filter]);

    // single source of truth for fetching — fires on mount, on page change,
    // and once per debounced filter change. Never double-fetches.
    useEffect(() => {
        const isFirst = isFirstRender.current;
        const setLoading = isFirst ? setIsInitialLoading : setIsFilterLoading;
        setLoading(true);

        const request = hasFilter(debouncedFilter)
            ? PropertyService.filterProperties(debouncedFilter, page, limit)
            : PropertyService.getProperties(page, limit);

        request
            .then((result) => {
                setPropertiesData(result.data ?? []);
                setLastPage(result.last_page ?? 1);
                setTotal(result.total ?? 0);
            })
            .finally(() => {
                setLoading(false);
                isFirstRender.current = false;
            });
    }, [debouncedFilter, page]);

    if (isInitialLoading) {
        return <Loading />;
    }

    return (
        <main className="min-h-screen bg-gray-50 dark:bg-slate-900 relative top-18 py-12 px-10">
            <ScrollToTop />

            <div className="flex w-full items-center justify-between mb-4 px-4">
                <h2 className="text-3xl font-bold">{t('property.title')}</h2>
                {hasFilter(filter) && (
                    <button
                        onClick={() => setFilter({ ...defaultFilter })}
                        className="text-sm text-red-400 border border-red-300 px-3 py-1 rounded-sm hover:bg-red-50 transition"
                    >
                        {t('property.clear_filter')}
                    </button>
                )}
            </div>

            <section className="grid xl:grid-cols-6 grid-cols-1">
                <div className="xl:col-span-4">
                    <div className="flex w-full justify-between items-center mb-3 ps-4">
                        <p className="text-sm text-gray-400">
                            {isFilterLoading
                                ? "Loading..."
                                : `${total} ${t('property.properties_found')}`}
                        </p>
                        <div className="flex items-center gap-3 me-6">
                            <ListUl
                                size={20}
                                className={`cursor-pointer ${viewMode === "list" ? "text-sky-500" : "text-gray-400"}`}
                                onClick={() => setViewMode("list")}
                            />
                            <Grid
                                size={18}
                                className={`cursor-pointer ${viewMode === "grid" ? "text-sky-500" : "text-gray-400"}`}
                                onClick={() => setViewMode("grid")}
                            />
                        </div>
                    </div>
                    
                    {isFilterLoading ? (
                        <div className="w-full flex items-center justify-center py-32">
                            <div className="relative w-20 h-20 flex items-center justify-center">
                                <div className="absolute inset-0 rounded-full border-4 border-[#0d1b2a]/10 border-t-[#0d1b2a] border-r-[#f2a541] animate-spin" />

                                <svg width="30" height="26" viewBox="0 0 34 30" fill="none" className="relative z-10">
                                    <path d="M4 28L15 4L17 9L8 28H4Z" fill="#0d1b2a" />
                                    <path d="M15 4L26 28H30L17 0L15 4Z" fill="#0d1b2a" />
                                    <path d="M20 10L30 6L26 15L20 10Z" fill="#f2a541" />
                                </svg>
                                <div className="flex gap-1.5 mt-1">
                                <span className="w-1.5 h-1.5 rounded-full bg-[#0d1b2a] animate-bounce [animation-delay:-0.3s]" />
                                <span className="w-1.5 h-1.5 rounded-full bg-[#0d1b2a] animate-bounce [animation-delay:-0.15s]" />
                                <span className="w-1.5 h-1.5 rounded-full bg-[#0d1b2a] animate-bounce" />
                            </div>
                            </div>
                            
                        </div>
                    ) : propertiesData.length === 0 ? (
                        <div className="w-full flex flex-col items-center justify-center py-32 text-gray-400">
                            <p className="text-lg font-medium mb-1">{t('property.no_properties_found')}</p>
                            <p className="text-sm">{t('property.try_adjusting_filters')}</p>
                        </div>
                    ) : (
                        <>
                            <PropertyListSection propertiesData={propertiesData} viewMode={viewMode} />

                            {lastPage > 1 && (
                                <div className="flex justify-center mt-8">
                                    <Pagination
                                        currentPage={page}
                                        totalPages={lastPage}
                                        onPageChange={(p) => {
                                            setPage(p);
                                            window.scrollTo({ top: 0, behavior: "smooth" });
                                        }}
                                    />
                                </div>
                            )}
                        </>
                    )}
                </div>

                <div className="xl:col-span-2 min-h-12 mt-10 py-4">
                    <FilterSection filter={filter} setFilter={setFilter} />
                </div>
            </section>
        </main>
    );
};

export default PropertyPage;