"use client"

import { useState } from "react"
import { ArrowsAngleExpand } from "react-bootstrap-icons"
import { Heart, MapPin, PlusCircle, ChevronLeft, ChevronRight } from "lucide-react"

export const FeatureProperty = ({ properties }: { properties: any[] }) => {
    const [current, setCurrent] = useState(0)
    const total = properties.length

    const prev = () => setCurrent(c => (c - 1 + total) % total)
    const next = () => setCurrent(c => (c + 1) % total)

    if (!properties || total === 0) return null

    return (
        <div className="relative w-full overflow-hidden rounded-2xl group">
            <div className="flex transition-transform duration-500 ease-in-out" style={{ transform: `translateX(-${current * 100}%)` }}>
                {properties.map((property: any) => (
                    <div key={property.id} className="min-w-full p-6 px-4 rounded-2xl bg-sky-500/30">
                        <h1 className="text-lg font-bold">{property.name}</h1>
                        <p className="text-md text-gray-500 flex items-center gap-2">
                            <MapPin className="text-blue-500" size={20} />
                            {property.address}
                        </p>

                        <div className="relative mt-4">
                            <div className="flex gap-2 absolute top-2 left-2 z-10">
                                <p className="px-3 py-1 rounded-full bg-white text-gray-700 text-xs font-semibold">
                                    {property.status}
                                </p>
                                {property.featured && (
                                    <p className="px-3 py-1 rounded-full bg-blue-500 text-white text-xs font-semibold">
                                        Featured
                                    </p>
                                )}
                            </div>
                            <p className="absolute top-2 right-4 z-10 text-white text-md font-medium">
                                Built {property.year}
                            </p>
                            <p className="absolute bottom-4 left-4 z-10 text-xl font-medium text-white mb-2">
                                {property.price}
                            </p>
                            <div className="absolute bottom-4 right-4 z-10 flex gap-2">
                                <p className="w-8 h-8 bg-black/65 flex items-center justify-center rounded-md">
                                    <ArrowsAngleExpand size={18} className="text-white" />
                                </p>
                                <p className="w-8 h-8 bg-black/65 flex items-center justify-center rounded-md">
                                    <Heart size={18} className="text-white" />
                                </p>
                                <p className="w-8 h-8 bg-black/65 flex items-center justify-center rounded-md">
                                    <PlusCircle size={18} className="text-white" />
                                </p>
                            </div>

                            <img src={property.image} alt={property.name} className="rounded-lg w-full object-cover h-65" />
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