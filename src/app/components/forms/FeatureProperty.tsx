"use client"

import { useState } from "react"
import { ArrowsAngleExpand } from "react-bootstrap-icons"
import { Heart, MapPin, PlusCircle, ChevronLeft, ChevronRight } from "lucide-react"
import { useTranslation } from "react-i18next"
import { formatPeriod } from "../../utils/helper"


export const FeatureProperty = ({ properties }: { properties: any[] }) => {
    const { t } = useTranslation()
    const [current, setCurrent] = useState(0)
    const total = properties.length

    const prev = () => setCurrent(c => (c - 1 + total) % total)
    const next = () => setCurrent(c => (c + 1) % total)

    if (!properties || total === 0) return null

    return (
        <div className="relative w-full h-auto overflow-hidden rounded-2xl group">
            <div className="flex transition-transform duration-500 ease-in-out" style={{ transform: `translateX(-${current * 100}%)` }}>
                {properties.map((property: any) => (
                    <div key={property.id} className="min-w-full xl:p-6 xl:px-4 p-10 rounded-2xl bg-sky-500/30">
                        <h1 className="text-lg font-bold">{property.name}</h1>
                        <p className="text-md text-gray-500 flex items-center gap-2">
                            <MapPin className="text-blue-500" size={20} />
                            {property.address}
                        </p>

                        <div className="relative xl:mt-4 mt-6">
                            <div className="flex gap-2 absolute top-2 left-2 z-10">
                                <p className="px-3 py-1 rounded-full bg-white text-gray-700 xl:text-xs text-md font-semibold">
                                    {t(`status.${property.status}`)}
                                </p>
                                {property.featured && (
                                    <p className="px-3 py-1 rounded-full bg-blue-500 text-white xl:text-xs text-md font-semibold">
                                        {t('property.featured')}
                                    </p>
                                )}
                            </div>
                            <p className="absolute top-2 right-4 z-10 text-white xl:text-md text-lg font-medium">
                                {t('general.built')} {property.year}
                            </p>
                            <p className="absolute bottom-4 left-4 z-10 xl:text-xl text-2xl font-medium text-white mb-2">
                                {formatPeriod(property.price, t)}
                            </p>
                            <div className="absolute bottom-4 right-4 z-10 flex gap-2">
                                <p className="xl:w-8 xl:h-8 w-9 h-9 bg-black/65 flex items-center justify-center rounded-md">
                                    <ArrowsAngleExpand className="text-white xl:w-4 xl:h-4 w-5.5 h-5.5" />
                                </p>
                                <p className="xl:w-8 xl:h-8 w-9 h-9 bg-black/65 flex items-center justify-center rounded-md">
                                    <Heart className="text-white xl:w-4 xl:h-4 w-5.5 h-5.5" />
                                </p>
                                <p className="xl:w-8 xl:h-8 w-9 h-9 bg-black/65 flex items-center justify-center rounded-md">
                                    <PlusCircle className="text-white xl:w-5 xl:h-5 w-6 h-6" />
                                </p>
                            </div>

                            <img src={property.image} alt={property.name} className="rounded-lg w-full object-cover xl:h-65 h-120" />
                        </div>
                    </div>
                ))}
            </div>
            <button onClick={prev} className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/90 opacity-0 transition-all duration-500 group-hover:opacity-100 hover:bg-white shadow flex items-center justify-center z-20 cursor-pointer" aria-label="Previous">
                <ChevronLeft size={20} className="text-gray-700" />
            </button>
            <button onClick={next} className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/90 opacity-0 transition-all duration-500 group-hover:opacity-100 hover:bg-white shadow flex items-center justify-center z-20 cursor-pointer" aria-label="Next">
                <ChevronRight size={20} className="text-gray-700" />
            </button>
            <div className="flex justify-center gap-2 mt-4 pb-2">
                {properties.map((_, i) => (
                    <button
                        key={i}
                        onClick={() => setCurrent(i)}
                        className={`w-2 h-2 rounded-full transition-all ${
                            i === current ? "bg-blue-500 scale-125" : "bg-gray-300"
                        }`}
                        aria-label={`Go to slide ${i + 1}`}
                    />
                ))}
            </div>
        </div>
    )
}