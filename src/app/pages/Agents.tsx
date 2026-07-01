
import { AgentsList } from "../components/sections/AgentsList";
import { useState, useEffect } from "react";
import { AgentService } from "../services/agent.service";
import { Loading } from "../components/ui/Loading";


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
            <Loading />
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