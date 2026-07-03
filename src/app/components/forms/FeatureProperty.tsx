
import { useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { FeatureCard } from "../cards/FeatureCard";


export const FeatureProperty = ({ properties }: { properties: any[] }) => {
    const [current, setCurrent] = useState(0)
    const total = properties.length
    const prev = () => setCurrent(c => (c - 1 + total) % total)
    const next = () => setCurrent(c => (c + 1) % total)

    if (!properties || total === 0) return null

    return (
        <div className="relative w-full h-auto overflow-hidden rounded-2xl group">
            <div className="flex transition-transform duration-500 ease-in-out" style={{ transform: `translateX(-${current * 100}%)` }}>
                {properties.map((property: any) => (
                    <FeatureCard key={property.id} property={property} />
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