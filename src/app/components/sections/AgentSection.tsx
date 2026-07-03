import { ArrowRight } from "react-bootstrap-icons";
import { AgentCard } from "../cards/AgentCard"
import { useTranslation } from "react-i18next";


export const AgentSection = ({agents}: {agents: any}) => {

    const { t } = useTranslation();

    return (
        <section className="container py-12 px-12">
            <div className="flex justify-between items-center mb-10">
                <div>
                    <h1 className="lg:text-4xl text-3xl font-bold text-gray-800 dark:text-gray-200">
                        {t("agents.section_title")}
                    </h1>
                    <p className="text-gray-600 dark:text-gray-400 mt-2 w-3/4">
                        {t("agents.section_description")}
                    </p>
                </div>
                <div>
                    <button className="flex items-center text-black font-bold py-2 px-4 rounded-full whitespace-nowrap">
                        {t("agents.find_more_agents")} <ArrowRight className="ml-2" />
                    </button>
                </div>
            </div>
            <div className="w-full mx-auto py-3 px-12">
                <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8 h-auto">
                    { agents.map((agent, index) => (
                        <div key={index} className="w-full">
                            <AgentCard agent={agent} />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}