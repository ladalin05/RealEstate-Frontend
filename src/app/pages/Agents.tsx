
import { AgentsList } from "../components/sections/AgentsList";
import { agentsData, categoriesData, propertiesData } from "../utils/data";


const AgentPage = () => {
    const featuredProperties = propertiesData.filter((p) => p.featured).slice(0, 2);

    return (
        <main className="min-h-screen bg-gray-50 dark:bg-slate-900 relative top-18 py-12 px-22">
            <div className="flex w-full px-6 justify-between">
                <div className="w-2/3">
                    <h2 className="text-3xl font-bold">Agents List</h2>
                </div>
                <div className="w-1/3 flex justify-start">
                    <h2 className="text-xl font-bold">Featured Properties</h2>
                </div>
            </div>
            <div className="agents">
                <AgentsList agentsData={agentsData} categories={categoriesData} featuredProperties={featuredProperties}/>
            </div>
        </main>
    )
}

export default AgentPage;