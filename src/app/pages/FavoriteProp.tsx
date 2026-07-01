import { Camera } from "lucide-react";
import { useState } from "react";
import { propertiesData } from "../utils/data";
import { PropertyCard } from "../components/cards/PropertyCard";

const FavoritePropPage = () => {

    const [activeTab, setActiveTab] = useState('all');
    const properties = propertiesData.filter((property) => property.favorite === true);

    const tabs = [
        { id: 'all', label: 'All', count: 1 },
        { id: 'for-sale', label: 'For Sale', count: 1 },
        { id: 'for-rent', label: 'For Rent', count: 1 },
    ];

    return (
        <div className="min-h-screen p-10 w-full mx-auto">
            <h1 className="font-bold text-2xl">Favorite Properties</h1>
            <p className="text-gray-600 font-light mt-1">Manage your favorite properties</p>
            <div className="w-full mt-6">
                <header className="w-full flex items-center justify-start gap-2">
                    {tabs.map((tab) => (
                        <div key={tab.id} className={`px-4 py-1 rounded-lg text-sm border border-border ${activeTab === tab.id ? 'border-blue-500 bg-blue-100 text-blue-500' : ''}`} onClick={() => setActiveTab(tab.id)}>
                            {tab.label} <span className="ms-1">{tab.count}</span>
                        </div>
                    ))}
                </header>
                <section className="w-full h-[600px]">
                    
                <div className="grid grid-cols-3 gap-4 h-auto py-6">
                    { properties.map((property) => (
                        <div key={property.id}>
                            <PropertyCard property={property} />
                        </div>
                    ))}
                </div>
                </section>
            </div>
        </div>
    );
};

export default FavoritePropPage;