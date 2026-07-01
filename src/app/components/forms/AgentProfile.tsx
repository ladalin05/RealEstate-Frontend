import { CheckCircle, Mail, Phone } from "lucide-react";
import { SocialIcon } from "../../utils/helper";
import ContactForm from "../forms/ContactForm";
import { PropertyCard } from "../cards/PropertyCard";

export const AgentProfile = ({ agent, properties }: { agent: any, properties: any }) => {
    return (
        <div className="w-full">
            <div className="w-full">
                <h2 className="text-3xl font-bold mb-1">Agent</h2>
                <p className="text-md text-gray-500">Agent profile page</p>
            </div>
            <div className="w-full shadow-lg rounded-xl p-6 mt-6">
                <div className="flex items-start px-2 overflow-hidden">
                    <img src={agent.image} alt={agent.name} className="w-40 h-40 rounded-full" />
                    <div className="w-full ml-4">
                      <div className="flex items-start justify-between">
                        <div className="w-full flex flex-col">
                          <h3 className="text-2xl font-bold flex items-center gap-4 mb-1">{agent.name} <CheckCircle size={24} className="text-green-500" /></h3>
                          <p className="text-gray-600 mb-1">Company Agent at The {agent.company}</p>
                          <p className="text-blue-400 font-semibold">4 Listed Properties</p>
                        </div>
                        <div className="flex gap-4">
                            {Object.entries(JSON.parse(agent.social_links ?? '{}')).map(([platform, url]) => (
                                <a href={url as string} target="_blank" rel="noreferrer" key={platform}>
                                    <SocialIcon platform={platform} size={18} className="text-gray-500 hover:text-blue-500" />
                                </a>
                            ))}
                        </div>
                      </div>
                      <hr className="my-4 border-gray-200"/>
                      <div className="grid grid-cols-3 items-center gap-6">
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
                    </div>
                </div>
                <div className="mt-12 p-2">
                  <h3 className="font-bold text-lg mb-2">About</h3>
                  <p>{agent.bio}</p>
                </div>
            </div>
            <div className="mt-12 p-4 shadow-lg rounded-xl">
              <h3 className="font-bold text-2xl mb-4">Contact me</h3>
              <div className="flex gap-2">
                <ContactForm />
              </div>
            </div>
            <div className="mt-12 p-4 shadow-lg rounded-xl">
              <h3 className="font-bold text-2xl mb-4">Properties</h3>
              <div className="grid grid-cols-2 gap-2">
                {properties.map((property: any) => (
                    <PropertyCard key={property.id} property={property} />
                ))}
              </div>
            </div>
        </div>
    )
}