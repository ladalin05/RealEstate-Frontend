import { useState } from "react";
import { CalendarEventFill, Chat, Tag } from "react-bootstrap-icons";
import { Pagination } from "../components/ui/Pagination";
import { blogData } from "../utils/data";
import { useNavigate } from "react-router-dom";

const BlogsPage = () => {
    const navigate = useNavigate();
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 4
    const blogPosts = blogData;

    const totalPages = Math.ceil(blogPosts.length / itemsPerPage);
    const blogs = blogPosts.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    )

    const  toDetail = (id: number) => {
        navigate(`/blogs/${id}`);
    }

    return (
        <div className="min-h-screen relative top-18 p-12 bg-slate-50">
            <div className="w-full">
                {blogs.map((blog, index) => (
                    <div className="w-3/5 mx-auto bg-white mb-12 p-2 rounded-md " key={index}>
                        <div className="w-full h-auto">
                            <img src={blog.image} alt={blog.title} className="w-full h-auto object-cover rounded-md" />
                        </div>
                        <div className="w-full p-8">
                            <h1 className="text-2xl text-medium">{blog.title}</h1>
                            <p className="py-8 text-md font-thin text-gray-500">
                                {blog.description}
                            </p>
                        </div>
                        <hr className="w-full border-gray-400 mt-2" />
                        <div className="px-6 py-8 flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="rounded-full w-10 h-10">
                                    <img src={blog.authorImage} alt={blog.author} className="rounded-full w-full h-full" />
                                </div>
                                <span className="text-gray-500 text-md font-normal"> by <span className="text-sky-400">{blog.author}</span></span>
                                <span className="text-gray-500 text-md font-normal flex items-center"><CalendarEventFill className="me-1"/>{blog.date}</span>
                                <span className="text-gray-500 text-md font-normal flex items-center"><Tag className="me-1"/><span className="text-sky-400">{blog.category}</span></span>
                                <span className="text-gray-500 text-md font-normal flex items-center"><Chat className="me-1"/>{blog.comments}</span>
                            </div>
                            <div className="flex items-center">
                                <button className="font-bold text-md py-2 px-3 bg-sky-400 rounded-md text-white" onClick={() => toDetail(blog.id)}>
                                    Read More
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
                                
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
            </div>
        </div>
    )
}

export default BlogsPage;