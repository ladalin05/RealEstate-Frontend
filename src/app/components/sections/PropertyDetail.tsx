import { Share, GeoAlt, Heart, Printer, CarFrontFill } from "react-bootstrap-icons";
import { Map, BedDouble, ShowerHead, TriangleRight, CalendarDays, Paperclip, CircleCheck, User, Mail, Phone } from "lucide-react";
import { useState } from "react";
import { PropertyCard } from "../cards/PropertyCard";
import { RequestInfo, ScheduleTour } from "../forms/ScheduleTour";
import { PropImags } from "./PropDetailCom";
import { convertFromISO } from "../../utils/helper";
import { useTranslation } from "react-i18next";
 


export const PropertyDetail = ({ property, relatedProperties, latestProperties }: { property: any, relatedProperties: any[], latestProperties: any[] }) => {
    const { t, i18n } = useTranslation();
    const [tourOpen, setTourOpen] = useState(false);

    const images = [property?.image, ...(property?.gallery || [])] as string[];

    const handleScheduleTour = () => {
        setTourOpen(true);
    };
    const handleRequestInfo = () => {
        setTourOpen(false);
    };

    const details = [
        { value: property?.category, label: t('hero.property_type') },
        { icon: BedDouble, value: property?.bedrooms, label: t('property.bedrooms') },
        { icon: ShowerHead, value: property?.bathrooms, label: t('property.bathrooms') },
        { icon: CarFrontFill, value: property?.garages, label: t('property.garage') },
        { icon: TriangleRight, value: property?.size, label: t('property.area_size') },
        { icon: CalendarDays, value: property?.yearBuilt, label: t('property.bathrooms') },
    ];

    const addressDetails = [
        { label: t('general.address'), value: property?.address },
        { label: t('property.state_county'), value: property?.addressDetail?.state },
        { label: t('property.area'), value: property?.addressDetail?.area },
        { label: t('property.province'), value: property?.addressDetail?.province },
        { label: t('property.zip_postal_code'), value: property?.addressDetail?.zip },
        { label: t('property.country'), value: property?.addressDetail?.country },
    ];

    const propertyDetails = [
        {label: t('property.property_id'), value: property?.code},
        {label: t('property.property_size'), value: property?.size},
        {label: t('property.bathrooms'), value: property?.bathrooms},
        {label: t('property.garage_size'), value: "N/A"},
        {label: t('property.property_type'), value: property?.[`category_${i18n.language}`]},
        {label: t('property.price'), value: property?.price},
        {label: t('property.bedrooms'), value: property?.bedrooms},
        {label: t('property.garage'), value: property?.garages},
        {label: t('property.year_built'), value: property?.yearBuilt},
        {label: t('property.property_status'), value: t(`filter.purpose.${property?.purpose}`)},
    ]

    return (
        <section className="container py-3 px-6 scroll-smooth">
            <div className="flex justify-between items-start mb-12 w-full mx-auto">
                <div className="w-2/3">
                    <h1 className="lg:text-3xl text-2xl font-medium text-gray-800 dark:text-gray-200 mb-3 break-normal">{property?.name}</h1>
                    <p className="text-gray-600 dark:text-gray-400 flex items-center text-sm mb-5"><GeoAlt className="me-2" /><span>{property?.address}</span></p>
                    <div className="flex items-center gap-3">
                        { property?.featured && (
                            <p className="z-10 bg-lime-500 text-white text-xs font-normal py-2 px-3 rounded-sm uppercase">{t('property.featured')}</p>
                        )}
                        <p className="z-10 bg-black/65 text-white text-xs font-normal py-2 px-3 rounded-sm uppercase">{property?.status}</p>
                    </div>
                </div>
                <div className="w-1/3">
                    <div className="flex gap-2 transition-opacity mb-3 justify-end">
                        <p className="lg:w-9 lg:h-9 w-7 h-7 border border-black/65 flex items-center justify-center rounded-sm"> <Heart className="text-black/65 lg:w-5 lg:h-5 w-3 h-3" /> </p>
                        <p className="lg:w-9 lg:h-9 w-7 h-7 border border-black/65 flex items-center justify-center rounded-sm"> <Share className="text-black/65 lg:w-5 lg:h-5 w-3 h-3" /> </p>
                        <p className="lg:w-9 lg:h-9 w-7 h-7 border border-black/65 flex items-center justify-center rounded-sm"> <Printer className="text-black/65 lg:w-5 lg:h-5 w-3 h-3" /> </p>
                    </div>
                    <p className="lg:text-3xl text-xl font-bold text-slate-800 mb-2 text-end">{property?.price}</p>
                </div>
            </div>
            <div className="w-full mt-8 mx-auto">
                <div className="grid lg:grid-cols-6 grid-cols-1 gap-4">
                    <div className="lg:col-span-4">
                        <PropImags images={images} latitude={property?.latitude} longitude={property?.longitude} />
                        <div className="mt-8 mx-auto p-5 bg-white rounded-sm shadow-sm">
                            <div className="flex items-center justify-between mb-4">
                                <h2 className="text-md font-medium text-gray-800 dark:text-gray-200 mb-2">{t('general.overview')}</h2>
                                <p className="text-sm text-gray-600 dark:text-gray-400"><span className="font-bold">{t('property.property_id')}</span>: {property?.code}</p>
                            </div>
                            <hr className="border-gray-400 "/>
                            <div className="flex items-center justify-between gap-6 mt-4 px-6">
                                {details.map((detail, index) => (
                                    <div className="" key={index}>
                                        <h2 className={`text-sm font-semibold mb-1${detail.icon ? ' flex items-center gap-2' : ''}`}>
                                            {detail.icon ? <detail.icon size={20} className="text-gray-400 dark:text-gray-400" /> : null}
                                            {detail.value}
                                        </h2>
                                        <p className="text-sm text-gray-400 dark:text-gray-400">{detail.label}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="mt-8 mx-auto p-5 bg-white rounded-sm shadow-sm">
                            <div className="flex items-center justify-between mb-4">
                                <h2 className="text-md font-medium text-gray-800 dark:text-gray-200 mb-2">{t('general.description')}</h2>
                            </div>
                            <hr className="border-gray-400 mb-6"/>
                            <p className="text-sm text-gray-600 dark:text-gray-400 leading-5">
                                {property?.description}
                            </p>
                        </div>
                        <div className="mt-8 mx-auto p-6 bg-white rounded-sm shadow-sm">
                            <div className="flex items-center justify-between mb-4">
                                <h2 className="text-md font-medium text-gray-800 dark:text-gray-200 mb-2">{t('general.address')}</h2>
                                <a href="#" className="text-sm font-medium bg-sky-400 p-1 rounded-sm  text-white flex items-center gap-1"><Map size={17} /> {t('property.open_on_map')}</a>
                            </div>
                            <hr className="border-gray-400 mb-6"/>
                            <div className="mt-4">
                                <div className="grid grid-cols-2 gap-6 pb-2">
                                    <div className="">
                                        {addressDetails.slice(0, 3).map((detail, index) => (
                                            <div className="flex justify-between items-center py-3 border-b border-gray-300" key={index}>
                                                <span className="text-sm font-semibold text-gray-900">{detail.label}:</span>
                                                <span className="text-sm text-gray-500">{detail.value}</span>
                                            </div>
                                        ))}
                                    </div>
                                    <div className="">
                                        {addressDetails.slice(3, 6).map((detail, index) => (
                                            <div className="flex justify-between items-center py-3 border-b border-gray-300" key={index}>
                                                <span className="text-sm font-semibold text-gray-900">{detail.label}:</span>
                                                <span className="text-sm text-gray-500">{detail.value}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="mt-8 mx-auto p-6 bg-white rounded-sm shadow-sm">
                            <div className="flex items-center justify-between mb-4">
                                <h2 className="text-md font-medium text-gray-800 dark:text-gray-200 mb-2">{t('general.details')}</h2>
                                <a href="#" className="text-xs text-gray-600 dark:text-gray-400 flex items-center gap-1"><Paperclip size={14} /> {t('property.updated_on')} {property?.updateDate ? convertFromISO({ isoString: (property?.updateDate as string) }) : ''}</a>
                            </div>
                            <hr className="border-gray-400 mb-6"/>
                            <div className="border-1 border-sky-400 rounded-sm p-4 bg-sky-50">
                                <div className="grid grid-cols-2 gap-6 pb-2">
                                    <div className="">
                                        {propertyDetails.slice(0, 5).map((detail, index) => (
                                            <div key={index} className="flex justify-between items-center py-3 border-b border-gray-300">
                                                <span className="text-sm font-semibold text-gray-900">{detail.label}:</span>
                                                <span className="text-sm text-gray-500">{detail.value}</span>
                                            </div>
                                        ))}
                                    </div>
                                    <div className="">
                                        {propertyDetails.slice(5, 10).map((detail, index) => (
                                            <div key={index} className="flex justify-between items-center py-3 border-b border-gray-300">
                                                <span className="text-sm font-semibold text-gray-900">{detail.label}:</span>
                                                <span className="text-sm text-gray-500">{detail.value}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-center justify-between mt-9">
                                <h2 className="text-md font-medium text-gray-800 dark:text-gray-200 mb-2">{t('property.additional_details')}</h2>
                            </div>
                            <hr className="border-gray-400 mb-6"/>
                            <div className="mt-4">
                                <div className="grid grid-cols-2 gap-6 pb-2">
                                    {Object.entries(property?.additionalDetails || {}).map(([key, value]) => (
                                        <div className="flex justify-between items-center py-1 border-b border-gray-300" key={key}>
                                            <span className="text-sm font-semibold text-gray-900">{key}:</span>
                                            <span className="text-sm text-gray-500">{value.toString()}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                        <div className="mt-8">
                            <div className="grid grid-cols-3 gap-1">
                                {images.map((image, index) => (
                                    <div key={index} className="w-full h-auto rounded-sm overflow-hidden">
                                        <img key={index} src={image} alt={`Thumbnail ${index + 1}`} className="w-full h-full object-cover" />
                                    </div>
                                ))}
                            </div>
                        </div>
                        
                        <div className="mt-8 mx-auto p-6 bg-white rounded-sm shadow-sm">
                            <div className="flex items-center justify-between mb-4">
                                <h2 className="text-md font-medium text-gray-800 dark:text-gray-200 mb-2">{t('property.features')}</h2>
                            </div>
                            <hr className="border-gray-400 mb-6"/>
                            <div className="grid grid-cols-3 gap-4">
                                {property?.amenities ? property.amenities.map((feature: string, index: number) => (
                                    <div key={index} className="flex items-center">
                                        <CircleCheck size={16} className="text-green-500 mr-2" />
                                        <span className="text-sm text-gray-600 dark:text-gray-400">{feature}</span>
                                    </div>
                                )) : <div>
                                    <CircleCheck size={16} className="text-green-500 mr-2" />
                                        <span className="text-sm text-gray-600 dark:text-gray-400">{t('property.no_amenties_available')}</span>
                                </div>}
                            </div>
                        </div>
                        <div className="mt-8 mx-auto p-6 bg-white rounded-sm shadow-sm">
                            <div className="flex items-center justify-between mb-4">
                                <h2 className="text-md font-medium text-gray-800 dark:text-gray-200 mb-2">{t('property.video')}</h2>
                            </div>
                            <hr className="border-gray-400 mb-6"/>
                            <div className="relative w-full" style={{ paddingBottom: "56.25%" }}>
                                <iframe
                                    className="absolute top-0 left-0 w-full h-full rounded-lg"
                                    src={property?.videoTour}
                                    title="YouTube video"
                                    frameBorder="0"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                />
                            </div>
                        </div>
                        <div className="mt-8 mx-auto p-6 bg-white rounded-sm shadow-sm">
                            <div className="flex items-center justify-between mb-4">
                                <h2 className="text-md font-medium text-gray-800 dark:text-gray-200 mb-2">{t('property.contact_information')}</h2>
                                <a href="#" className="text-sm font-medium bg-sky-400 p-1 rounded-sm  text-white flex items-center gap-1">{t('general.view_listing')}</a>
                            </div>
                            <hr className="border-gray-400 mb-6"/>
                            <div className="mt-4">
                                <div className="flex items-center ">
                                    <div className="rounded-full w-12 h-12">
                                        <img src={property?.agent?.image} alt="" className="rounded-full w-full h-full" />
                                    </div>
                                    <div className="ms-4">
                                        <p className="text-sm text-gray-800 dark:text-gray-200 flex items-center gap-1"><User size={16} /> {property?.agent?.name}</p>
                                        <div className="flex items-center gap-3 mt-2">
                                            <p className="text-sm text-gray-500 flex items-center gap-1"><Phone size={16} /> {property?.agent?.phone}</p>
                                            <p className="text-sm text-gray-500 flex items-center gap-1"><Mail size={16} /> {property?.agent?.email}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <div className="mt-8 mx-auto p-5 rounded-sm ">
                            <div className="flex items-center justify-between mb-4">
                                <h2 className="text-md font-medium text-gray-800 dark:text-gray-200 mb-2">{t('general.similar_listings')}</h2>
                            </div>
                            <hr className="border-gray-400 mb-6"/>
                            <div className="grid grid-cols-2 gap-6">
                                {relatedProperties.map((properties, index) => (
                                    <PropertyCard key={index} property={properties} />
                                ))}

                            </div>
                        </div>
                    </div>
                    <div className="lg:col-span-2 lg:mt-0 mt-10">
                        <div className="shadow-lg bg-white rounded-md overflow-hidden">
                            <div className="flex items-center">
                                <div className="w-1/2 text-center" onClick={() => handleScheduleTour()}>
                                    <p className={`text-md font-semibold ${tourOpen ? 'rounded-t-md text-gray-800 bg-white dark:text-gray-200' : 'text-sky-500 dark:text-sky-200 bg-gray-50'} py-4`}>Schedule a Tour</p>
                                </div>
                                <div className="w-1/2 text-center" onClick={() => handleRequestInfo()}> 
                                    <p className={`text-md font-semibold ${tourOpen ? 'text-sky-500 dark:text-sky-200 bg-gray-50' : 'rounded-t-md text-gray-800 bg-white dark:text-gray-200'} py-4`}>Request Info</p>
                                </div>
                            </div>
                            {tourOpen ? (
                                <div>
                                    <ScheduleTour agent={property?.agent} />
                                </div>
                            ) : (
                                <div>
                                    <RequestInfo agent={property?.agent} />
                                </div>
                            )}
                            
                        </div>
                    </div>
                </div>
            </div>

        </section>
    );
}