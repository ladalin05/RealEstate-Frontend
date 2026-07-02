import { useRef, useState } from "react";
import { ChevronLeft, ChevronRight, User} from "lucide-react";
import { TimeSelect } from "../ui/TimeSelect";
import { SelectForm } from "../ui/SelectForm";
import { useTranslation } from "react-i18next";
import { DatePicker } from "../ui/DatePicker";


export const ScheduleTour = ({ agent }: { agent: any }) => {
    const { t } = useTranslation();
    const dateRef = useRef<HTMLDivElement>(null);
    const [time, setTime] = useState<string | null>(null);
    const [tourType, setTourType] = useState<string | null>("in-person");
    const [pickupDate, setPickupDate] = useState<string>(""); 
    
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
            {/* <div className="w-full flex items-center justify-center gap-2 px-9 relative" ref={dateRef}>
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
            </div> */}
            <div className="w-full p-9 ">
                <h2 className="text-md font-bold text-gray-800 dark:text-gray-200 mb-2">{t('schedule_tour.tour_type')}</h2>
                <form className="flex flex-col gap-4">
                    <div className="flex justify-between gap-3 h-12 mt-6"> 
                        <div onClick={() => setTourType("in-person")} className={`w-1/2 text-sm font-bold rounded-sm flex items-center justify-center cursor-pointer ${tourType === "in-person" ? "border border-sky-400 text-sky-400" : "text-gray-800 border border-gray-300"} hover:text-sky-400`}>{t('schedule_tour.in_person')}</div> 
                        <div onClick={() => setTourType("video-chat")} className={`w-1/2 text-sm font-bold rounded-sm flex items-center justify-center cursor-pointer ${tourType === "video-chat" ? "border border-sky-400 text-sky-400" : "text-gray-800 border border-gray-300"} hover:text-sky-400`}>{t('schedule_tour.video_chart')}</div>
                    </div>
                    
                     <DatePicker value={pickupDate} onChange={(value) => setPickupDate(value)} min={new Date().toISOString().split('T')[0]} placeholder={t('schedule_tour.select_date')}
                        className={`w-full px-4 py-4 rounded-xl bg-gray-50 border border-border focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 transition-all outline-none appearance-none cursor-pointer`} />
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