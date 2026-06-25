import { ArrowRight } from "lucide-react"


export const AboutRealEsteteSection = ({ realEstateData }: { realEstateData: any[] }) => {
    return (
        <section className="container px-6 py-8 relative">
            <div className="flex justify-between items-center mb-10 relative">
                <div className="p-4">
                    <img src="https://main.houzez.co/wp-content/uploads/elementor/thumbs/AdobeStock_866670044-scaled-1-rdz82sevntammi6n8w0rhahhqv9z8psixo5svil09c.jpg" alt="CTA" className="w-full h-auto rounded-lg shadow-lg" />
                </div>
                <div className="w-1/2 p-4 mb-12">
                    <div className="w-3/4">
                        <h3 className="text-xl font-bold text-sky-500 dark:text-sky-200 mb-4">About</h3>
                        <p className="text-4xl font-bold text-black-600 mb-6">Built for Real Estate Experts, Trusted Worldwide</p>
                        <p className="text-gray-600 dark:text-gray-400 mb-6 pr-4">Houzez helps you create, manage, and scale your property business with confidence.</p>
                    </div>
                </div>
                <div className="bg-white absolute bottom-4 right-4 w-[64%] h-64 transform rounded-lg shadow-lg z-10">
                    <div className="grid grid-cols-4 gap-12 px-8 pt-6">
                        {realEstateData.map((realEstate, index) => (
                            <div className="h-full rounded-lg" key={index}>
                                <h1 className="text-4xl font-bold text-gray-800 dark:text-gray-200">{realEstate.title}</h1>
                                <p className="text-base text-gray-500 mt-4">{realEstate.description}</p>
                            </div>
                        ))}
                    </div>
                    <hr className="border-secondary opacity-25 my-4 md:my-2" />
                    <div className="flex items-center justify-between px-8 relative">
                        <div className="flex items-center">
                            <div className="w-10 h-10 rounded-full">
                                <img src="https://main.houzez.co/wp-content/uploads/2025/10/demo-31-1.jpg" alt="CTA" className="w-full h-auto rounded-full shadow-lg" />
                            </div>
                            <p className="text-gray-600 dark:text-gray-400 text-sm ms-1 italic">Take your next step in real estate!</p>
                        </div>
                        <button className="text-sky-500 flex items-center">
                            Get Started <ArrowRight className="ml-2" />
                        </button>
                    </div>
                </div>
            </div>
        </section>
    )
}
    