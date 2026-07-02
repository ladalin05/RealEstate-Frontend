import { useRef, useState } from "react";
import { ChevronLeft, ChevronRight, User} from "lucide-react";
import { TimeSelect } from "../ui/TimeSelect";
import { SelectForm } from "../ui/SelectForm";
import { useTranslation } from "react-i18next";


export const ScheduleTour = ({ agent }: { agent: any }) => {
    const { t } = useTranslation();
    const dateRef = useRef<HTMLDivElement>(null);
    const [time, setTime] = useState<string | null>(null);
    const [tourType, setTourType] = useState<string | null>("in-person");
    const dateData = [
        { id: 1, day: "Sun", date: 1, month: "Jun" },
        { id: 2, day: "Mon", date: 2, month: "Jun" },
        { id: 3, day: "Tue", date: 3, month: "Jun" },
        { id: 4, day: "Wed", date: 4, month: "Jun" },
        { id: 5, day: "Thu", date: 5, month: "Jun" },
        { id: 6, day: "Fri", date: 6, month: "Jun" },
        { id: 7, day: "Sat", date: 7, month: "Jun" },
        { id: 8, day: "Sun", date: 8, month: "Jun" },
        { id: 9, day: "Tue", date: 9, month: "Jun" },
        { id: 10, day: "Wed", date: 10, month: "Jun" },
        { id: 11, day: "Thu", date: 11, month: "Jun" },
        { id: 12, day: "Fri", date: 12, month: "Jun" },
        { id: 13, day: "Sat", date: 13, month: "Jun" },
        { id: 14, day: "Sun", date: 14, month: "Jun" },
        { id: 15, day: "Mon", date: 15, month: "Jun" },
        { id: 16, day: "Tue", date: 16, month: "Jun" },
        { id: 17, day: "Wed", date: 17, month: "Jun" },
        { id: 18, day: "Thu", date: 18, month: "Jun" },
        { id: 19, day: "Fri", date: 19, month: "Jun" },
        { id: 20, day: "Sat", date: 20, month: "Jun" },
        { id: 21, day: "Sun", date: 21, month: "Jun" },
        { id: 22, day: "Mon", date: 22, month: "Jun" },
        { id: 23, day: "Tue", date: 23, month: "Jun" },
        { id: 24, day: "Wed", date: 24, month: "Jun" },
        { id: 25, day: "Thu", date: 25, month: "Jun" },
        { id: 26, day: "Fri", date: 26, month: "Jun" },
        { id: 27, day: "Sat", date: 27, month: "Jun" },
        { id: 28, day: "Sun", date: 28, month: "Jun" },
        { id: 29, day: "Mon", date: 29, month: "Jun" },
        { id: 30, day: "Tue", date: 30, month: "Jun" },
    ];
    
    const prevDate = () => {
        const container = dateRef.current?.querySelector('.overflow-x-auto');
        if (container) {
            container.scrollBy({ left: -92, behavior: 'smooth' });
        }
    };

    const nextDate = () => {
        const container = dateRef.current?.querySelector('.overflow-x-auto');
        if (container) {
            container.scrollBy({ left: 92, behavior: 'smooth' });
        }
    };

    return (
        <>
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
            <div className="w-full flex items-center justify-center gap-2 px-9 relative" ref={dateRef}>
                <div className="w-full flex justify-between px-6 absolute ">
                    <button className="w-8 h-8 flex justify-center items-center border border-gray-200 hover:bg-gray-300 rounded-full" onClick={() => prevDate()}> <ChevronLeft size={20} className="text-gray-600" /> </button>
                    <button className="w-8 h-8 flex justify-center items-center border border-gray-200 hover:bg-gray-300 rounded-full" onClick={() => nextDate()}> <ChevronRight size={20} className="text-gray-600" /> </button>
                </div>
                <div className="flex gap-1 overflow-x-auto scrollbar-hide">
                    {dateData.map((date) => (
                        <div key={date.id} className="flex-shrink-0 w-22 py-4 text-center rounded-sm border border-gray-300 cursor-pointer hover:bg-gray-100 px-2">
                            <p className="text-sm font-medium text-gray-800">{date.day}</p>
                            <p className="text-xl font-bold text-gray-800 dark:text-gray-200">{date.date}</p>
                            <p className="text-sm font-medium text-gray-800">{date.month}</p>
                        </div>
                    ))}
                </div>
            </div>
            <div className="w-full p-9 ">
                <h2 className="text-md font-bold text-gray-800 dark:text-gray-200 mb-2">{t('schedule_tour.tour_type')}</h2>
                <form className="flex flex-col gap-4">
                    <div className="flex justify-between gap-3 h-12 mt-6"> 
                        <div onClick={() => setTourType("in-person")} className={`w-1/2 text-sm font-bold rounded-sm flex items-center justify-center cursor-pointer ${tourType === "in-person" ? "border border-sky-400 text-sky-400" : "text-gray-800 border border-gray-300"} hover:text-sky-400`}>{t('schedule_tour.in_person')}</div> 
                        <div onClick={() => setTourType("video-chat")} className={`w-1/2 text-sm font-bold rounded-sm flex items-center justify-center cursor-pointer ${tourType === "video-chat" ? "border border-sky-400 text-sky-400" : "text-gray-800 border border-gray-300"} hover:text-sky-400`}>{t('schedule_tour.video_chart')}</div>
                    </div>
                    <TimeSelect value={time} onChange={setTime} />
                    <input type="text" name="name" placeholder={t('schedule_tour.your_name')} className="w-full h-12 border border-gray-300 rounded-sm px-3 focus:outline-none focus:ring-1 focus:ring-sky-300" />
                    <input type="tel" name="phone" placeholder={t('schedule_tour.your_phone')} className="w-full h-12 border border-gray-300 rounded-sm px-3 focus:outline-none focus:ring-1 focus:ring-sky-300" />
                    <input type="email" name="email" placeholder={t('schedule_tour.your_email')} className="w-full h-12 border border-gray-300 rounded-sm px-3 focus:outline-none focus:ring-1 focus:ring-sky-300" />
                    <textarea name="message" placeholder={t('schedule_tour.your_message')} className="w-full h-24 border border-gray-300 rounded-sm px-3 py-2 focus:outline-none focus:ring-1 focus:ring-sky-300 resize-none" />
                    <button type="submit" className="w-full h-12 bg-green-400 text-white font-bold rounded-sm hover:bg-green-500">{t('general.submit')}</button>
                </form>
            </div>
        </>
    );
}

export const RequestInfo = ({ agent }: { agent: any }) => {
    const { t } = useTranslation();
    const options = ["I'm a buyer", "I'm a tennant", "I'm an agent", "Other"];
    const [role, setRole] = useState("");   

    return (
        <>
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
                    <input type="text" name="name" placeholder={t('schedule_tour.your_name')} className="w-full h-12 border border-gray-300 rounded-sm px-3 focus:outline-none focus:ring-1 focus:ring-sky-300" />
                    <input type="tel" name="phone" placeholder={t('schedule_tour.your_phone')} className="w-full h-12 border border-gray-300 rounded-sm px-3 focus:outline-none focus:ring-1 focus:ring-sky-300" />
                    <input type="email" name="email" placeholder={t('schedule_tour.your_email')} className="w-full h-12 border border-gray-300 rounded-sm px-3 focus:outline-none focus:ring-1 focus:ring-sky-300" />
                    <textarea name="message" placeholder={t('schedule_tour.your_message')} className="w-full h-24 border border-gray-300 rounded-sm px-3 py-2 focus:outline-none focus:ring-1 focus:ring-sky-300 resize-none" />
                    <SelectForm options={options} value={role} onChange={setRole} />
                    <div className="flex justify-between gap-3">
                        <button type="submit" className="w-full h-12 bg-green-600 text-white font-bold rounded-sm hover:bg-green-500">{t('general.send_message')}</button>
                        <button type="submit" className="w-full h-12 border border-green-500 text-green-500 font-bold rounded-sm hover:bg-green-500 hover:text-white">{t('general.call')}</button>
                    </div>
                </form>
            </div>
        </>
    );
};