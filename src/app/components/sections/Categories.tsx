import { useTranslation } from "react-i18next";


export const Categories = ({categories}: {categories: any}) => {
    const { t } = useTranslation();
    
    return (
        <section className="container grid lg:grid-cols-4 grid-cols-2 gap-3 mx-auto">
                { categories.map((category, index) => (
                    <div key={index} className={`${ [0, 5].includes(index % 6)  ? 'col-span-2' : ''} relative rounded-xl h-74`}>
                        <h6 className="absolute top-4 left-4 text-lg text-white font-semibold">{ category.title }</h6>
                        <img src={ category.image } alt="" className="w-full h-full rounded-md" />
                        <p className="absolute bottom-4 left-4 text-white font-medium">{ category.listings } { t('general.listing')}</p>
                    </div>
                ))}
        </section>
    );
}