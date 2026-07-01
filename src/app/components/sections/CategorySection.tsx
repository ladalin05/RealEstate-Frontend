import { ArrowRight } from "lucide-react";
import { Categories } from "./Categories";
import { useTranslation } from "react-i18next";


export const CategorySection = ({categories}: {categories: any}) => {
    const { t } = useTranslation();
    return (
        <section className="container py-16 px-8">
            <div className="flex justify-between items-center mb-10">
                <div>
                    <h1 className="text-4xl font-bold text-gray-800 dark:text-gray-200">
                        {t('property_category.title')} <span className="text-blue-500">{t('property_category.title_2')}</span>
                    </h1>
                    <p className="text-gray-600 dark:text-gray-400 mt-2 w-3/4">
                        {t('property_category.description')}
                    </p>
                </div>
                <div className="text-right">
                    <button className="flex items-center text-black font-bold py-2 px-4 rounded-full" onClick={() => window.location.href = '/property-category'}>
                        {t('general.see_more')} <ArrowRight className="ml-2" />
                    </button>
                </div>
            </div>
            <div className="container mx-auto px-4">
                <Categories categories={categories} />
            </div>
        </section>
    );
}