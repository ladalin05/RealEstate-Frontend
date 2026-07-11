import { PropertyCard } from "../cards/PropertyCard";
import { PropertyCardV2 } from "../cards/PropertyCardV2";

export const PropertyListSection = ({ propertiesData, viewMode }: { propertiesData: any[]; viewMode: "grid" | "list" }) => {
    return (
        <section className="container py-6 px-6">
            <div className="py-3">
                <div className={`grid gap-4 h-auto ${viewMode === "grid" ? "grid-cols-1 md:grid-cols-2" : "grid-cols-1"}`}>
                    {propertiesData.map((property) => (
                        <div key={property.id}>
                            {viewMode === "grid" ? <PropertyCard property={property} /> : <PropertyCardV2 property={property} />}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};