
import { AgentCardV2 } from "../forms/AgentCardV2";
import { Minus } from "lucide-react";
import { FeatureProperty } from "../forms/FeatureProperty";

export const AgentsList = ({agentsData, categories, featuredProperties}: {agentsData: any[], categories: any[], featuredProperties: any[]}) => {

    return (
        <section className="container py-12 grid grid-cols-1 lg:grid-cols-3">
            <div className="lg:col-span-2 mx-auto py-3 px-12">
                <div className="flex w-full items-center justify-between mb-6">
                    <h2 className="text-3xl font-bold">Agents List</h2>
                </div>
                <div className="grid grid-cols-1 gap-8 h-auto">
                    { agentsData.map((agent, index) => (
                        <div key={index} className="w-full">
                            <AgentCardV2 agent={agent} />
                        </div>
                    ))}
                </div>
            </div>
            <div className="lg:col-span-1 flex flex-col p-3">
                <div className="flex w-full items-center justify-between mb-6">
                    <h2 className="text-3xl font-bold">Featured Properties</h2>
                </div>
                <div className="w-full relative ">
                    <FeatureProperty properties={featuredProperties} />
                </div>
                <div className="mt-12">
                    <h2 className="text-2xl font-bold">Property Types</h2>
                    <div className="grid grid-cols-2 gap-6 mt-6">
                        { categories.map((category, index) => (
                            <a href="#" key={index} className="text-gray-600 text-lg font-bold flex items-center gap-2"><Minus size={20} className="text-blue-500" /> {category.name}</a>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}