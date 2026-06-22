import { ArrowRight } from "lucide-react";
import { HeroSection } from "../components/sections/HeroSection";
import { AreaSection } from "../components/sections/AreaSection";
import { CategorySection } from "../components/sections/CategorySection";
import { PropertySection } from "../components/sections/PropertySection";
import { PropertyForRent } from "../components/sections/PropertyForRent";
import { AgentSection } from "../components/sections/AgentSection";
import { propertiesData, categoriesData, agentsData, areasData } from "../utils/data";
import { AboutRealEsteteSection } from "../components/sections/AboutRealEsteteSection";

const HomePage = () => {

    const realEstateData = [
        { name: '53,000+', description: 'Real estate professionals worldwide trust Houzez to power their websites.' },
        { name: '2,600+', description: 'Positive reviews praising Houzez for its flexibility and reliable support.' },
        { name: '4.85+', description: 'Average rating reflecting the theme’s quality and user satisfaction.' },
        { name: '10+', description: 'Years of experience creating solutions for real estate professionals.' },
    ]

    const propertiesForRent = propertiesData.filter(property => property.status.toLowerCase() === 'for rent');
    const agents = agentsData.sort((a, b) => b.rating - a.rating).slice(0, 3);

    return (
        <div className="bg-white dark:bg-slate-900">
            <HeroSection categories={categoriesData} />
            <AreaSection areas={areasData} />
            <AboutRealEsteteSection realEstateData={realEstateData} />
            <PropertySection propertiesData={propertiesData} />
            <CategorySection categoriesData={categoriesData} />
            <PropertyForRent properties={propertiesForRent} />
            <AgentSection agents={agents} />
            <section className="container py-16 px-6 relative">
                <div className="relative w-full h-108 rounded-2xl">
                    <div className="h-full overflow-hidden bg-black aspect-[4/5] cursor-pointer group rounded-2xl">
                        <img src="https://main.houzez.co/wp-content/uploads/2025/10/AdobeStock_866670044.jpg" alt="" className="absolute inset-0 w-full h-full object-cover brightness-[0.62] rounded-2xl" />
                    </div>
                    <div className="absolute top-0 w-full h-full flex justify-center items-center">
                        <div className="w-2/5 mx-auto">
                            <h2 className="text-4xl font-bold text-white text-center">Know What Your Home Is Worth Today</h2>
                            <p className="text-md text-white text-center mt-6">
                                Thinking about selling or just curious about your home’s value? Get a professional, no-obligation valuation backed by real market insights—fast, accurate, and 100% free.
                            </p>
                            <button className="mt-6 rounded-full bg-sky-500 text-white font-bold py-3 px-6 flex mx-auto">
                                Get a Free Valuation <ArrowRight className="ms-3"/>
                            </button>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default HomePage;