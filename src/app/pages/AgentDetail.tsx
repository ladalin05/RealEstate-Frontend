import { useParams } from "react-router-dom";
import { AgentDetail } from "../components/sections/AgentDetail";
import { agentsData, propertiesData, categoriesData } from "../utils/data";


const AgentDetailPage = () => {

    const agentId = useParams()
    const agent = agentsData.find((agent) => agent.id === Number(agentId.id));
    const properties = propertiesData.filter((property) => property?.agent?.agent_id === Number(agentId.id));

    return (
        <main className="min-h-screen bg-gray-50 dark:bg-slate-900 relative top-18 py-12 px-22">
            <AgentDetail agent={agent} properties={properties} categories={categoriesData} />
        </main>
    )
}

export default AgentDetailPage;