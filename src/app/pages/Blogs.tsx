import { useEffect, useState } from "react";
import { BlogService } from "../services/blogs.service";
import { BlogSetion } from "../components/sections/BlogSection";
import { Loading } from "../components/ui/Loading";

const BlogsPage = () => {
    const [blogPosts, setBlogPosts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setIsLoading(true);
        BlogService.getBlogs().then((data) => {
            setBlogPosts(data.blogs);
        }).finally(()=>{
            setIsLoading(false);
        });
    }, []);

    
    if (isLoading) {
        return (
            <Loading />
        );
    }

    return (
        <div className="min-h-screen relative top-18 p-12 bg-slate-50 scroll-smooth" >
            <div className="w-full">
                <BlogSetion blogsData={blogPosts} />
            </div>
        </div>
    )
}

export default BlogsPage;