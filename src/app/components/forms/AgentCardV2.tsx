import { CheckCircle, ChevronRight, Mail, Phone } from 'lucide-react';
import { getIcon } from '../../utils/helper';
import { useNavigate } from 'react-router-dom';

interface Agent {
  id: number;
  name: string;
  title: string;
  company: string;
  image: string;
  officePhone: string;
  phone: string;
  email: string;
  location: string;
  experience: string;
  listings: number;
  rating: number;
  language: string[];
  social: {
    facebook: string;
    twitter: string;
    linkedin: string;
    instagram: string;
  };
  bio: string;
}

export const AgentCardV2 = ({ agent }: { agent: Agent } ) => {

    return (
        <div className="h-72 relative flex bg-white shadow-lg rounded-md overflow-hidden p-1">
            <div className="relative rounded-md overflow-hidden w-1/3 p-7">
                <img src={agent.image} alt={agent.name} className="w-full h-full object-cover rounded-lg" />
            </div>
            <div className="w-2/3 flex flex-col justify-between px-2 py-3 ">
                <div className="flex-1">
                    <h2 className="text-2xl font-semibold mt-3 flex items-center gap-2 mb-1">{agent.name} <CheckCircle className="text-blue-500" size={25} /></h2>
                    <p className="text-md text-gray-500">Company Agent at The {agent.company}</p>
                    <div className="border-b border-gray-300 w-full my-4"></div>
                </div>
                <div className="flex flex-2 items-center justify-between">
                    <div className="flex items-center gap-2">
                        <Phone className="text-blue-500" size={25}/>
                        <div className="flex flex-col">
                            <span className="text-md font-semibold text-gray-500">Office</span>
                            <span className="text-md font-bold">{agent.officePhone}</span>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <Phone className="text-blue-500" size={25}/>
                        <div className="flex flex-col">
                            <span className="text-md font-semibold text-gray-500">Mobile</span>
                            <span className="text-md font-bold">{agent.phone}</span>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <Mail className="text-blue-500" size={25}/>
                        <div className="flex flex-col">
                            <span className="text-md font-semibold text-gray-500">Email</span>
                            <span className="text-md font-bold">{agent.email}</span>
                        </div>
                    </div>
                </div>
                <div className="flex justify-between items-center flex-3 w-full mt-2">
                    <div className="flex gap-4">
                        {Object.entries(agent.social).map(([key, value]) => {
                            const Icon = getIcon(key);
                            return (
                                <a href={value} target="_blank" key={key} className="flex items-center">
                                    <Icon className="text-gray-500 hover:text-blue-500" size={18} />
                                </a>
                            );
                        })}
                    </div>
                    <a href={`/agent/${agent.id}`} className="text-blue-500 hover:text-blue-700 font-semibold px-4 py-2 rounded-md flex items-center">
                        Listed Properties <ChevronRight size={20} />
                    </a>
                </div>
            </div>
        </div>
    );
}