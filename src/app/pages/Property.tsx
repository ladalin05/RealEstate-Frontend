
import { Grid, ListUl } from "react-bootstrap-icons";
import { PropertyListSection } from "../components/sections/PropertyListSection";
import { Filter as FilterSetion } from "../components/sections/Filter";
import { propertiesData as initialPropertiesData } from "../utils/data";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ScrollToTop, filterProperty } from "../utils/helper";


const PropertyPage = () => {
    const location = useLocation();
    const [filter, setFilter] = useState<Record<string, string>>({ search_address: "", search_text: "", area: "", category: "", status: "", rooms: "", bathroom: "", garage: "", features: "", min_area: "", max_area: "", minPrice: "", maxPrice: "", });
    const navigate = useNavigate();
    useEffect(() => {
        if (location.state?.filters) {
            let { search_address, category_id: category, status } = location.state?.filters;
            setFilter({
                ...filter,
                search_address: search_address,
                category: category,
                status: status
            });
            navigate(location.pathname, {
                replace: true,
                state: null, // or {}
            });
        }
    }, [location.state]); 
    const [propertiesData, setPropertiesData] = useState(initialPropertiesData);
    const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
    useEffect(() => {
        filterProperty({filter: filter, setPropertiesData: setPropertiesData, initialPropertiesData: initialPropertiesData})
    }, [filter]);

    return (
        <main className="min-h-screen bg-gray-50 dark:bg-slate-900 relative top-18 py-12 px-22">
            <ScrollToTop />
            <div className="flex w-full">
                <h2 className="text-3xl font-bold">Property List</h2>
            </div>
            <section className="flex w-full">
                <div className="property w-4/6">
                    <div className="flex w-full justify-end">
                        <div className="flex justify-end items-center gap-3 me-6">
                            <ListUl size={20} onClick={() => setViewMode("list")} />
                            <Grid size={18} onClick={() => setViewMode("grid")} />
                        </div>
                    </div>
                    <PropertyListSection propertiesData={propertiesData} viewMode={viewMode} />
                </div>
                <div className="w-2/6 min-h-12 mt-10 py-4">
                    <FilterSetion filter={filter} setFilter={setFilter} />
                </div>
            </section>
        </main>
    )
}

export default PropertyPage;