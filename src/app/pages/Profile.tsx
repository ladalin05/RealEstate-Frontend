import { useState, useEffect } from "react";
import { Camera, Heart, User, Mail, Phone, PenLine } from "lucide-react";
import { useTranslation } from "react-i18next";
import { PropertyService } from "../services/property.service";
import { Loading } from "../components/ui/Loading";
import { AuthService } from "../services/auth.service";

const ProfilePage = () => {
    const { t } = useTranslation();
    const [user, setUser] = useState(() => JSON.parse(localStorage.getItem('user') || '{}'));
    const [properties, setProperties] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [form, setForm] = useState({
        name: user.name || "",
        email: user.email || "",
        phone: user.phone || "",
        bio: user.bio || "",
    });

    const userId = user.id;

    // Fetch fresh profile data on mount
    useEffect(() => {
        AuthService.getProfileData()
            .then((freshUser) => {
                setUser(freshUser.user);
                setForm({
                    name: freshUser.user.name || "",
                    email: freshUser.user.email || "",
                    phone: freshUser.user.phone || "",
                    bio: freshUser.user.bio || "",
                });
                localStorage.setItem('user', JSON.stringify(freshUser));
            })
            .catch((err) => console.error(err));
    }, []);

    const handleSubmit = async () => {
        setIsSubmitting(true);
        setError(null);

        try {
            const updatedUser = await AuthService.UpdateInfo({
                name: form.name,
                email: form.email,
                phone: form.phone,
                bio: form.bio,
            });

            setUser((prev) => {
                const merged = { ...prev, ...updatedUser };
                localStorage.setItem('user', JSON.stringify(merged));
                return merged;
            });
        } catch (err) {
            console.error(err);
            setError('Failed to update profile. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    useEffect(() => {
        if (!userId) return;
        setIsLoading(true);
        PropertyService.getFavoriteProperties(userId)
            .then(setProperties)
            .catch((err) => console.error(err))
            .finally(() => setIsLoading(false));
    }, [userId]);

    const property_count = properties.length;

    if (isLoading) {
        return <Loading />;
    }

    const update = (field) => (e) =>
        setForm((f) => ({ ...f, [field]: e.target.value }));

    return (
        <div className="min-h-screen w-full bg-slate-100 pb-18">
            <div className="w-full max-w-7xl lg:max-w-5xl mx-auto px-6 py-12">
                {/* ---------- Hero ---------- */}
                <div className="mb-8">
                    <p className="text-md tracking-[0.2em] uppercase mb-4 text-slate-400">
                        {t('user_dashboard.profile.subtitle')}
                    </p>
                    <h1 className="text-4xl font-semibold text-slate-900">
                        {t('user_dashboard.profile.title')}
                    </h1>
                </div>

                {/* ---------- Identity card ---------- */}
                <section className="relative overflow-hidden rounded-2xl mb-6 bg-white border border-slate-200 shadow-sm">
                    {/* accent line */}
                    <div className="absolute top-0 left-0 right-0 h-[3px] bg-blue-600" />

                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 p-8">
                        <div className="flex items-center gap-5">
                            <div className="relative shrink-0">
                                <div className="w-20 h-20 rounded-full p-[3px] bg-blue-100">
                                    <img
                                        src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
                                        alt="Profile"
                                        className="w-full h-full rounded-full object-cover bg-white"
                                    />
                                </div>
                                <button
                                    aria-label="Change photo"
                                    className="absolute -bottom-1 -right-1 rounded-full p-2 bg-blue-600 transition-transform hover:scale-105"
                                >
                                    <Camera size={14} className="text-white" />
                                </button>
                            </div>
                            <div>
                                <h2 className="text-xl font-semibold text-slate-900">
                                    {form.name || "Your name"}
                                </h2>
                                <p className="text-sm mt-1 flex items-center gap-1.5 text-slate-500">
                                    <Mail size={13} />
                                    {form.email || "your@email.com"}
                                </p>
                            </div>
                        </div>

                        {/* Stat tags */}
                        <div className="flex gap-3">
                            {[
                                { label: "Favourites", value: property_count, Icon: Heart },
                            ].map(({ label, value, Icon }) => (
                                <div
                                    key={label}
                                    className="relative flex flex-col items-center justify-center px-5 py-3 rounded-xl bg-blue-50 border border-dashed border-blue-200  min-w-[92px]"
                                >
                                    <Icon size={14} className="text-blue-600 mb-1" />
                                    <span className="text-2xl leading-none font-semibold text-slate-900">
                                        {value}
                                    </span>
                                    <span className="text-[11px] mt-1 tracking-wide text-slate-500">
                                        {label}
                                    </span>
                                    {/* tag hole */}
                                    <span className="absolute -left-1.5 top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-white" />
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ---------- Details ---------- */}
                <section className="grid grid-cols-1 lg:grid-cols-5 gap-6">
                    {/* Personal info */}
                    <div className="lg:col-span-3 rounded-2xl p-7 bg-white border border-slate-200">
                        <div className="flex items-center gap-2 mb-6">
                            <User size={16} className="text-blue-600" />
                            <h3 className="text-sm tracking-[0.14em] uppercase font-semibold text-slate-900">
                                {t('user_dashboard.profile.personal_info')}
                            </h3>
                        </div>

                        <div className="space-y-5">
                            <Field id="name" label={t('contact.form.name')}
                                placeholder="User Name" value={form.name} onChange={update("name")}
                            />
                            <Field id="email" type="email" label={t('contact.form.email')} placeholder="user@gmail.com" 
                                value={form.email} onChange={update("email")} icon={<Mail size={14} className="text-slate-400" />}
                            />
                            <Field id="phone" label={t('contact.form.phone')} placeholder="+251 900 000 000" 
                                value={form.phone} onChange={update("phone")} icon={<Phone size={14} className="text-slate-400" />}
                            />
                        </div>
                    </div>

                    {/* About */}
                    <div className="lg:col-span-2 rounded-2xl p-7 flex flex-col bg-white border border-slate-200">
                        <div className="flex items-center gap-2 mb-6">
                            <PenLine size={16} className="text-blue-800" />
                            <h3 className="text-sm tracking-[0.14em] uppercase font-semibold text-slate-900">
                                {t('user_dashboard.profile.about_me')}
                            </h3>
                        </div>
                        <label htmlFor="bio" className="text-xs mb-2 text-slate-400">
                           {t('user_dashboard.profile.bio')}
                        </label>
                        <textarea id="bio" value={form.bio} onChange={update("bio")} 
                            placeholder="Tell other users a little about yourself..." 
                            className="w-full flex-1 min-h-[140px] rounded-lg px-4 py-3 text-sm resize-none bg-slate-50 border border-slate-200 text-slate-900 focus:outline-none focus:border-blue-800 transition-colors"
                        />
                    </div>
                </section>

                {/* ---------- Actions ---------- */}
                <div className="flex justify-end gap-3 mt-7">
                    <button className="px-6 py-2.5 rounded-lg text-sm border border-slate-200 text-red-500 hover:bg-red-50 transition-colors">
                       {t('user_dashboard.profile.cancel')}
                    </button>
                    <button 
                        onClick={() => handleSubmit()}
                        disabled={isSubmitting}
                        className="px-6 py-2.5 rounded-lg text-sm bg-blue-800 text-white hover:bg-blue-900 transition-colors disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2">
                        {isSubmitting && (
                            <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                            </svg>
                        )}
                        {isSubmitting ? t('user_dashboard.profile.saving') : t('user_dashboard.profile.save_changes')}
                    </button>
                </div>
                {error && <p className="text-red-500 text-sm">{error}</p>}
            </div>
        </div>
    );
};

const Field = ({ id, label, placeholder, value, onChange, type = "text", icon = null }) => (
    <div className="flex flex-col">
        <label htmlFor={id} className="text-xs mb-2 text-slate-400">
            {label}
        </label>
        <div className="relative">
            {icon && (
                <span className="absolute left-3 top-1/2 -translate-y-1/2">{icon}</span>
            )}
            <input
                id={id}
                type={type}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                className={`w-full rounded-lg py-2.5 text-sm bg-slate-50 border border-slate-200 text-slate-900 focus:outline-none focus:border-blue-800 transition-colors ${
                    icon ? "pl-9 pr-4" : "px-4"
                }`}
            />
        </div>
    </div>
);

export default ProfilePage;