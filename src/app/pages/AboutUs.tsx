import { BlogCard } from "../components/cards/BlogCard";
import { ourTeamData } from "../utils/data";
import { useEffect, useState } from "react";
import { BlogService } from "../services/blogs.service";
import { TeamCard } from "../components/cards/TeamCard";
import { Loading } from "../components/ui/Loading";
import { useTranslation } from "react-i18next";

const AboutUsPage = () => {
    const {t} = useTranslation();
    const ourTeam = ourTeamData.slice(0, 4);
    const [blogs, setBlogs] = useState<any>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setIsLoading(true);
        BlogService.getBlogs().then((data) => {
            setBlogs(data.blogs);
        }).finally(() => {
            setIsLoading(false);
        });
    }, []);

    if (isLoading) {
        return (
            <Loading />
        );
    }

    return (
        <div className="min-h-screen relative top-18"
            style={{ backgroundImage: `url('https://demo01.houzez.co/wp-content/uploads/2016/03/023.jpg')`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                backgroundAttachment: 'fixed', }} >
            <div className="w-full py-20 bg-sky-900/50 flex items-center backdrop-blur-sx px-28">
                <h1 className="text-3xl text-white font-medium">{t('about_us.title')}</h1>
            </div>
            <div className="w-full h-full bg-white py-18 px-20">
                <h2 className="text-2xl font-thin">{t('about_us.your_vision_unrestricted')}</h2>
                <div className="w-full grid grid-cols-2 gap-16 mt-6">
                    <span className="text-md text-gray-500">
                        <p className="leading-7">
                            Houzez is a premium WordPress theme for real estate agents and agencies where modern aesthetics are combined with a tasteful simplicity and where the ease of use is achieved without compromise in your ability to customize the design.
                        </p>
                        <p className="leading-7 mt-5">
                            Whether you are a real estate agent looking to build a website for your company or a web developer seeking a perfect WordPress theme for your next project, you are certain to appreciate the numerous features and benefits that our theme provides.
                        </p>
                    </span>
                    <span className="text-md text-gray-500">
                        <p className="leading-7">
                            Houzez is also a WordPress-based property management system which allows you to own and maintain a real estate marketplace, coordinate your agents, accept submissions and offer membership packages.
                        </p>
                        <p className="leading-7 mt-5">
                            Unlike many other real estate themes which confine you to a handful of predefined layouts, Houzez offers a limitless array of possibilities to structure and style your content. All of the customization options are logically organized in your WordPress admin panel and thorough customization in the provided documentation.
                        </p>
                    </span>
                </div>
            </div>
            <div className="w-full h-full bg-slate-50 py-18 px-28">
                <h1 className="text-4xl font-thin">{t('about_us.meet_our_team')}</h1>
                <p className="text-gray-400 mt-3">{t('about_us.desc_about_team')}</p>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mt-12 ">
                    {ourTeam.map((team, index) => (
                        <TeamCard team={team} key={index}/>
                    ))}
                </div>
            </div>
            <div className="w-full h-full bg-white py-18 px-28">
                <h1 className="text-4xl font-thin">{t('about_us.read_from_our_blog')}</h1>
                <p className="text-gray-400 mt-3">{t('about_us.desc_about_blog')}</p>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-12 ">
                    {blogs && (blogs.slice(0, 4).map((blog, index) => (
                        <BlogCard blog={blog} key={index}/>
                    )))}
                </div>
            </div>
        </div>
    )
}

export default AboutUsPage;