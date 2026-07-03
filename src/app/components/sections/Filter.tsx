import { CustomSelect } from "../ui/CustomSelect"
import { Search, MapPin, House, LayoutGrid, Bath, ListCheck } from "lucide-react";
import { RangeSlider } from "../ui/RangeSlider";
import { useEffect, useState } from "react";
import { PropertyService } from "../../services/property.service";
import { useTranslation } from 'react-i18next';

interface FilterData {
    areas:      { id: number; name: string }[];
    categories: { id: number; name: string }[];
    feature:    { id: number; name: string }[];
}

export const Filter = ({ filter, setFilter, }: {
        filter: Record<string, string>;
        setFilter: React.Dispatch<React.SetStateAction<Record<string, string>>>;
    }) => {
    const { t, i18n } = useTranslation();
    const [filterData, setFilterData] = useState<FilterData>({
        areas:      [],
        categories: [],
        feature:    [],
    });

    useEffect(() => {
        PropertyService.getDataFillter().then((data) => {
            setFilterData(data);
        });
    }, []);

    const filterOptions = {
        Area: {
            icon: MapPin,
            key: "area_id",
            options: [
                { label: t('filter.all_areas'), value: "" },
                ...filterData.areas.map((a) => ({ label: a[`name_${i18n.language}`], value: String(a.id) })),
            ],
        },
        Purpose: {
            icon: House,
            key: "purpose",
            options: [
                { label: t('filter.purpose.all_purpose'), value: "" },
                { label: t('filter.purpose.sale'),    value: "sale" },
                { label: t('filter.purpose.rent'),    value: "rent" },
                { label: t('filter.purpose.sale_rent'), value: "sale_rent" },
            ],
        },
        Category: {
            icon: LayoutGrid,
            key: "category_id",
            options: [
                { label: t('filter.all_type'), value: "" },
                ...filterData.categories.map((c) => ({ label: c[`name_${i18n.language}`], value: String(c.id) })),
            ],
        },
        Bathroom: {
            icon: Bath,
            key: "bathrooms",
            options: [
                { label: t('filter.bathrooms'), value: "" },
                { label: "1", value: "1" },
                { label: "2", value: "2" },
                { label: "3", value: "3" },
                { label: "4", value: "4" },
                { label: "5+", value: "5" },
            ],
        },
        Feature: {
            icon: ListCheck,
            key: "feature_id",
            options: [
                { label: t('filter.all_features'), value: "" },
                ...filterData.feature.map((f) => ({ label: f.name, value: String(f.id) })),
            ],
        },
    };

    return (
        <div className="w-full p-4 bg-white dark:bg-slate-800 shadow-xl rounded-lg">
            <div className="flex justify-between items-center py-4 border-b border-gray-300 mb-3">
                <h2 className="text-2xl font-bold">{t('filter.find_your_home')}</h2>
            </div>
            <div className="flex flex-col gap-6 pt-4">

                {/* Search */}
                <div className="w-full h-12 flex">
                    <label htmlFor="search" className="flex-1 flex items-center p-2 gap-2 border border-gray-200 h-full rounded-sm">
                        <span className="px-1">
                            <Search className="w-5 h-5 text-gray-600" />
                        </span>
                        <input type="text" id="search" value={filter.search} onChange={(e) => setFilter({ ...filter, search: e.target.value })}
                            placeholder={t('filter.search_property')} className="w-full h-full focus:outline-none font-bold" />
                    </label>
                </div>

                {/* Dynamic selects from API */}
                {Object.entries(filterOptions).map(([label, config]) => {
                    const Icon = config.icon;
                    return (
                        <div key={label} className="w-auto h-12">
                            <CustomSelect label={label} icon={Icon} options={config.options} value={filter[config.key] ?? ""}
                                className="w-full rounded-sm border border-gray-200" onChange={(value) => setFilter({ ...filter, [config.key]: value })}
                            />
                        </div>
                    );
                })}

                {/* Rooms */}
                <div className="flex flex-col gap-4">
                    <h2 className="text-xl">{t('filter.rooms')}</h2>
                    <div className="flex justify-center">
                        <button
                            className={`w-16 h-15 border border-gray-200 hover:border-blue-400 rounded-l-sm ${filter.rooms === "" ? "border-blue-400" : ""}`}
                            onClick={() => setFilter({ ...filter, rooms: "" })}
                        >
                            {t('filter.all')}
                        </button>
                        {Array.from({ length: 5 }).map((_, i) => (
                            <button
                                key={i}
                                className={`w-16 h-15 border border-gray-200 hover:border-blue-400 ${filter.rooms === String(i + 1) ? "border-blue-400" : ""}`}
                                onClick={() => setFilter({ ...filter, rooms: String(i + 1) })}
                            >
                                {i + 1}
                            </button>
                        ))}
                        <button
                            className={`w-16 h-15 border border-gray-200 hover:border-blue-400 rounded-r-sm ${filter.rooms === "6" ? "border-blue-400" : ""}`}
                            onClick={() => setFilter({ ...filter, rooms: "6" })}
                        >
                            6+
                        </button>
                    </div>
                </div>

                {/* Price range */}
                <div className="flex flex-col gap-4">
                    <h2 className="text-xl">{t('filter.price')}</h2>
                    <RangeSlider filter={filter} setFilter={setFilter} />
                </div>
            </div>
        </div>
    );
};