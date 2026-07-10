import { Clock, MapPin, User, CalendarCheck, CalendarX, CalendarClock } from "lucide-react";

export type TourStatus = "scheduled" | "completed" | "cancelled";

export interface Tour {
    id: number;
    property_id: number;
    property_title: string;
    address: string;
    agent_name: string;
    tour_date: string; // "YYYY-MM-DD"
    tour_time: string; // e.g. "10:30 AM"
    status: TourStatus;
    note?: string | null;
}

const STATUS_STYLES: Record<TourStatus, string> = {
    scheduled: "bg-blue-100 text-blue-700 dark:bg-blue-950/60 dark:text-blue-400",
    completed: "bg-emerald-100 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-400",
    cancelled: "bg-gray-100 text-gray-500 dark:bg-gray-800 dark:text-gray-400"
};

const STATUS_ICON: Record<TourStatus, typeof CalendarClock> = {
    scheduled: CalendarClock,
    completed: CalendarCheck,
    cancelled: CalendarX
};

interface TourCardProps {
    tour: any;
    compact?: boolean;
    onReschedule?: (id: number) => void;
    onCancel?: (id: number) => void;
}

export const TourCard = ({ tour, compact = false, onReschedule, onCancel }: TourCardProps) => {
    const StatusIcon = STATUS_ICON[tour.status];

    return (
        <div
            className={`bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded-xl p-4 shadow-sm flex flex-col sm:flex-row sm:items-center gap-4 ${
                compact ? "opacity-70" : ""
            }`}
        >
            <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="font-bold text-gray-900 dark:text-white text-base truncate">{tour.property_title}</h3>
                    <span
                        className={`text-xs px-2.5 py-1 font-semibold rounded-full uppercase flex items-center gap-1 shrink-0 ${STATUS_STYLES[tour.status]}`}
                    >
                        <StatusIcon className="w-3 h-3" />
                        {tour.status}
                    </span>
                </div>

                <p className="text-xs text-gray-400 dark:text-gray-500 mt-1 flex items-center gap-1">
                    <MapPin className="w-3 h-3 shrink-0" /> {tour.address}
                </p>

                <div className="flex items-center gap-4 mt-2 text-sm text-gray-600 dark:text-gray-300">
                    <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-indigo-500" /> {tour.tour_time}
                    </span>
                    <span className="flex items-center gap-1">
                        <User className="w-3.5 h-3.5 text-indigo-500" /> {tour.agent_name}
                    </span>
                </div>

                {tour.note && (
                    <p className="text-xs text-amber-600 dark:text-amber-400 mt-2 bg-amber-50 dark:bg-amber-950/30 rounded-lg px-3 py-1.5 inline-block">
                        {tour.note}
                    </p>
                )}
            </div>

            {tour.status === "scheduled" && (
                <div className="flex gap-2 shrink-0 sm:flex-col md:flex-row">
                    <button
                        onClick={() => onReschedule?.(tour.id)}
                        className="px-3 py-2 text-sm font-semibold rounded-lg border border-gray-200 dark:border-slate-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-slate-800 transition-colors"
                    >
                        Reschedule
                    </button>
                    <button
                        onClick={() => onCancel?.(tour.id)}
                        className="px-3 py-2 text-sm font-semibold rounded-lg border border-red-200 dark:border-red-900/50 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors"
                    >
                        Cancel
                    </button>
                </div>
            )}
        </div>
    );
};
