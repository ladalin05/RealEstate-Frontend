import { Camera } from "lucide-react";
import { useTranslation } from "react-i18next";

const ProfilePage = () => {
    const { t } = useTranslation();
    const user = JSON.parse(localStorage.getItem('user') || '{}');

    return (
        <div className="min-h-screen w-3/4 mx-auto p-10">
            <h1 className="font-bold text-2xl">{t('user_dashboard.profile.title')}</h1>
            <h4 className="text-gray-600 font-light mt-1">{t('user_dashboard.profile.subtitle')}</h4>
            <div className="w-full mt-6">
                <section className="h-full w-full flex items-center justify-between relative z-10 overflow-hidden gap-4 rounded-xl border border-border bg-card p-6">
                    <div className="absolute top-0 left-0 w-full z-0 h-1 bg-blue-500 rounded-t-[calc(1rem+1px)]"></div>
                    <div className="flex items-center gap-4 relative z-10">
                        <div className="img relative">
                            <Camera size={30} className="absolute bottom-0 right-0 bg-gray-300 rounded-full p-1.5" />
                            <img src="https://cdn-icons-png.flaticon.com/512/149/149071.png" alt="profile" className="w-24 h-24 rounded-full" />
                        </div>
                        <div>
                            <h2 className="font-semibold text-lg">{user.name}</h2>
                            <p className="text-sm font-light text-gray-600">{user.email}</p>
                        </div>
                    </div>
                    <div className="flex">
                        <ul className="flex items-center gap-4">
                            <li className="text-center">
                                <h1 className="text-blue-600 text-3xl">4</h1>
                                <p className="text-gray-600">{t('general.properties')}</p>
                            </li>
                            <li className="text-center">
                                <h1 className="text-blue-600 text-3xl">4</h1>
                                <p className="text-gray-600">{t('general.favourites')}</p>
                            </li>
                        </ul>
                    </div>
                </section>
                <section className="w-full flex gap-2 mt-2"> 
                    <div className="h-full w-1/2 overflow-hidden gap-4 rounded-xl border border-border bg-card p-6">
                        <h3 className="font-semibold text-lg uppercase">{t('user_dashboard.profile.personal_info')}</h3>
                        <div className="space-y-4 mt-4">
                            <div className="flex flex-col relative">
                                <label htmlFor="name" className="text-sm text-gray-600 mb-2">{t('contact.form.name')}</label>
                                <div className="flex gap-2 relative">
                                    <input type="text" id="name" className="w-full border border-gray-300 rounded-sm bg-gray-100 px-3 py-2 focus:outline-none focus:border-blue-500" placeholder="User Name" /> 
                                </div>
                            </div>
                            <div>
                                <label htmlFor="email" className="text-sm text-gray-600 mb-2">{t('contact.form.email')}</label>
                                <input type="email" id="email" className="w-full border border-gray-300 rounded-sm bg-gray-100 px-3 py-2 focus:outline-none focus:border-blue-500" placeholder="user@gmail.com" /> 
                            </div>
                            <div>
                                <label htmlFor="phone" className="text-sm text-gray-600 mb-2">{t('contact.form.phone')}</label>
                                <input type="text" id="phone" className="w-full border border-gray-300 rounded-sm bg-gray-100 px-3 py-2 focus:outline-none focus:border-blue-500" placeholder="+251 900 000 000" />
                            </div>
                        </div>
                    </div>
                    <section className="h-full w-full relative z-10 overflow-hidden rounded-xl border border-border bg-card p-6">
                        <h3 className="font-semibold text-lg uppercase">{t('user_dashboard.profile.about_me')}</h3>
                        <div className="space-y-4 mt-4">
                            <div className="flex flex-col">
                                <label htmlFor="about" className="text-sm text-gray-600 mb-2">{t('user_dashboard.profile.bio')}</label>
                                <textarea id="about" className="w-full border border-gray-300 rounded-sm bg-gray-100 px-3 py-2 focus:outline-none focus:border-blue-500" placeholder={t('user_dashboard.profile.about_me')}></textarea>
                            </div>
                        </div>
                    </section>
                </section>
                <section className="w-full mt-4 flex justify-end gap-2 ">
                    <button className="px-6 py-2 border border-gray-300 text-red-500 rounded-sm hover:bg-red-100 cursor-pointer mr-2">{t('user_dashboard.profile.cancel')}</button>
                    <button className="px-6 py-2 bg-blue-500 text-white rounded-sm hover:bg-blue-600 cursor-pointer">{t('user_dashboard.profile.save_changes')}</button> 
                </section>
            </div>
        </div>
    );
};

export default ProfilePage;