import { useState, useEffect } from "react";
import { Calendar, X, Video, MapPin } from "lucide-react";
import { TourCard } from "../components/cards/TourCard";
import { formatDateBadge } from "../utils/helper";
import { InteractionService } from "../services/interaction.service";

const TourScheduleView = () => {
    const [schedulesTour, setSchedulesTour] = useState<any[]>([]);
    const [cancelTarget, setCancelTarget] = useState<number | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        InteractionService.getScheduleTour()
            .then((res) => {
                // Map raw API tour records into the shape the UI needs
                const mapped = (res || []).map((t: any) => ({
                    id: t.id,
                    property_id: t.property?.id,
                    property_title: t.property?.title_en || "Untitled Property",
                    property_code: t.property?.property_code,
                    price: t.property?.price,
                    currency: t.property?.currency,
                    agent_name: t.agent?.name || "Unassigned",
                    agent_image: t.agent?.profile_image || null,
                    requester_name: t.name,
                    requester_email: t.email,
                    requester_phone: t.phone,
                    user: t.user || null,
                    message: t.message,
                    tour_type: t.tour_type, // 'in-person' | 'video-chat'
                    tour_date: t.schedule_date ? t.schedule_date.split("T")[0] : null,
                    tour_time: t.schedule_time,
                    status: t.status, // 'pending' | 'confirmed' | 'completed' | 'cancelled'
                    note: t.message || null,
                }));
                setSchedulesTour(mapped);
            })
            .finally(() => setLoading(false));
    }, []);

    const handleCancelTour = (id: number) => {
        setSchedulesTour((prev) =>
            prev.map((t) => (t.id === id ? { ...t, status: "cancelled" } : t))
        );
        setCancelTarget(null);
        // TODO: persist cancellation via InteractionService.cancelTour(id)
    };

    const upcoming = schedulesTour
        .filter((t) => t.status === "pending" || t.status === "confirmed")
        .sort(
            (a, b) =>
                new Date(`${a.tour_date} ${a.tour_time}`).getTime() -
                new Date(`${b.tour_date} ${b.tour_time}`).getTime()
        );

    const past = schedulesTour
        .filter((t) => t.status === "completed" || t.status === "cancelled")
        .sort((a, b) => new Date(b.tour_date).getTime() - new Date(a.tour_date).getTime());

    // Group upcoming tours by date so each date appears once as a divider
    const groupedUpcoming = upcoming.reduce<Record<string, typeof schedulesTour>>((acc, tour) => {
        if (!tour.tour_date) return acc;
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
            <div className="grid grid-cols-3 gap-4 max-w-2xl mx-auto">
                <div className="p-4 bg-blue-50 dark:bg-blue-950/30 border border-blue-100 dark:border-blue-900/50 rounded-xl">
                    <span className="text-xs font-semibold text-blue-500 block">Upcoming</span>
                    <span className="text-xl font-bold text-blue-700 dark:text-blue-400">{upcoming.length}</span>
                </div>
                <div className="p-4 bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-100 dark:border-emerald-900/50 rounded-xl">
                    <span className="text-xs font-semibold text-emerald-500 block">Completed</span>
                    <span className="text-xl font-bold text-emerald-700 dark:text-emerald-400">
                        {schedulesTour.filter((t) => t.status === "completed").length}
                    </span>
                </div>
                <div className="p-4 bg-gray-50 dark:bg-slate-800/50 border border-gray-200 dark:border-slate-700 rounded-xl">
                    <span className="text-xs font-semibold text-gray-500 block">Cancelled</span>
                    <span className="text-xl font-bold text-gray-700 dark:text-gray-400">
                        {schedulesTour.filter((t) => t.status === "cancelled").length}
                    </span>
                </div>
            </div>

            {loading && (
                <div className="max-w-4xl text-sm text-gray-400 dark:text-gray-500">Loading tours…</div>
            )}

            {/* Upcoming tours, grouped by date */}
            <div className="max-w-4xl space-y-6 mx-auto">
                <h2 className="text-sm font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wide">Upcoming Tours</h2>

                {!loading && Object.keys(groupedUpcoming).length === 0 && (
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
                                    <div key={tour.id} className="space-y-1">
                                        <TourCard tour={tour} onCancel={setCancelTarget} />
                                        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 pl-1 text-xs text-gray-400 dark:text-gray-500">
                                            <span className="inline-flex items-center gap-1">
                                                {tour.tour_type === "video-chat" ? (
                                                    <><Video className="w-3 h-3" /> Video Chat</>
                                                ) : (
                                                    <><MapPin className="w-3 h-3" /> In-Person</>
                                                )}
                                            </span>
                                            <span>Requested by: {tour.requester_name}</span>
                                            {tour.user && (
                                                <span className="text-emerald-600 dark:text-emerald-400">
                                                    (Registered: {tour.user.name})
                                                </span>
                                            )}
                                        </div>
                                    </div>
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