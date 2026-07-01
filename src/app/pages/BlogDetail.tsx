import { useParams } from "react-router-dom";
import { BlogService } from "../services/blogs.service"
import { BlogDetailSection } from "../components/sections/BlogDetail";
import { useEffect, useState } from "react";
import { Loading } from "../components/ui/Loading";

const BlogDetailPage = () => {

    const { id } = useParams<{ id: string }>();
    const [blog, setBlog] = useState<any>([]);
    const [relatedBlogs, setRelatedBlogs] = useState<any>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setIsLoading(true);
        BlogService.getBlogDetail(Number(id)).then((data) => {
            setBlog(data.blog);
            setRelatedBlogs(data.related_blogs);
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
        <div className="min-h-screen relative top-18 p-12 bg-slate-50">
            <div className="w-full">
                {blog && <BlogDetailSection blog={blog} relatedBlogs={relatedBlogs} key={blog.id} />}
            </div>
        </div>
    )
}

export default BlogDetailPage;