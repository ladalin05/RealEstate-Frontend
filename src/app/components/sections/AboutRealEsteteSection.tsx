import { ArrowRight } from "lucide-react"
import { useTranslation } from "react-i18next";

export const AboutRealEsteteSection = ({ realEstateData }: { realEstateData: any[] }) => {
    const { t, i18n } = useTranslation();
    return (
        <section className="container h-auto px-6 py-8 relative">
            <div className="lg:grid lg:grid-cols-2  mb-10 relative">
                <div className="p-4">
                    <img src="https://main.houzez.co/wp-content/uploads/elementor/thumbs/AdobeStock_866670044-scaled-1-rdz82sevntammi6n8w0rhahhqv9z8psixo5svil09c.jpg" alt="CTA" className="w-full h-auto rounded-lg shadow-lg" />
                </div>
                <div className="p-4 mt-4 lg:mt-22">
                    <div className="">
                        <h3 className="text-xl font-bold text-sky-500 dark:text-sky-200 mb-4">{t('aboutRealEstate.title')}</h3>
                        <p className="text-2xl lg:text-4xl font-bold text-black-600 mb-6">{t('aboutRealEstate.subtitle')}</p>
                        <p className="text-gray-600 dark:text-gray-400 mb-6 pr-4">{t('aboutRealEstate.description')}</p>
                    </div>
                </div>
                <div className="col-span-2 bg-white lg:absolute relative bottom-4 right-4 lg:w-[64%] w-full lg:h-70 h-64 transform rounded-lg shadow-lg z-10">
                    <div className="grid grid-cols-4 gap-8 px-8 pt-8">
                        {realEstateData.map((realEstate, index) => (
                            <div className="h-full rounded-lg" key={index}>
                                <h1 className="lg:text-4xl font-bold text-gray-800 dark:text-gray-200">{realEstate.title}</h1>
                                <p className="text-base text-gray-500 mt-4">{realEstate[`description_${i18n.language}`]}</p>
                            </div>
                        ))}
                    </div>
                    <hr className="border-secondary opacity-25 my-4 md:my-2" />
                    <div className="w-full flex items-center justify-between px-8 absolute bottom-6">
                        <div className="flex items-center">
                            <div className="w-10 h-10 rounded-full">
                                <img src="https://main.houzez.co/wp-content/uploads/2025/10/demo-31-1.jpg" alt="CTA" className="w-full h-auto rounded-full shadow-lg" />
                            </div>
                            <p className="text-gray-600 dark:text-gray-400 text-sm ms-1 italic">{t('aboutRealEstate.note')}</p>
                        </div>
                        <button className="text-sky-500 flex items-center">
                            {t('general.get_started')} <ArrowRight className="ml-2" />
                        </button>
                    </div>
                </div>
            </div>
        </section>
    )
}
    