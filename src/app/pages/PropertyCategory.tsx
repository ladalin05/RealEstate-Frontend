import { Categories } from "../components/sections/Categories";
import { categoriesData } from "../utils/data";

const PropertyCategoryPage = () => {
    

    return (
        <main className="min-h-screen relative top-18"
            style={{ backgroundImage: `url('https://demo01.houzez.co/wp-content/uploads/2016/03/023.jpg')`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                backgroundAttachment: 'fixed', }} >
            <div className="w-full py-20 bg-sky-900/50 flex items-center backdrop-blur-sx px-28">
                <h1 className="text-3xl text-white font-medium">Property Category</h1>
            </div>
            <section className="w-full h-full bg-white py-18 px-8">
                <Categories categories={categoriesData} />
            </section>
        </main>
    )
}

export default PropertyCategoryPage;