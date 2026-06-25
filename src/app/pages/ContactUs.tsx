import { useState } from "react";
import { FaFacebookF, FaTwitter, FaYoutube, FaLinkedinIn, FaInstagram, FaSkype } from "react-icons/fa";

const ContactUsPage = () => {
    const [form, setForm] = useState({ firstName: '', lastName: '', email: '', message: ''});
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        })
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!form) return;
    }
        
    const socials = [
    { label: "Facebook",  Icon: FaFacebookF,  color: "bg-[#3b5998] hover:bg-[#2d4373]" },
    { label: "Twitter",   Icon: FaTwitter,    color: "bg-[#1da1f2] hover:bg-[#0c85d0]" },
    { label: "YouTube",   Icon: FaYoutube,    color: "bg-[#ff0000] hover:bg-[#cc0000]" },
    { label: "LinkedIn",  Icon: FaLinkedinIn, color: "bg-[#0077b5] hover:bg-[#005885]" },
    { label: "Instagram", Icon: FaInstagram,  color: "bg-[#333333] hover:bg-[#111111]" },
    { label: "Skype",     Icon: FaSkype,      color: "bg-[#00aff0] hover:bg-[#0088bb]" },
    ];

    return (
        <div className="min-h-screen relative top-18"
            style={{ backgroundImage: `url('https://demo01.houzez.co/wp-content/uploads/2016/03/205.jpg')`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                backgroundAttachment: 'fixed', }} >
            <div className="w-full py-20 bg-sky-900/50 flex items-center backdrop-blur-sx px-28">
                <h1 className="text-3xl text-white font-medium">Contact Us</h1>
            </div>
            <div className="w-full h-full bg-slate-50 py-18 px-28">
                <div className="flex justify-center gap-22">
                    <div className="w-3/6 p-12 bg-white shadow-sm">
                        <p className="text-gray-500">Design your custom contact forms with this Houzez Elementor custom widget and connect your leads with the integrated Houzez CRM.</p>
                        <form className="space-y-10 relative z-10 mt-18" onSubmit={handleSubmit}>
                            <div className="grid md:grid-cols-2 gap-10">
                                <div className="relative group">
                                    <input type="text" id="first_name" placeholder=" " required value={form.firstName} onChange={handleChange} name="first_name"
                                        className="peer w-full bg-transparent border-b border-slate-200 dark:border-white/10 py-3 text-slate-900 dark:text-white outline-none focus:border-blue-600 dark:focus:border-blue-500 transition-all duration-500"/>
                                    <label htmlFor="name" className="absolute left-0 top-3 font-mono text-md uppercase tracking-widest text-slate-400 dark:text-slate-500 pointer-events-none transition-all duration-300 peer-focus:-translate-y-8 peer-focus:text-blue-600 dark:peer-focus:text-blue-400 peer-[:not(:placeholder-shown)]:-translate-y-8">
                                        First Name
                                    </label>
                                    <div className="absolute bottom-0 left-0 h-[2px] w-0 bg-blue-600 dark:bg-blue-500 group-focus-within:w-full transition-all duration-700 shadow-[0_0_12px_rgba(59,130,246,0.5)]"></div>
                                </div>
                                <div className="relative group">
                                    <input type="text" id="last_name" placeholder=" " required value={form.lastName} onChange={handleChange} name="last_name"
                                        className="peer w-full bg-transparent border-b border-slate-200 dark:border-white/10 py-3 text-slate-900 dark:text-white outline-none focus:border-blue-600 dark:focus:border-blue-500 transition-all duration-500"/>
                                    <label htmlFor="email" className="absolute left-0 top-3 font-mono text-md uppercase tracking-widest text-slate-400 dark:text-slate-500 pointer-events-none transition-all duration-300 peer-focus:-translate-y-8 peer-focus:text-blue-600 dark:peer-focus:text-blue-400 peer-[:not(:placeholder-shown)]:-translate-y-8">
                                        Last Name
                                    </label>
                                    <div className="absolute bottom-0 left-0 h-[2px] w-0 bg-blue-600 dark:bg-blue-500 group-focus-within:w-full transition-all duration-700 shadow-[0_0_12px_rgba(59,130,246,0.5)]"></div>
                                </div>
                            </div>
                            <div className="relative group">
                                <input type="email" id="email" placeholder=" " required value={form.email} onChange={handleChange} name="email"
                                    className="peer w-full bg-transparent border-b border-slate-200 dark:border-white/10 py-3 text-slate-900 dark:text-white outline-none focus:border-blue-600 dark:focus:border-blue-500 transition-all duration-500"/>
                                <label htmlFor="email" className="absolute left-0 top-3 font-mono text-md uppercase tracking-widest text-slate-400 dark:text-slate-500 pointer-events-none transition-all duration-300 peer-focus:-translate-y-8 peer-focus:text-blue-600 dark:peer-focus:text-blue-400 peer-[:not(:placeholder-shown)]:-translate-y-8">
                                    Email Address
                                </label>
                                <div className="absolute bottom-0 left-0 h-[2px] w-0 bg-blue-600 dark:bg-blue-500 group-focus-within:w-full transition-all duration-700 shadow-[0_0_12px_rgba(59,130,246,0.5)]"></div>
                            </div>
                            <div className="relative group">
                                <textarea id="message" rows={4} placeholder=" " required value={form.message} onChange={handleChange} name="message"
                                    className="peer w-full bg-transparent border-b border-slate-200 dark:border-white/10 py-3 text-slate-900 dark:text-white outline-none focus:border-blue-600 dark:focus:border-blue-500 transition-all duration-500 resize-none"
                                ></textarea>
                                <label htmlFor="message" className="absolute left-0 top-3 font-mono text-md uppercase tracking-widest text-slate-400 dark:text-slate-500 pointer-events-none transition-all duration-300 peer-focus:-translate-y-8 peer-focus:text-blue-600 dark:peer-focus:text-blue-400 peer-[:not(:placeholder-shown)]:-translate-y-8">
                                    Message
                                </label>
                                <div className="absolute bottom-0 left-0 h-[2px] w-0 bg-blue-600 dark:bg-blue-500 group-focus-within:w-full transition-all duration-700 shadow-[0_0_12px_rgba(59,130,246,0.5)]"></div>
                            </div>
                            <button
                                type="submit"
                                className="relative w-full group overflow-hidden bg-slate-900 dark:bg-blue-600 rounded-2xl py-4 active:scale-[0.98] transition-all duration-300">
                                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                                <span className="relative z-10 flex items-center justify-center font-mono text-md font-bold uppercase tracking-[0.3em] text-white">
                                    Submit
                                    <svg className="ml-3 w-5 h-5 group-hover:translate-x-2 transition-transform duration-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path d="M14 5l7 7m0 0l-7 7m7-7H3" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                </span>
                            </button>
                        </form>
                    </div>
                    <div className="w-2/6">
                        <div className="bg-white p-8 px-12 shadow-sm leading-7">
                            <h5 className="text-md font-semibold">For inquiries contact:</h5>
                            <h5 className="text-md font-bold mt-4">Amy Miller</h5>
                            <p className="text-md text-gray-500 font-thin">Public Relations Manager <br />774 NE 84th St Miami, FL 33879</p>
                            <p className="text-md text-gray-500 font-thin">amy.miller@houzez.com</p>
                            <h5 className="text-md font-bold mt-4">Kyle Parker</h5>
                            <p className="text-md text-gray-500 font-thin">Public Relations Associated <br />774 NE 84th St Miami, FL 33879</p>
                            <p className="text-md text-gray-500 font-thin">kyle.parker@houzez.com</p>
                        </div>
                        <div className="bg-white p-8 px-12 mt-12 shadow-sm leading-7">
                            <h5 className="text-md font-semibold">Corporate Headquarters</h5>
                            <p className="text-md text-gray-500 font-thin">1584 Biscayne Boulevard <br />Miami FL, 33176</p>
                        </div>
                        <div className="flex justify-center mt-8 gap-4">
                            {socials.map((social, index) => (
                                <button key={index} className={`${social.color} w-12 h-12 rounded-lg flex items-center justify-center transition-all duration-200 cursor-pointer`}>
                                    <social.Icon color="white" size={20} />
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
                <div className="w-full flex justify-center bg-slate-50">
                    <div className="w-5/6 h-64 mt-26 overflow-hidden border border-gray-200">
                        <iframe src="https://maps.google.com/maps?q=1584%20Biscayne%20Blvd%2C%20Miami%2C%20FL%2033132&t=m&z=12&output=embed&iwloc=near" width="100%" height="100%" loading="lazy" allowFullScreen />
                    </div>
                </div>
                <div className="w-full flex justify-center">
                    <div className="w-5/6 bg-white p-8 mt-1 shadow-sm">
                        <p><b>Address:</b> 1584 Biscayne Blvd, Miami, FL 33132 – <span className="text-sky-400">Get Directions</span></p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ContactUsPage;