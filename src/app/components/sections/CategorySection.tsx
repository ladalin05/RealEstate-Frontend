import { ArrowRight } from "lucide-react";
import { Categories } from "./Categories";

export const CategorySection = ({categories}: {categories: any}) => {

    return (
        <section className="container py-16 px-8">
            <div className="flex justify-between items-center mb-10">
                <div>
                    <h1 className="text-4xl font-bold text-gray-800 dark:text-gray-200">
                        Properties by <span className="text-blue-500">Category</span>
                    </h1>
                    <p className="text-gray-600 dark:text-gray-400 mt-2 w-3/4">
                        Highlight the best of your properties by using the List Category shortcode. You can list specific properties categories, types, cities, areas.
                    </p>
                </div>
                <div className="text-right">
                    <button className="flex items-center text-black font-bold py-2 px-4 rounded-full" onClick={() => window.location.href = '/property-category'}>
                        See more <ArrowRight className="ml-2" />
                    </button>
                </div>
            </div>
            <div className="container mx-auto px-4">
                <Categories categories={categories} />
            </div>
        </section>
    );
}