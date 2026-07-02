import { CheckCircle, ChevronRight, Mail, Phone } from 'lucide-react';
import { SocialIcon } from '../../utils/helper';
import { useTranslation } from "react-i18next";


export const AgentCardV2 = ({ agent }: { agent: any } ) => {

    const { t, i18n } = useTranslation();

    return (
        <div className="md:h-72 h-auto relative grid md:grid-cols-3 grid-cols-1 bg-white shadow-lg rounded-md overflow-hidden p-1">
            <div className="relative md:col-span-1 rounded-md overflow-hidden md:p-7 p-3">
                <img src={agent.profile_image} alt={agent.name} className="w-full h-full object-cover rounded-lg" />
            </div>
            <div className="md:col-span-2 flex flex-col justify-between md:px-2 px-2 md:py-3 py-2 ">
                <div className="flex-1">
                    <h2 className="text-2xl font-semibold mt-3 flex items-center gap-2 mb-1">{agent.name} <CheckCircle className="text-blue-500" size={25} /></h2>
                    <p className="text-md text-gray-500">{t('agents.company_agent_at_the')} {agent.company}</p>
                    <div className="border-b border-gray-300 w-full my-4"></div>
                </div>
                <div className="flex flex-2 flex-wrap items-center justify-between">
                    <div className="flex items-center gap-2">
                        <Phone className="text-blue-500" size={25}/>
                        <div className="flex flex-col">
                            <span className="text-md font-semibold text-gray-500">{t('agents.office_phone')}</span>
                            <span className="text-md font-bold">{agent.officePhone}</span>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <Phone className="text-blue-500" size={25}/>
                        <div className="flex flex-col">
                            <span className="text-md font-semibold text-gray-500">{t('agents.mobile_phone')}</span>
                            <span className="text-md font-bold">{agent.phone}</span>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <Mail className="text-blue-500" size={25}/>
                        <div className="flex flex-col">
                            <span className="text-md font-semibold text-gray-500">{t('agents.email')}</span>
                            <span className="text-md font-bold">{agent.email}</span>
                        </div>
                    </div>
                </div>
                <div className="flex justify-between items-center flex-3 w-full mt-2">
                    <div className="flex gap-4">
                        {Object.entries(JSON.parse(agent.social_links ?? '{}')).map(([platform, url]) => (
                            <a href={url as string} target="_blank" rel="noreferrer" key={platform}>
                                <SocialIcon platform={platform} size={18} className="text-gray-500 hover:text-blue-500" />
                            </a>
                        ))}
                    </div>
                    <a href={`/agent/${agent.id}`} className="text-blue-500 hover:text-blue-700 font-semibold px-4 py-2 rounded-md flex items-center">
                        {agent.properties_count} {t('general.listed_properties')} <ChevronRight size={20} />
                    </a>
                </div>
            </div>
        </div>
    );
}