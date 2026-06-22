import { CheckCircle, Heart, Mail, MapPin, Minus, Phone, PlusCircle } from "lucide-react";
import { getIcon } from "../../utils/helper";
import ContactForm from "../forms/ContactForm";
import { PropertyCardV2 } from "../forms/PropertyCardV2";
import { PropertyCard } from "../forms/PropertyCard";
import { ArrowsAngleExpand } from "react-bootstrap-icons";


export const AgentDetail = ({ agent, properties, categories }: { agent: any, properties: any, categories: any } ) => {
    
    return (
        <section className="container flex py-3 px-6 gap-6">
          <div className="w-2/3">
            <div className="w-full">
                <h2 className="text-3xl font-bold mb-1">Agent</h2>
                <p className="text-md text-gray-500">Agent profile page</p>
            </div>
            <div className="w-full shadow-lg rounded-xl p-6 mt-6">
                <div className="flex items-start px-2">
                    <img src={agent.image} alt={agent.name} className="w-40 h-40 rounded-full" />
                    <div className="w-full ml-4">
                      <div className="flex items-start justify-between">
                        <div className="w-full flex flex-col">
                          <h3 className="text-2xl font-bold flex items-center gap-4 mb-1">{agent.name} <CheckCircle size={24} className="text-green-500" /></h3>
                          <p className="text-gray-600 mb-1">Company Agent at The {agent.company}</p>
                          <p className="text-blue-400 font-semibold">4 Listed Properties</p>
                        </div>
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
            <div className="mt-12 p-2">
              <h3 className="font-bold text-lg mb-2">Contact me</h3>
              <div className="flex gap-2">
                <ContactForm />
              </div>
            </div>
            <div className="mt-12 p-2">
              <h3 className="font-bold text-lg mb-2">Properties</h3>
              <div className="grid grid-cols-2 gap-2">
                {properties.map((property: any) => (
                    <PropertyCard key={property.id} property={property} />
                ))}
              </div>
            </div>
          </div> 
          <div className="flex flex-col w-1/3 p-3">
            <div className="w-full mb-12">
                <h2 className="text-xl font-bold mb-1">Featured Properties</h2>
            </div>
              <div className="card p-6 px-4 rounded-2xl shadow-sm bg-sky-500/30">
                  <h1 className="text-lg font-bold">Villa on Grand Avenue</h1>
                  <p className="text-md text-gray-500 flex items-center gap-2"><MapPin className="text-blue-500" size={20} />CocoWalk, 3015 Grand Avenue, Miami, USA </p>
                  <div className="relative mt-4">
                      <div className="flex gap-2 absolute top-2 left-2">
                          <p className="px-3 py-1 rounded-full bg-white text-gray-700 text-xs font-semibold">For Sale</p>
                          <p className="px-3 py-1 rounded-full bg-blue-500 text-white text-xs font-semibold">Featured</p>
                      </div>
                      <p className="absolute top-2 right-4 text-white text-md font-medium"> Build 2008</p>
                      <p className="absolute bottom-4 left-4 z-10 text-xl font-medium text-white mb-2">$525,000</p>
                      <div className="absolute bottom-4 right-4 z-10 flex gap-2">
                          <p className="w-8 h-8 bg-black/65 flex items-center justify-center rounded-md"> <ArrowsAngleExpand size={18} className="text-white" /> </p>
                          <p className="w-8 h-8 bg-black/65 flex items-center justify-center rounded-md"> <Heart size={18} className="text-white" /> </p>
                          <p className="w-8 h-8 bg-black/65 flex items-center justify-center rounded-md"> <PlusCircle size={18} className="text-white" /> </p>
                      </div>
                      <img src="https://ultra-realhomes.b-cdn.net/wp-content/uploads/2020/06/House-Design-680x510.jpg" alt="" className="rounded-lg" />
                  </div>
              </div>
              <div className="mt-12">
                  <h2 className="text-2xl font-bold">Property Types</h2>
                  <div className="grid grid-cols-2 gap-6 mt-6">
                      { categories.map((category, index) => (
                          <a href="#" key={index} className="text-gray-600 text-lg font-bold flex items-center gap-2"><Minus size={20} className="text-blue-500" /> {category.title}</a>
                      ))}
                  </div>
              </div>
          </div>
        </section>
    )
}
    