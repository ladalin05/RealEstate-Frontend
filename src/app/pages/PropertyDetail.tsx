import { useParams } from "react-router-dom";
import { PropertyDetail } from "../components/sections/PropertyDetail";
import { useEffect, useState } from "react";
import { PropertyService } from "../services/property.service";
import { AuthService } from "../services/auth.service";
import { Loading } from "../components/ui/Loading";

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
            <Loading />
        )
    }

    return (
        <main className="min-h-screen bg-gray-50 dark:bg-slate-900 relative top-18 py-12 px-22">
            <PropertyDetail property={property} relatedProperties={relateProperties} latestProperties={lastProperties} />
        </main>
    )
}

export default PropertyDetailsPage;