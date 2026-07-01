import { useParams } from "react-router-dom";
import { PropertyDetail } from "../components/sections/PropertyDetail";
import { propertiesData } from "../utils/data";
import { useEffect, useState } from "react";
import { PropertyService } from "../services/property.service";
import { AuthService } from "../services/auth.service";

const PropertyDetailsPage = () => {

    const propertyId = useParams()
    const user = AuthService.getUser();
    const [property,  setProperty] = useState([]);
    const [relateProperties, setRelateProperties] = useState([]);
    const [lastProperties, setLastProperties] = useState([]);
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        setLoading(true)
        PropertyService.getPropertyDetail({
            propertyId: Number(propertyId.id),
            userId: user?.id ?? null
        }).then((res) => {
            setProperty(res.property);
            setRelateProperties(res.related_list)
            setLastProperties(res.latest_list)
        }).finally(() => {
            setLoading(false)
        })
    }, []);

    if (loading) {
        return (
            <main className="min-h-full w-full fixed top-0  bg-gray-50 dark:bg-slate-900  py-12 px-22">
                <div className="flex items-center justify-center h-screen">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
                </div>
            </main>
        )
    }



    return (
        <main className="min-h-screen bg-gray-50 dark:bg-slate-900 relative top-18 py-12 px-22">
            <PropertyDetail property={property} relatedProperties={relateProperties} latestProperties={lastProperties} />
        </main>
    )
}

export default PropertyDetailsPage;