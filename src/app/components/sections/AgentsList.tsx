import { ArrowsAngleExpand } from "react-bootstrap-icons";
import { AgentCardV2 } from "../forms/AgentCardV2";
import { Heart, MapPin, Minus, PlusCircle } from "lucide-react";

export const AgentsList = ({agentsData, categories, featuredProperties}: {agentsData: any[], categories: any[], featuredProperties: any[]}) => {

    return (
        <section className="container flex  py-12">
            <div className="w-2/3 mx-auto py-3 px-12">
                <div className="grid grid-cols-1 gap-8 h-auto">
                    { agentsData.map((agent, index) => (
                        <div key={index} className="w-full">
                            <AgentCardV2 agent={agent} />
                        </div>
                    ))}
                </div>
            </div>
            <div className="flex flex-col w-1/3 p-3">
                <div className="card p-6 px-4 rounded-2xl bg-sky-500/30">
                    <h1 className="text-lg font-bold">Villa on Grand Avenue</h1>
                    <p className="text-md text-gray-500 flex items-center gap-2"><MapPin className="text-blue-500" size={20} />CocoWalk, 3015 Grand Avenue, Miami, USA </p>
                    <div className="relative mt-4">
                        <div className="flex gap-2 absolute top-2 left-2">
                            <p className="px-3 py-1 rounded-full bg-white text-gray-700 text-xs font-semibold">For Sale</p>
                            <p className="px-3 py-1 rounded-full bg-blue-500 text-white text-xs font-semibold">Featured</p>
                        </div>
                        <p className="absolute top-2 right-4 text-white text-md font-medium"> Build 2008</p>
                        <p className="absolute bottom-4 left-4 z-10 text-xl font-medium text-white mb-2">$525,000</p>
                        <div className="absolute bottom-4 right-4 z-10 flex gap-2">
                            <p className="w-8 h-8 bg-black/65 flex items-center justify-center rounded-md"> <ArrowsAngleExpand size={18} className="text-white" /> </p>
                            <p className="w-8 h-8 bg-black/65 flex items-center justify-center rounded-md"> <Heart size={18} className="text-white" /> </p>
                            <p className="w-8 h-8 bg-black/65 flex items-center justify-center rounded-md"> <PlusCircle size={18} className="text-white" /> </p>
                        </div>
                        <img src="https://ultra-realhomes.b-cdn.net/wp-content/uploads/2020/06/House-Design-680x510.jpg" alt="" className="rounded-lg" />
                    </div>
                </div>
                <div className="mt-12">
                    <h2 className="text-2xl font-bold">Property Types</h2>
                    <div className="grid grid-cols-2 gap-6 mt-6">
                        { categories.map((category, index) => (
                            <a href="#" key={index} className="text-gray-600 text-lg font-bold flex items-center gap-2"><Minus size={20} className="text-blue-500" /> {category.title}</a>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}