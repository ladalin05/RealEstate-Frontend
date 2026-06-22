
import { CustomSelect } from "../ui/CustomSelect"
import { getFilterOptions } from "../../utils/data"
import { Search } from "lucide-react";
import { RangeSlider } from "../ui/RangeSlider";



export const Filter = ({ filter, setFilter }: { filter: Record<string, string>; setFilter: React.Dispatch<React.SetStateAction<Record<string, string>>> }) => {
    
    const filterOptions = getFilterOptions();

    
    return (
        <div className="w-full p-4 bg-white dark:bg-slate-800 shadow-xl rounded-lg">
            <div className="flex justify-between items-center py-4 border-b border-gray-300 mb-3">
                <h2 className="text-2xl font-bold">Find Your Home</h2>
            </div>
            <div className="flex flex-col gap-6 pt-4">
                <div className="w-full h-12 flex">
                    <label htmlFor="search_text" className="flex-1 flex items-center p-2 gap-2 border border-gray-200 h-full rounded-sm">
                        <span className="px-1">
                            <Search className="w-5 h-5 text-gray-600"/>
                        </span>
                        <input type="text" name="search_text" id="search_text" value={filter.search_text} onChange={(e) => setFilter({...filter, search_text: e.target.value})} placeholder="Search Property" className="w-full h-full focus:outline-none" />
                    </label>
                </div>
                {Object.entries(filterOptions).map(([label, config]) => {
                        const Icon = config.icon;

                        return (
                            <div key={label} className="w-auto h-12">
                            <CustomSelect
                                label={label}
                                icon={Icon}
                                options={config.options}
                                value={filter[label.toLowerCase()]}
                                className="w-full rounded-sm border border-gray-200"
                                onChange={(value) =>
                                setFilter({
                                    ...filter,
                                    [label.toLowerCase()]: value,
                                })
                                }
                            />
                            </div>
                        );
                    })}
                    <div className="flex justify-between gap-4">
                        <div className="flex w-full h-14 border border-gray-200 rounded-sm">
                            <input type="text" value={filter?.min_area} onChange={(e) => setFilter({...filter, min_area: e.target.value})} className="w-full h-full focus:outline-none p-4" placeholder="Min Area (sq ft)" />
                        </div>
                        <div className="flex w-full h-14 border border-gray-200 rounded-sm">
                            <input type="text" value={filter?.max_area} onChange={(e) => setFilter({...filter, max_area: e.target.value})} className="w-full h-full focus:outline-none p-4" placeholder="Max Area (sq ft)" />
                        </div>
                    </div>
                    <div className="flex flex-col gap-4">
                        <h2 className="text-xl">Rooms</h2>
                        <div className="flex justify-center">
                            <button className={`w-16 h-15 border border-gray-200 hover:border-blue-400 rounded-l-sm ${filter.rooms === "all" ? "border-blue-400" : ""}`}
                                    onClick={() => setFilter({ ...filter, rooms: "all" })}
                                    >All</button>
                            {Array.from({length: 5}).map((_, index) => (
                                <button key={index} className={`w-16 h-15 border border-gray-200 hover:border-blue-400 ${filter.rooms === (index + 1).toString() ? "border-blue-400" : ""}`}
                                    onClick={() => setFilter({ ...filter, rooms: (index + 1).toString() })}
                                    >{index + 1}</button>
                            ))}
                            <button className={`w-16 h-15 border border-gray-200 hover:border-blue-400 rounded-r-sm ${filter.rooms === "6+" ? "border-blue-400" : ""}`}
                                    onClick={() => setFilter({ ...filter, rooms: "6+" })}
                                    >6+</button>
                        </div>
                    </div>
                    <div className="flex flex-col gap-4">
                        <h2 className="text-xl">Price</h2>
                        <RangeSlider filter={filter} setFilter={setFilter} />
                    </div>
            </div>
        </div>
    )
}