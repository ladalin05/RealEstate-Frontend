
import { AgentCard } from "../cards/AgentCard"
import { useTranslation } from "react-i18next";
import { useState } from "react";


export const AgentSection = ({agents}: {agents: any}) => {

    const { t } = useTranslation();
    const [expanded, setExpanded] = useState(false);

    return (
        <section className="container py-12 px-12">
            <div className="flex justify-between items-center mb-10">
                <div className="w-3/4">
                    <h1 className="md:text-4xl text-2xl font-bold text-gray-800 dark:text-gray-200">
                        {t("agents.section_title")}
                    </h1>
                    <p className="flex items-end md:text-sm text-xs">
                        <p className={`text-gray-600 dark:text-gray-400 mt-2 w-3/4 ${expanded ? '' : 'line-clamp-1'} md:line-clamp-none`}>
                            {t('agents.section_description')}
                        </p>
                        <span 
                            onClick={() => setExpanded((prev) => !prev)}
                            className="md:hidden text-sm text-blue-500 cursor-pointer" >
                            {expanded ? t('less') : t('more')}
                        </span>
                    </p>
                </div>
                <div>
                    <button className="flex items-center md:text-md text-sm text-blue-600 font-bold py-2 px-4 rounded-full whitespace-nowrap">
                        {t("agents.find_more_agents")} →
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