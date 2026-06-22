import { PropertyCard } from "../forms/PropertyCard";
import { PropertyCardV2 } from "../forms/PropertyCardV2";
import { Pagination } from "../ui/Pagination";
import { useState } from "react";


export const PropertyListSection = ({ propertiesData, viewMode }: { propertiesData: any[]; viewMode: "grid" | "list" }) => {

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 6
    const properties = propertiesData;

    const totalPages = Math.ceil(properties.length / itemsPerPage);
    const paginatedProperties = properties.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    )

    return (
        <section className="container py-6 px-6">
            <div className="py-3">
                <div className={`grid gap-4 h-auto ${viewMode === "grid" ? "grid-cols-2" : "grid-cols-1"}`}>
                    { paginatedProperties.map((property) => (
                        <div key={property.id}>
                            {viewMode === "grid" ? <PropertyCard property={property} /> : <PropertyCardV2 property={property} />}
                        </div>
                    ))}
                </div>
                
                <div className="flex justify-center mt-8">
                    <Pagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={(page) => {
                            setCurrentPage(page);
                            window.scrollTo({ top: 0, behavior: 'smooth' });
                        }}
                    />
                </div>
            </div>
        </section>
    );
}