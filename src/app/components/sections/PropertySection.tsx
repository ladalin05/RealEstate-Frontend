import { ArrowRight } from "react-bootstrap-icons";
import { PropertyCard } from "../forms/PropertyCard";
import { useState } from "react";


export const PropertySection = ({propertiesData}: {propertiesData: any}) => {
    const [numOfProp, setNumOfProp] = useState(8);
    const properties = propertiesData.slice(0, numOfProp);
    const addPropMore = () => {
        setNumOfProp((prev) => prev + 4);
    };


    return (
        <section className="container py-12 px-6">
            <div className="flex justify-between items-center mb-12">
                <div className="">
                    <h1 className="text-4xl font-bold text-gray-800 dark:text-gray-200">Discover Featured Homes</h1>
                    <p>Explore a curated selection of properties that showcase the best opportunities for living and investing.</p>
                </div>
                <a href="/property" className="text-blue-500 font-medium flex items-center">See more <ArrowRight className="ml-2" /></a>
            </div>
            <div className="py-3">
                <div className="grid grid-cols-4 gap-4 h-auto">
                    { properties.map((property) => (
                        <div key={property.id}>
                            <PropertyCard property={property} />
                        </div>
                    ))}
                </div>
            </div>
            <div className="flex justify-center mt-8">
                <button type="button" onClick={() => addPropMore()} className="border-2 border-blue-500 bg-blue-500 hover:bg-white hover:text-blue-500 text-white font-bold py-2 px-8 rounded">
                    Load More
                </button>
            </div>
        </section>
    );
}