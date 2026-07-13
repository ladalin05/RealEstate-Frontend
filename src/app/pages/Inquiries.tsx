import { useEffect, useState } from "react";
import { MessageSquare, CheckCircle, Clock, Archive, UserRound } from "lucide-react";
import { InteractionService } from "../services/interaction.service";

const InquiriesView = () => {
    const [inquiries, setInquiries] = useState([]);
    const [replyText, setReplyText] = useState({});

    useEffect(() => {
        InteractionService.getRequestInfo().then((res) => {
            setInquiries(res);
        });
    }, []);

    const handleSendFollowUp = (id) => {
        if (!replyText[id]?.trim()) return;

        setInquiries(prev => prev.map(item => {
            if (item.id === id) {
                const newMessage = {
                    id: Date.now(),
                    message: replyText[id],
                    sender: "user",
                    is_read: false,
                    created_at: new Date().toISOString(),
                };
                return {
                    ...item,
                    messages: [...(item.messages || []), newMessage],
                    status: "pending",
                };
            }
            return item;
        }));
        setReplyText(prev => ({ ...prev, [id]: "" }));
    };

    const handleCloseThread = (id) => {
        setInquiries(prev => prev.map(item =>
            item.id === id ? { ...item, status: "closed" } : item
        ));
    };

    const statusBadgeClass = (status) => {
        switch (status) {
            case "replied":
                return "bg-purple-100 text-purple-700 dark:bg-purple-950/60 dark:text-purple-400";
            case "closed":
                return "bg-gray-100 text-gray-600 dark:bg-gray-800";
            default:
                return "bg-blue-100 text-blue-700 dark:bg-blue-950/60 dark:text-blue-400";
        }
    };
console.log(inquiries);
    return (
        <div className="p-4 md:p-8 space-y-6">
            <div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                    <MessageSquare className="w-6 h-6 text-indigo-600" /> Real Estate Conversations
                </h1>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                    Direct communication threads with listing agents from your property inquiries.
                </p>
            </div>

            {/* Filter Quick Overview Panels */}
            <div className="grid grid-cols-3 gap-4 max-w-2xl mx-auto">
                <div className="p-4 bg-blue-50 dark:bg-blue-950/30 border border-blue-100 dark:border-blue-900/50 rounded-xl">
                    <span className="text-xs font-semibold text-blue-500 block">Pending Admin Review</span>
                    <span className="text-xl font-bold text-blue-700 dark:text-blue-400">
                        {inquiries.filter(i => i.status === "pending").length}
                    </span>
                </div>
                <div className="p-4 bg-purple-50 dark:bg-purple-950/30 border border-purple-100 dark:border-purple-900/50 rounded-xl">
                    <span className="text-xs font-semibold text-purple-500 block">Agent Responses</span>
                    <span className="text-xl font-bold text-purple-700 dark:text-purple-400">
                        {inquiries.filter(i => i.status === "active").length}
                    </span>
                </div>
                <div className="p-4 bg-gray-50 dark:bg-slate-800/50 border border-gray-200 dark:border-slate-700 rounded-xl">
                    <span className="text-xs font-semibold text-gray-500 block">Closed Archive</span>
                    <span className="text-xl font-bold text-gray-700 dark:text-gray-400">
                        {inquiries.filter(i => i.status === "closed").length}
                    </span>
                </div>
            </div>

            {/* Inquiries Thread Stack */}
            <div className="space-y-4 max-w-4xl mx-auto">
                {inquiries.map((inquiry) => (
                    <div
                        key={inquiry.id}
                        className={`bg-white dark:bg-slate-900 border rounded-xl p-5 shadow-sm space-y-4 transition-all ${
                            inquiry.status === "closed" ? "opacity-50 border-gray-200 dark:border-slate-800" : "border-gray-200 dark:border-slate-800"
                        }`}
                    >
                        <div className="flex justify-between items-start gap-4 border-b border-gray-100 dark:border-slate-800 pb-3">
                            <div className="flex items-start gap-3">
                                {inquiry.agent?.profile_image && (
                                    <img
                                        src={inquiry.agent.profile_image}
                                        alt={inquiry.agent.name}
                                        className="w-9 h-9 rounded-full object-cover mt-0.5"
                                    />
                                )}
                                <div>
                                    <h3 className="font-bold text-gray-900 dark:text-white text-base">
                                        {inquiry.property?.title_en || "Untitled Property"}
                                    </h3>
                                    <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">
                                        Contact Agent: {inquiry.agent?.name || "Unassigned"} • Sent {inquiry.created_at}
                                    </p>
                                    {inquiry.property?.price && (
                                        <p className="text-xs text-gray-400 dark:text-gray-500">
                                            {inquiry.property.currency} {Number(inquiry.property.price).toLocaleString()}
                                        </p>
                                    )}
                                </div>
                            </div>

                            <div className="flex items-center space-x-3">
                                <span className={`text-xs px-2.5 py-1 font-semibold rounded-full uppercase flex items-center gap-1 ${statusBadgeClass(inquiry.status)}`}>
                                    {inquiry.status === "replied" && <CheckCircle className="w-3 h-3" />}
                                    {inquiry.status === "pending" && <Clock className="w-3 h-3" />}
                                    {inquiry.status}
                                </span>

                                {inquiry.status !== "closed" && (
                                    <button
                                        onClick={() => handleCloseThread(inquiry.id)}
                                        className="text-gray-400 hover:text-red-500 p-1 rounded transition-colors"
                                        title="Mark Inquiry Resolved"
                                    >
                                        <Archive className="w-4 h-4" />
                                    </button>
                                )}
                            </div>
                        </div>

                        {/* Requester Info */}
                        <div className="text-xs text-gray-500 dark:text-gray-400 flex flex-wrap items-center gap-x-4 gap-y-1">
                            <span><strong>From:</strong> {inquiry.name}</span>
                            <span><strong>Email:</strong> {inquiry.email}</span>
                            <span><strong>Phone:</strong> {inquiry.phone}</span>
                            {inquiry.role && <span><strong>Role:</strong> {inquiry.role}</span>}
                            {inquiry.user && (
                                <span className="inline-flex items-center gap-1 text-emerald-600 dark:text-emerald-400 font-semibold">
                                    <UserRound className="w-3 h-3" /> Registered: {inquiry.user.name}
                                </span>
                            )}
                        </div>

                        {/* Text Thread Log */}
                        <div className="space-y-3">
                            {(inquiry.messages || []).map((msg) => (
                                <div
                                    key={msg.id}
                                    className={
                                        msg.sender === "user"
                                            ? "bg-gray-50 dark:bg-slate-950 rounded-xl p-4 text-sm text-gray-700 dark:text-gray-300 whitespace-pre-line"
                                            : "ml-4 border-l-2 border-indigo-500 pl-4 py-1 text-sm text-gray-800 dark:text-slate-300"
                                    }
                                >
                                    <span className={`text-xs font-bold block mb-0.5 ${msg.sender === "user" ? "text-gray-400" : "text-indigo-500"}`}>
                                        {msg.sender === "user" ? "Your Request Log:" : `Response from ${inquiry.agent?.name || "Agent"}:`}
                                    </span>
                                    "{msg.message}"
                                </div>
                            ))}
                        </div>

                        {/* Dynamic Reply Action Bar */}
                        {inquiry.status !== "closed" && (
                            <div className="pt-2 flex gap-2">
                                <input
                                    type="text"
                                    placeholder="Type a follow up message..."
                                    value={replyText[inquiry.id] || ""}
                                    onChange={(e) => setReplyText(prev => ({ ...prev, [inquiry.id]: e.target.value }))}
                                    className="flex-1 text-sm bg-gray-50 dark:bg-slate-950 border border-gray-200 dark:border-slate-800 rounded-lg px-3 py-2 text-gray-900 dark:text-white focus:outline-none focus:border-indigo-500"
                                />
                                <button
                                    onClick={() => handleSendFollowUp(inquiry.id)}
                                    className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-sm font-semibold transition-colors"
                                >
                                    Reply
                                </button>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default InquiriesView;