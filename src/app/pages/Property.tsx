import { Grid, ListUl } from "react-bootstrap-icons";
import { PropertyListSection } from "../components/sections/PropertyListSection";
import { Filter as FilterSection } from "../components/sections/Filter";
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

    const [filter, setFilter] = useState(() => {
        const incoming = location.state?.filters;
        console.log(incoming)
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

    const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    const isFirstRun = useRef(true);

    const hasFilter = (f: typeof filter) =>
        !!(f.search || f.category_id || f.area_id || f.purpose || f.furnishing || f.bathrooms || f.rooms || f.min_price || f.max_price);

    const fetchData = (dataFilter: typeof filter, setIsLoading: (value: boolean) => void) => {
        const request = hasFilter(dataFilter)
            ? PropertyService.filterProperties(dataFilter)
            : PropertyService.getProperties();

        request
            .then((data) => setPropertiesData(data))
            .finally(() => setIsLoading(false));
    };

    const filterData = (currentFilter: typeof filter) => {
        setIsFilterLoading(true);
        fetchData(currentFilter, setIsFilterLoading);
    };


    useEffect(() => {
        if (location.state?.filters) {
            navigate(location.pathname, { replace: true, state: null });
        }
    }, []);

    useEffect(() => {
        if (isFirstRun.current) {
            isFirstRun.current = false;
            setIsInitialLoading(true);
            fetchData(filter, setIsInitialLoading);
            return;
        }

        if (debounceRef.current) clearTimeout(debounceRef.current);
        debounceRef.current = setTimeout(() => filterData(filter), 400);
        return () => { if (debounceRef.current) clearTimeout(debounceRef.current); };
    }, [filter]);

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
                        onClick={() => setFilter({
                            search: '', category_id: '', area_id: '', purpose: '',
                            furnishing: '', bathrooms: '', rooms: '',
                            min_price: '', max_price: '',
                            sort_by: 'properties.id', sort_dir: 'desc',
                        })}
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
                                : `${propertiesData.length} ${t('property.properties_found')}`}
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
                            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-sky-500" />
                        </div>
                    ) : propertiesData.length === 0 ? (
                        <div className="w-full flex flex-col items-center justify-center py-32 text-gray-400">
                            <p className="text-lg font-medium mb-1">{t('property.no_properties_found')}</p>
                            <p className="text-sm">{t('property.try_adjusting_filters')}</p>
                        </div>
                    ) : (
                        <PropertyListSection propertiesData={propertiesData} viewMode={viewMode} />
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