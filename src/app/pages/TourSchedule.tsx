import { useState } from "react";
import { Calendar, X } from "lucide-react";
import { TourCard } from "../components/cards/TourCard";

// Hardcoded demo database entries mapping to a scheduled_tours table
const initialTours = [
    {
        id: 1,
        property_id: 12,
        property_title: "Seaside Eco-Villa Apartment",
        address: "18 Coral Bay Road, Sihanoukville",
        agent_name: "Sarah Jenkins",
        tour_date: "2026-07-14",
        tour_time: "10:30 AM",
        status: "scheduled",
        note: "Bring proof of ID for building access."
    },
    {
        id: 2,
        property_id: 45,
        property_title: "Downtown Minimalist Studio",
        address: "22F Riverside Tower, Phnom Penh",
        agent_name: "Michael Chang",
        tour_date: "2026-07-14",
        tour_time: "2:00 PM",
        status: "scheduled",
        note: null
    },
    {
        id: 3,
        property_id: 7,
        property_title: "Hillside Family Villa",
        address: "9 Boeung Kak Lane, Phnom Penh",
        agent_name: "Sarah Jenkins",
        tour_date: "2026-07-18",
        tour_time: "9:00 AM",
        status: "scheduled",
        note: null
    },
    {
        id: 4,
        property_id: 31,
        property_title: "Garden View Duplex",
        address: "4 Norodom Blvd, Phnom Penh",
        agent_name: "Lina Sok",
        tour_date: "2026-07-02",
        tour_time: "11:00 AM",
        status: "completed",
        note: null
    },
    {
        id: 5,
        property_id: 19,
        property_title: "Riverside Loft",
        address: "3 Sisowath Quay, Phnom Penh",
        agent_name: "Michael Chang",
        tour_date: "2026-06-27",
        tour_time: "4:30 PM",
        status: "cancelled",
        note: null
    }
];

const formatDateBadge = (dateStr: string) => {
    const d = new Date(dateStr + "T00:00:00");
    return {
        day: d.toLocaleDateString("en-US", { day: "2-digit" }),
        month: d.toLocaleDateString("en-US", { month: "short" }).toUpperCase(),
        weekday: d.toLocaleDateString("en-US", { weekday: "long" })
    };
};

const TourScheduleView = () => {
    const [tours, setTours] = useState(initialTours);
    const [cancelTarget, setCancelTarget] = useState<number | null>(null);

    const handleCancelTour = (id: number) => {
        setTours((prev) => prev.map((t) => (t.id === id ? { ...t, status: "cancelled" } : t)));
        setCancelTarget(null);
    };

    const upcoming = tours
        .filter((t) => t.status === "scheduled")
        .sort((a, b) => new Date(`${a.tour_date} ${a.tour_time}`).getTime() - new Date(`${b.tour_date} ${b.tour_time}`).getTime());
    const past = tours
        .filter((t) => t.status !== "scheduled")
        .sort((a, b) => new Date(b.tour_date).getTime() - new Date(a.tour_date).getTime());

    // Group upcoming tours by date so each date appears once as a divider
    const groupedUpcoming = upcoming.reduce<Record<string, typeof initialTours>>((acc, tour) => {
        acc[tour.tour_date] = acc[tour.tour_date] || [];
        acc[tour.tour_date].push(tour);
        return acc;
    }, {});

    return (
        <div className="p-4 md:p-8 space-y-6 relative">
            <div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                    <Calendar className="w-6 h-6 text-indigo-600" /> Tour Schedule
                </h1>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                    Every walkthrough you've booked, tracked in one place.
                </p>
            </div>

            {/* Quick Overview Panels */}
            <div className="grid grid-cols-3 gap-4 max-w-2xl">
                <div className="p-4 bg-blue-50 dark:bg-blue-950/30 border border-blue-100 dark:border-blue-900/50 rounded-xl">
                    <span className="text-xs font-semibold text-blue-500 block">Upcoming</span>
                    <span className="text-xl font-bold text-blue-700 dark:text-blue-400">{upcoming.length}</span>
                </div>
                <div className="p-4 bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-100 dark:border-emerald-900/50 rounded-xl">
                    <span className="text-xs font-semibold text-emerald-500 block">Completed</span>
                    <span className="text-xl font-bold text-emerald-700 dark:text-emerald-400">
                        {tours.filter((t) => t.status === "completed").length}
                    </span>
                </div>
                <div className="p-4 bg-gray-50 dark:bg-slate-800/50 border border-gray-200 dark:border-slate-700 rounded-xl">
                    <span className="text-xs font-semibold text-gray-500 block">Cancelled</span>
                    <span className="text-xl font-bold text-gray-700 dark:text-gray-400">
                        {tours.filter((t) => t.status === "cancelled").length}
                    </span>
                </div>
            </div>

            {/* Upcoming tours, grouped by date */}
            <div className="max-w-4xl space-y-6">
                <h2 className="text-sm font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wide">Upcoming Tours</h2>

                {Object.keys(groupedUpcoming).length === 0 && (
                    <div className="border border-dashed border-gray-300 dark:border-slate-700 rounded-xl p-8 text-center text-sm text-gray-400 dark:text-gray-500">
                        No tours booked yet. Browse listings to schedule your first walkthrough.
                    </div>
                )}

                {Object.entries(groupedUpcoming).map(([date, dateTours]) => {
                    const badge = formatDateBadge(date);
                    return (
                        <div key={date} className="flex gap-4">
                            <div className="hidden sm:flex flex-col items-center justify-center w-16 h-16 shrink-0 rounded-xl bg-indigo-600 text-white">
                                <span className="text-xs font-semibold uppercase leading-none">{badge.month}</span>
                                <span className="text-xl font-bold leading-tight">{badge.day}</span>
                            </div>
                            <div className="flex-1 space-y-3">
                                <p className="sm:hidden text-xs font-bold text-indigo-600">
                                    {badge.weekday}, {badge.month} {badge.day}
                                </p>
                                <p className="hidden sm:block text-xs font-semibold text-gray-400 dark:text-gray-500">{badge.weekday}</p>
                                {dateTours.map((tour) => (
                                    <TourCard key={tour.id} tour={tour} onCancel={setCancelTarget} />
                                ))}
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Past tours */}
            {past.length > 0 && (
                <div className="max-w-4xl space-y-3 pt-2">
                    <h2 className="text-sm font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wide">Past Tours</h2>
                    {past.map((tour) => (
                        <TourCard key={tour.id} tour={tour} compact />
                    ))}
                </div>
            )}

            {/* Cancel confirmation modal */}
            {cancelTarget !== null && (
                <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4 z-50">
                    <div className="bg-white dark:bg-slate-900 rounded-xl p-6 max-w-sm w-full shadow-lg space-y-4">
                        <div className="flex justify-between items-start">
                            <h3 className="font-bold text-gray-900 dark:text-white">Cancel this tour?</h3>
                            <button onClick={() => setCancelTarget(null)} className="text-gray-400 hover:text-gray-600">
                                <X className="w-4 h-4" />
                            </button>
                        </div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                            The agent will be notified. You can always schedule a new visit later.
                        </p>
                        <div className="flex gap-2 justify-end">
                            <button
                                onClick={() => setCancelTarget(null)}
                                className="px-4 py-2 text-sm font-semibold rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-slate-800"
                            >
                                Keep tour
                            </button>
                            <button
                                onClick={() => handleCancelTour(cancelTarget)}
                                className="px-4 py-2 text-sm font-semibold rounded-lg bg-red-600 hover:bg-red-700 text-white"
                            >
                                Cancel tour
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default TourScheduleView;