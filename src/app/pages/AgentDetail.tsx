import { useParams } from "react-router-dom";
import { AgentDetail } from "../components/sections/AgentDetail";
import { useEffect, useState } from "react";
import { AgentService } from "../services/agent.service";
import { Loading } from "../components/ui/Loading";

const AgentDetailPage = () => {

    const agentId = useParams()
    const [agent, setAgent] = useState([]);
    const [agentProperties, setAgentProperties] = useState([]);
    const [properties, setProperties] = useState([]);
    const [categories, setCategories] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        setIsLoading(true);
        AgentService.getAgetDetail(Number(agentId.id)).then((res) => {
            setAgent(res.agent);
            setAgentProperties(res.agent_properties);
            setCategories(res.categories);
            setProperties(res.featuredProperties)
        }).finally(()=>{
            setIsLoading(false);
        });
    }, []);

    if (isLoading) {
        return (
            <Loading />
        );
    }

    return (
        <main className="min-h-screen bg-gray-50 dark:bg-slate-900 relative top-18 py-12 px-1">
            <AgentDetail agent={agent} agentProperties={agentProperties} properties={properties} categories={categories} />
        </main>
    )
}

export default AgentDetailPage;