
export const Categories = ({categories}: {categories: any}) => {
    return (
        <section className="container grid grid-cols-4 gap-3 mx-auto">
                { categories.map((category, index) => (
                    <div key={index} className={`${ [0, 5].includes(index % 6)  ? 'col-span-2' : ''} relative rounded-xl h-74`}>
                        <h6 className="absolute top-4 left-4 text-lg text-white font-semibold">{ category.title }</h6>
                        <img src={ category.image } alt="" className="w-full h-full rounded-md" />
                        <p className="absolute bottom-4 left-4 text-white font-medium">{ category.listings } listings</p>
                    </div>
                ))}
        </section>
    );
}