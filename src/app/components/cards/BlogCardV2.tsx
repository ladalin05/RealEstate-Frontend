import { Tag, User } from "lucide-react";
import { CalendarEventFill } from "react-bootstrap-icons";
import { convertFromISO } from "../../utils/helper";
import { useTranslation } from "react-i18next";

export const BlogCardV2 = ({ blog}: { blog: any }) => {
    const { t, i18n } = useTranslation();

    const toDetail = (id: number) => {
        window.location.href = `/blogs/${id}`;
    }

    return (
        <div className="bg-white mb-12 p-2 rounded-md ">
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
                        <img src={blog.author_image} alt={blog.author_name} className="rounded-full w-full h-full" />
                    </div>
                    <span className="text-gray-500 text-md font-normal"> {t('general.by')} <span className="text-sky-400">{blog.author_name}</span></span>
                    <span className="text-gray-500 text-md font-normal flex items-center"><CalendarEventFill className="me-1"/>{blog.since_posted.split(" ")[0]} {t(`general.${blog.since_posted.split(" ")[1] + ' ago'}`)}</span>
                    <span className="text-gray-500 text-md font-normal flex items-center"><Tag className="me-1"/><span className="text-sky-400">{blog[`category_name_${i18n.language}`]}</span></span>
                    {/* <span className="text-gray-500 text-md font-normal flex items-center"><Chat className="me-1"/>{blog.comments}</span> */}
                </div>
                <div className="flex items-center">
                    <button className="font-bold text-md py-2 px-3 bg-sky-400 rounded-md text-white" onClick={() => toDetail(blog.id)}>
                        {t('general.read_more')}
                    </button>
                </div>
            </div>
        </div>
    );
}