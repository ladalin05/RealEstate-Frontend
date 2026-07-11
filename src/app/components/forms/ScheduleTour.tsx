import { useState } from "react";
import { User} from "lucide-react";
import { TimeSelect } from "../ui/TimeSelect";
import { SelectForm } from "../ui/SelectForm";
import { useTranslation } from "react-i18next";
import { DatePicker } from "../ui/DatePicker";
import { InteractionService } from "../../services/interaction.service";
import { buildPayload } from "../../utils/helper";
import { MessageModal } from "./MessageModal";


export const ScheduleTour = ({ agent, propertyId }: { agent: any, propertyId: string }) => {
    const { t } = useTranslation();
    const [tourType, setTourType] = useState<string | null>("in-person");
    const [status, setStatus] = useState(null);
    const [message, setMessage] = useState("");
    const [isloading, setIsLoading] = useState<boolean>(false);
    const [form, setForm] = useState({
        property_id: propertyId,
        agent_id: agent?.id,
        schedule_time: "",
        schedule_date: "",
        tour_type: tourType,
        name: "",
        phone: "",
        email: "",
        message: "",
    })

    const handleSubmit = async () => {
        setStatus("loading");
        setMessage("");
        InteractionService.scheduleTour(buildPayload(form)).then((res) => {
            setStatus("success");
            setMessage(res?.message || "Your request has been sent.");
        }).catch(err => {
            setStatus("danger");
            setMessage(err?.message || "Something went wrong. Please try again.");
        }).finally(() => {
            setIsLoading(false)
        });
    };

    const resetStatus = () => {
        setStatus(null);
        setMessage("");
    };

    return (
        <>
            {status && (
                <MessageModal open={true} type={status}
                    message={status === "loading" ? "" : message}
                    onClose={resetStatus}
                    autoCloseMs={3000}
                    title={
                        status === "loading" ? t('general.sending') || "Sending..." :
                        status === "success" ? "Success" : "Error"
                    }
                />
            )}
            <div className="w-full h-auto p-4 ">
                <div className="flex items-center p-5">
                    <div className="w-18 h-18 rounded-sm overflow-hidden">
                        <img src={agent?.image} alt="" className="w-full h-full object-cover" />
                    </div>
                    <div className="px-6">
                        <p className="text-lg text-gray-800 dark:text-gray-200 flex items-center gap-1"><User size={20} /> {agent?.name}</p>
                        <button className="text-md font-semibold text-sky-500 mt-2">{t('general.view_listing')}</button>
                    </div>
                </div>
            </div>
            <div className="w-full p-9 ">
                <h2 className="text-md font-bold text-gray-800 dark:text-gray-200 mb-2">{t('schedule_tour.tour_type')}</h2>
                <form className="flex flex-col gap-4">
                    <div className="flex justify-between gap-3 h-12 mt-6">  
                        <div onClick={() => {
                                setForm({...form, tour_type: "in-person"});
                                setTourType("in-person");
                            }} 
                            className={`w-1/2 text-sm font-bold rounded-sm flex items-center justify-center cursor-pointer ${tourType === "in-person" ? "border border-sky-400 text-sky-400" : "text-gray-800 border border-gray-300"} hover:text-sky-400`}>{t('schedule_tour.in_person')}</div> 
                        <div onClick={() => {
                                setForm({...form, tour_type: "video-chat"});
                                setTourType("video-chat")
                            }}
                            className={`w-1/2 text-sm font-bold rounded-sm flex items-center justify-center cursor-pointer ${tourType === "video-chat" ? "border border-sky-400 text-sky-400" : "text-gray-800 border border-gray-300"} hover:text-sky-400`}>{t('schedule_tour.video_chart')}</div>
                    </div>
                    
                    <DatePicker value={form.schedule_date} onChange={(value) => setForm({...form, schedule_date: value})} min={new Date().toISOString().split('T')[0]} placeholder={t('schedule_tour.select_date')}
                        className={`w-full px-4 py-4 rounded-xl bg-gray-50 border border-border focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 transition-all outline-none appearance-none cursor-pointer`} />
                    <TimeSelect value={form.schedule_time} onChange={(value) => setForm({...form, schedule_time: value})} />
                    <input type="text" value={form.name} name="name" placeholder={t('schedule_tour.your_name')} onChange={(e) => setForm({...form, name: e.target.value})} className="w-full h-12 border border-gray-300 rounded-sm px-3 focus:outline-none focus:ring-1 focus:ring-sky-300" />
                    <input type="tel" value={form.phone} name="phone" placeholder={t('schedule_tour.your_phone')} onChange={(e) => setForm({...form, phone: e.target.value})} className="w-full h-12 border border-gray-300 rounded-sm px-3 focus:outline-none focus:ring-1 focus:ring-sky-300" />
                    <input type="email" value={form.email} name="email" placeholder={t('schedule_tour.your_email')} onChange={(e) => setForm({...form, email: e.target.value})} className="w-full h-12 border border-gray-300 rounded-sm px-3 focus:outline-none focus:ring-1 focus:ring-sky-300" />
                    <textarea name="message" value={form.message} placeholder={t('schedule_tour.your_message')} onChange={(e) => setForm({...form, message: e.target.value})} className="w-full h-24 border border-gray-300 rounded-sm px-3 py-2 focus:outline-none focus:ring-1 focus:ring-sky-300 resize-none" />
                    <button type="button" disabled={isloading} 
                            onClick={() => handleSubmit()}
                            className="w-full h-12 bg-green-400 text-white font-bold rounded-sm hover:bg-green-500">
                            {isloading ? t('general.loading') : t('general.submit')}
                    </button>
                </form>
            </div>
        </>
    );
}
export const RequestInfo = ({ agent, propertyId }: { agent: any, propertyId: string }) => {
    const { t } = useTranslation();
    const options = ["I'm a buyer", "I'm a tennant", "I'm an agent", "Other"];
    const [status, setStatus] = useState(null);
    const [message, setMessage] = useState("");
    const [form, setForm] = useState({
        property_id: propertyId,
        agent_id: agent?.id,
        name: "",
        phone: "",
        email: "",
        message: "",
        role: ""
    });

    const handleSubmit = () => {
        setStatus("loading");
        setMessage("");

        InteractionService.requestInfo(form)
            .then(res => {
                setStatus("success");
                setMessage(res?.message || "Your request has been sent.");
            })
            .catch(err => {
                setStatus("danger");
                setMessage(err?.message || "Something went wrong. Please try again.");
            });
    };

    const resetStatus = () => {
        setStatus(null);
        setMessage("");
    };

    return (
        <>
            {status && (
                <MessageModal open={true} type={status}
                    message={status === "loading" ? "" : message}
                    onClose={resetStatus}
                    autoCloseMs={3000}
                    title={
                        status === "loading" ? t('general.sending') || "Sending..." :
                        status === "success" ? "Success" : "Error"
                    }
                />
            )}

            <div className="w-full h-auto p-4 ">
                <div className="flex items-center p-5">
                    <div className="w-18 h-18 rounded-sm overflow-hidden">
                        <img src={agent?.image} alt="" className="w-full h-full object-cover" />
                    </div>
                    <div className="px-6">
                        <p className="text-lg text-gray-800 dark:text-gray-200 flex items-center gap-1"><User size={20} /> {agent?.name}</p>
                        <button className="text-md font-semibold text-sky-500 mt-2">{t('general.view_listing')}</button>
                    </div>
                </div>
            </div>
            <div className="w-full px-9 py-6">
                <form className="flex flex-col gap-4">
                    <input type="text" onChange={(e) => setForm({...form, name: e.target.value})} value={form.name} name="name" placeholder={t('schedule_tour.your_name')} className="w-full h-12 border border-gray-300 rounded-sm px-3 focus:outline-none focus:ring-1 focus:ring-sky-300" />
                    <input type="tel" onChange={(e) => setForm({...form, phone: e.target.value})} value={form.phone} name="phone" placeholder={t('schedule_tour.your_phone')} className="w-full h-12 border border-gray-300 rounded-sm px-3 focus:outline-none focus:ring-1 focus:ring-sky-300" />
                    <input type="email" onChange={(e) => setForm({...form, email: e.target.value})} value={form.email} name="email" placeholder={t('schedule_tour.your_email')} className="w-full h-12 border border-gray-300 rounded-sm px-3 focus:outline-none focus:ring-1 focus:ring-sky-300" />
                    <textarea onChange={(e) => setForm({...form, message: e.target.value})} value={form.message} name="message" placeholder={t('schedule_tour.your_message')} className="w-full h-24 border border-gray-300 rounded-sm px-3 py-2 focus:outline-none focus:ring-1 focus:ring-sky-300 resize-none" />
                    <SelectForm options={options} value={form.role} onChange={(value) => setForm({...form, role: value})} />
                    <div className="flex justify-between gap-3">
                        <button type="button" disabled={status === "loading"}
                                onClick={() => handleSubmit()}
                                className="w-full h-12 bg-green-600 text-white font-bold rounded-sm hover:bg-green-500">
                            {t('general.send_message')}
                        </button>
                        <a href={`tel:${agent?.phone}`} className="w-full h-12 border border-green-500 text-green-500 font-bold rounded-sm hover:bg-green-500 hover:text-white flex items-center justify-center">{t('general.call')}</a>
                    </div>
                </form>
            </div>
        </>
    );
};