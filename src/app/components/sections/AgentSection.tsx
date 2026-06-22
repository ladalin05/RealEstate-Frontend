import { ArrowRight } from "react-bootstrap-icons";
import { AgentCard } from "../forms/AgentCard"

export const AgentSection = ({agents}: {agents: any}) => {

    return (
        <section className="container py-12 px-12">
            <div className="flex justify-between items-center mb-10">
                <div>
                    <h1 className="text-4xl font-bold text-gray-800 dark:text-gray-200">
                        Meet Our Team of Local Experts
                    </h1>
                    <p className="text-gray-600 dark:text-gray-400 mt-2 w-3/4">
                        Connect with experienced agents who know your neighborhood inside and out.
                    </p>
                </div>
                <div>
                    <button className="flex items-center text-black font-bold py-2 px-4 rounded-full">
                        Find more agents <ArrowRight className="ml-2" />
                    </button>
                </div>
            </div>
            <div className="w-full mx-auto py-3 px-12">
                <div className="grid grid-cols-3 gap-8 h-auto">
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