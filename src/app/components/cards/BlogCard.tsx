import { Tag, User } from "lucide-react";
import { CalendarEventFill } from "react-bootstrap-icons";
import { convertFromISO } from "../../utils/helper";
import { useTranslation } from "react-i18next";

export const BlogCard = ({ blog}: { blog: any }) => {
    const { t, i18n } = useTranslation();
    const toDetail = (id: number) => {
        window.location.href = `/blogs/${id}`;
    }
    return (
        <div className="relative h-auto shadow-sm group overflow-hidden p-2 rounded-sm">
            <div className="h-48 relative overflow-hidden rounded-sm">
                <div className="absolute inset-0 z-0  bg-gradient-to-b from-black/10 via-transparent to-black/60 group-hover:opacity-0 transition-all duration-300"></div>
                <img src={blog.image} alt={blog.title} className="w-full h-full object-cover" />
            </div>
            <div className="h-58 py-5 px-2">
                <div className="flex items-center justify-between">
                    <p className="flex items-center text-sm"><CalendarEventFill size={12} className="me-2"/>{convertFromISO({isoString: blog.date})}</p>
                    <p className="flex items-center text-sm"><Tag size={13} className="me-2"/>{blog[`category_name_${i18n.language}`]}</p>
                </div>
                <h2 className="text-md font-medium mt-2">{blog.title}</h2>
                <p className="text-sm font-medium mt-2 mb-2">{blog.description}</p>
                <button onClick={() => toDetail(blog.id)} className="text-sm text-sky-400">{t('general.continue_reading')}</button>
            </div>
            <hr className="w-full border-gray-400 mt-2" />
            <div className="px-2 py-3 flex items-center justify-between">
                <div className="flex items-center">
                    <User size={16} className="font-thin"/>
                    <span className="text-gray-500 ms-2 text-sm">by {blog.author_name}</span>
                </div>
            </div>
        </div>
    );
}