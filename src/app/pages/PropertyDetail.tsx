import { useParams } from "react-router-dom";
import { PropertyDetail } from "../components/sections/PropertyDetail";
import { propertiesData } from "../utils/data";

const PropertyDetailsPage = () => {

    const propertyId = useParams()
    const property = propertiesData.find((property) => property.id === Number(propertyId.id));

    return (
        <main className="min-h-screen bg-gray-50 dark:bg-slate-900 relative top-18 py-12 px-22">
            <PropertyDetail property={property} />
        </main>
    )
}

export default PropertyDetailsPage;