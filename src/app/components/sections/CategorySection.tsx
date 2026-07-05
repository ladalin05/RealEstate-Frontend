
import { Categories } from "./Categories";
import { useTranslation } from "react-i18next";


export const CategorySection = ({categories}: {categories: any}) => {
    const { t } = useTranslation();
    return (
        <section className="container py-16 px-8">
            <div className="flex justify-between items-center mb-10">
                <div className="w-3/4">
                    <h1 className="md:text-4xl text-2xl font-bold text-gray-800 dark:text-gray-200">
                        {t('property_category.title')} <span className="text-blue-500">{t('property_category.title_2')}</span>
                    </h1>
                    <p className="md:text-sm text-xs">
                        {t('property_category.description')}
                    </p>
                </div>
                <a href="/property" className="text-blue-500 md:text-sm text-xs font-medium flex items-center">{t('general.see_more')} →</a>
            </div>
            <div className="container mx-auto px-4">
                <Categories categories={categories} />
            </div>
        </section>
    );
}