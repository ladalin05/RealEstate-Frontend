

export const TeamCard = ({ team }: { team: any }) => {
    
    return (
            <div className="w-full h-97 relative group overflow-hidden rounded-sm">
                <div className="absolute inset-0 z-0  bg-gradient-to-b from-black/10 via-transparent to-black/60 "></div>
                <img src={team.image} alt="" className="w-full h-full" />
                <div className="absolute bottom-4 w-full text-center text-white">
                    <h1 className="text-lg font-bold">{team.name}</h1>
                    <h6 className="text-md">{team.role}</h6>
                </div>
                <div className="w-full h-full absolute bottom-0 bg-white/80 flex items-end translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-in-out">
                    <div className="text-center py-12 px-7 leading-7">
                        <h1 className="text-lg text-black font-bold">{team.name}</h1>
                        <h6 className="text-md text-gray-400 mb-2">{team.role}</h6>
                        <p className="text-md text-gray-400 mb-4">Lorem ipsum dolor sit amet, consectetur adipiscing elit. In malesuada, odio sit amet pharetra vehicula, sapien leo egestas magna, vitae auctor diam magna cursus arcu.</p>
                        <div className="flex gap-4 justify-center">
                            {team.social.map((social, index) => (
                                <a href={social.link} key={index} >
                                    <social.icon size={18} />
                                </a>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
    );
} 