import { Facebook, TwitterX, Instagram, Linkedin, Youtube, TelephoneFill, EnvelopeFill } from 'react-bootstrap-icons';

interface Agent {
  id: number;
  name: string;
  title: string;
  company: string;
  image: string;
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

export const AgentCard = ({ agent }: { agent: Agent } ) => {

    return (
        <div className="h-auto relative bg-white shadow-lg rounded-md overflow-hidden p-1">
            <div className="relative w-full h-88 group cursor-pointer flex justify-center ">
                <p className="absolute bottom-4 left-4 bg-[#69c17d]/85 text-white text-[9px] font-bold py-1 px-1 rounded-sm uppercase">4 listings</p>
                <img src={agent.image} alt={agent.name} className="w-full h-full object-cover" />
            </div>
            
            <div className="p-3 px-2">
                <h2 className="text-lg font-semibold cursor-pointer hover:text-blue-500 mt-3">{agent.name}</h2>
                <p className="text-sm text-gray-500">{agent.title}</p>
                <p className="text-sm mt-4 text-gray-700 leading-relaxed mb-4">
                    {agent.bio.slice(0, 90)} ...
                </p>
                <hr className="border-gray-100 mb-4" />
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <a href={agent.social.facebook}>
                            <Facebook size={12} className='text-gray-500'/>
                        </a>
                        <a href={agent.social.twitter}>
                            <TwitterX size={12} className='text-gray-500'/>
                        </a>
                        <a href={agent.social.linkedin}>
                            <Linkedin size={12} className='text-gray-500'/>
                        </a>
                        <a href={agent.social.instagram}>
                            <Instagram size={12} className='text-gray-500'/>
                        </a>
                        <a href="">
                            <Youtube size={12} className='text-gray-500'/>
                        </a>
                    </div>
                    <div className="flex items-center gap-2">
                        <a href={agent.phone}>
                            <TelephoneFill size={12} className='text-gray-500'/>
                        </a>
                        <a href={agent.email}>
                            <EnvelopeFill size={12} className='text-gray-500'/>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}