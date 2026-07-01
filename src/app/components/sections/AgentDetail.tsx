import { Minus } from "lucide-react";
import { AgentProfile } from "../forms/AgentProfile";
import { FeatureProperty } from "../forms/FeatureProperty";


export const AgentDetail = ({ agent, agentProperties, properties, categories }: { agent: any, agentProperties: any, properties: any, categories: any } ) => {
    
    return (
        <section className="container py-12 grid grid-cols-1 lg:grid-cols-3">
            <div className="lg:col-span-2 col-span-1 mx-auto py-3 lg:px-12 px-3">
                <AgentProfile agent={agent} properties={agentProperties} />
            </div> 
            <div className="col-span-1 flex flex-col p-3 lg:mt-0 mt-12">
                <div className="flex w-full items-center justify-between mb-6">
                    <h2 className="text-3xl font-bold">Featured Properties</h2>
                </div>
                <div className="w-full relative ">
                    <FeatureProperty properties={properties} />
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
    )
}
    