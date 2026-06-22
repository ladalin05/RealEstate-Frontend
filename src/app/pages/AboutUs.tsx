import { BlogCard } from "../components/forms/BlogCard";
import { ourTeamData, blogData } from "../utils/data";

const AboutUsPage = () => {

    const ourTeam = ourTeamData.slice(0, 4);
    const blogs = blogData.slice(0, 4);

    return (
        <div className="min-h-screen relative top-18"
            style={{ backgroundImage: `url('https://demo01.houzez.co/wp-content/uploads/2016/03/023.jpg')`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                backgroundAttachment: 'fixed', }} >
            <div className="w-full py-20 bg-sky-900/50 flex items-center backdrop-blur-sx px-28">
                <h1 className="text-3xl text-white font-medium">About Us</h1>
            </div>
            <div className="w-full h-full bg-white py-18 px-28">
                <h2 className="text-2xl font-thin">Your Vision Unrestricted</h2>
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
                <h1 className="text-4xl font-thin">Meet our Team</h1>
                <p className="text-gray-400 mt-3">Lorem ipsum dolor sit amet, consectetur adipisicing elit</p>
                <div className="flex gap-12 p-12">
                    {ourTeam.map((team, index) => (
                        <div className="w-100 h-97 relative group overflow-hidden rounded-sm" key={index}>
                            <div className="absolute inset-0 z-0  bg-gradient-to-b from-black/10 via-transparent to-black/60 "></div>
                            <img src={team.image} alt="" className="w-full h-full" />
                            <div className="absolute bottom-4 w-full text-center text-white">
                                <h1 className="text-lg font-bold">{team.name}</h1>
                                <h6 className="text-md">{team.role}</h6>
                            </div>
                            <div className="w-full h-full absolute bottom-0 bg-white/80 flex items-end translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-in-out">
                                <div className="text-center py-12 px-7 leading-7">
                                    <h1 className="text-lg text-black font-bold">{team.name}</h1>
                                    <h6 className="text-md text-gray-400 mb-2">{team.role}</h6>
                                    <p className="text-md text-gray-400 mb-4">Lorem ipsum dolor sit amet, consectetur adipiscing elit. In malesuada, odio sit amet pharetra vehicula, sapien leo egestas magna, vitae auctor diam magna cursus arcu.</p>
                                    <div className="flex gap-4 justify-center">
                                        {team.social.map((social, index) => (
                                            <a href={social.link} key={index} >
                                                <social.icon size={18} />
                                            </a>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div className="w-full h-full bg-white py-18 px-28">
                <h1 className="text-4xl font-thin">Read From Our Blog</h1>
                <p className="text-gray-400 mt-3">Lorem ipsum dolor sit amet, consectetur adipisicing elit</p>
                <div className="flex gap-6 p-12">
                    {blogs.map((blog, index) => (
                        <BlogCard blog={blog} key={index}/>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default AboutUsPage;