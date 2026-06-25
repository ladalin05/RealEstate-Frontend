
import { AgentsList } from "../components/sections/AgentsList";
import { agentsData, categoriesData, propertiesData } from "../utils/data";
import { useState, useEffect } from "react";
import { AgentService } from "../services/agent.service";


const AgentPage = () => {
    const [agents, setAgents] = useState([]);
    const [categories, setCategories] = useState([]);
    const [featuredProperties, setFeaturedProperties] =     useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setIsLoading(true);
        AgentService.getAgents().then((data)=>{
            setAgents(data.agents);
            setCategories(data.categories);
            setFeaturedProperties(data.featuredProperties);
        }).finally(()=>{
            setIsLoading(false);
        })
    }, []);

    if (isLoading) {
        return (
            <div className="w-full min-h-screen flex items-center justify-center z-50 fixed top-0 bg-white">
                <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-sky-500"></div>
            </div>
        );
    }

    return (
        <main className="min-h-screen bg-gray-50 dark:bg-slate-900 relative top-18 py-12 px-10">
            <div className="agents">
                <AgentsList agentsData={agents} categories={categories} featuredProperties={featuredProperties}/>
            </div>
        </main>
    )
}

export default AgentPage;