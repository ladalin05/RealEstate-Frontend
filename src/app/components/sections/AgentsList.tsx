
import { AgentCardV2 } from "../cards/AgentCardV2";
import { Minus } from "lucide-react";
import { FeatureProperty } from "../forms/FeatureProperty";
import { useTranslation } from "react-i18next";

export const AgentsList = ({agentsData, categories, featuredProperties}: {agentsData: any[], categories: any[], featuredProperties: any[]}) => {

    const { t, i18n } = useTranslation();

    return (
        <section className="container lg:py-12 pt-4 grid grid-cols-1 lg:grid-cols-3">
            <div className="lg:col-span-2 mx-auto py-3">
                <div className="flex w-full items-center justify-between mb-6">
                    <h2 className="text-3xl font-bold">{t('agents.title')}</h2>
                </div>
                <div className="grid grid-cols-1 gap-8 h-auto">
                    { agentsData.map((agent, index) => (
                        <div key={index} className="w-full">
                            <AgentCardV2 agent={agent} />
                        </div>
                    ))}
                </div>
            </div>
            <div className="lg:col-span-1 flex flex-col lg:pt-3 pt-12">
                <div className="flex w-full items-center justify-between mb-6">
                    <h2 className="text-3xl font-bold">{t('agents.featured_properties')}</h2>
                </div>
                <div className="w-full relative p-3">
                    <FeatureProperty properties={featuredProperties} />
                </div>
                <div className="mt-12 p-3">
                    <h2 className="text-2xl font-bold">{t('agents.property_types')}</h2>
                    <div className="grid grid-cols-2 gap-6 mt-6">
                        { categories.map((category, index) => (
                            <a href="#" key={index} className="text-gray-600 text-lg font-bold flex items-center gap-2"><Minus size={20} className="text-blue-500" /> {category[`name_${i18n.language}`]}</a>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}