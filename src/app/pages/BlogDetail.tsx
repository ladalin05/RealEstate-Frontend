import { useState } from "react";
import { CalendarEventFill, Chat, Tag } from "react-bootstrap-icons";
import { CalendarDays, File} from "lucide-react"
import { blogData } from "../utils/data";
import { useParams } from "react-router-dom";
import { BlogCard } from "../components/forms/BlogCard";

const BlogDetailPage = () => {

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 4
    const blogPosts = blogData;
    const { id } = useParams<{ id: string }>();
    const blog = blogPosts.find((blog) => blog.id === parseInt(id || '1'));

    return (
        <div className="min-h-screen relative top-18 p-12 bg-slate-50">
            <div className="w-full">
                {blog && (
                    <>
                        <div className="w-3/5 mx-auto bg-white mb-12 p-8 rounded-md " key={blog.id}>
                            <div className="w-full h-auto">
                                <div className="header py-6 px-4 mb-3">
                                    <div className="w-full py-4">
                                        <h1 className="text-2xl text-medium">{blog.title}</h1>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <div className="rounded-full w-10 h-10">
                                            <img src={blog.authorImage} alt={blog.author} className="rounded-full w-full h-full" />
                                        </div>
                                        <span className="text-gray-500 text-md font-normal"> by <span className="text-sky-400">{blog.author}</span></span>
                                        <span className="text-gray-500 text-md font-normal flex items-center"><CalendarEventFill className="me-1"/>{blog.date}</span>
                                        <span className="text-gray-500 text-md font-normal flex items-center"><Tag className="me-1"/><span className="text-sky-400">{blog.category}</span></span>
                                        <span className="text-gray-500 text-md font-normal flex items-center"><Chat className="me-1"/>{blog.comments}</span>
                                    </div>
                                </div>
                                <img src={blog.image} alt={blog.title} className="w-full h-auto object-cover rounded-md" />
                            </div>
                            <div className="px-6 py-8 flex items-center justify-between">
                                <p className="py-8 text-md font-thin text-gray-500">
                                    {blog.overview}
                                </p>
                            </div>
                            {blog.sections.map((section, index) => (
                                <div className="px-6 py-8" key={index}>
                                    <h2 className="text-xl font-bold mb-4 flex items-center gap-2">{section.heading}</h2>
                                    <p className="text-md font-thin text-gray-500">
                                        {section.content}
                                    </p>
                                    {section.images && (
                                        <div className={`grid grid-cols-${section.images.length < 4 ? section.images.length : 4} gap-1 py-4`}>
                                            {section.images?.map((image, imgIndex) => (
                                                <img key={imgIndex} src={image} alt={section.heading} className="w-full h-auto object-cover rounded-sm" />
                                            ))}
                                        </div>
                                    )}
                                    {section.list && (
                                        <ul className="list-disc list-inside text-md font-thin text-gray-500 mt-3 ms-8">
                                            {section.list.map((item, itemIndex) => (
                                                <li key={itemIndex} className="mb-2">
                                                    {item}
                                                </li>
                                            ))}
                                        </ul>
                                    )}
                                </div>
                            ))}
                            <hr className="w-full border-gray-400 mt-2" />
                            <div className="px-6 py-8">
                                <h2 className="text-xl font-bold mb-4">Tags</h2>
                                <div className="flex flex-wrap gap-2">
                                    {blog.tags.map((tag, index) => (
                                        <span key={index} className="bg-sky-100 text-sky-800 text-sm font-medium px-3 py-1 rounded-sm">
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                        
                        <div className="w-3/5 mx-auto bg-white flex items-center gap-3 p-8 rounded-sm mb-6">
                            <div className="rounded-full w-10 h-10">
                                <img src={blog.authorImage} alt={blog.author} className="rounded-full w-full h-full" />
                            </div>
                            <span className="text-gray-500 text-md font-normal"><span className="text-sky-400">{blog.author}</span></span>
                        </div>

                        <div className="w-3/5 mx-auto bg-white p-8 ">
                            <h2 className="text-xl font-bold mb-4">Related posts</h2>
                            <div className="flex items-center gap-2">
                                {blogData.slice(0, 3).map((relatedBlog, index) => (
                                    <BlogCard blog={relatedBlog} key={index}/>
                                ))}
                            </div>
                        </div>
                    </>
                )}       
            </div>
        </div>
    )
}

export default BlogDetailPage;