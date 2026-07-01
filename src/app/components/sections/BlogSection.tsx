import { useState } from "react";
import { BlogCardV2 } from "../cards/BlogCardV2";
import { Pagination } from "../ui/Pagination";


export const BlogSetion = ({blogsData}: {blogsData: any}) => {
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 4
    const totalPages = Math.ceil(blogsData.length / itemsPerPage);
    const blogs = blogsData.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    )
    
    return (
        <>
            <div className="w-4/5 mx-auto bg-white mb-12 p-2 rounded-md ">
                {blogs && ( blogs.map((blog, index) => {
                    return (
                        <BlogCardV2 key={index} blog={blog} />
                    )
                })
                )}
            </div>
                <div className="flex justify-center mt-8">
                    <Pagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={(page) => {
                            setCurrentPage(page);
                            window.scrollTo({ top: 0, behavior: 'smooth' });
                        }}
                    />
                </div>
        </>
    )
}