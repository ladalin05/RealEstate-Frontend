import { useState } from "react";
import { MessageSquare, CheckCircle, Clock, Archive } from "lucide-react";

const InquiriesView = () => {
    // Hardcoded demo database entries mapping directly to request_infos parameters
    const [inquiries, setInquiries] = useState([
        {
            id: 1,
            property_id: 12,
            property_title: "Seaside Eco-Villa Apartment",
            agent_name: "Sarah Jenkins",
            message: "Hello! I am highly interested in scheduling a walkthrough. Is the price flexible?",
            status: "replied", // 'new','read','replied','closed'
            reply_message: "Hi there! The price has a slight negotiation window for long-term leases. Let me know when you are free!",
            created_at: "2026-07-06"
        },
        {
            id: 2,
            property_id: 45,
            property_title: "Downtown Minimalist Studio",
            agent_name: "Michael Chang",
            message: "Does the rent cost cover underground parking garage passes?",
            status: "new",
            reply_message: null,
            created_at: "2026-07-08"
        }
    ]);

    const [replyText, setReplyText] = useState({});

    const handleSendFollowUp = (id) => {
        if (!replyText[id]?.trim()) return;
        
        setInquiries(prev => prev.map(item => {
            if (item.id === id) {
                return {
                    ...item,
                    message: `${item.message}\n\n↳ Me: ${replyText[id]}`,
                    status: 'new', // Flag back to new so agent sees it
                    reply_message: null
                };
            }
            return item;
        }));
        setReplyText(prev => ({ ...prev, [id]: "" }));
    };

    const handleCloseThread = (id) => {
        setInquiries(prev => prev.map(item => 
            item.id === id ? { ...item, status: 'closed' } : item
        ));
    };

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
            <div className="grid grid-cols-3 gap-4 max-w-2xl">
                <div className="p-4 bg-blue-50 dark:bg-blue-950/30 border border-blue-100 dark:border-blue-900/50 rounded-xl">
                    <span className="text-xs font-semibold text-blue-500 block">Pending Admin Review</span>
                    <span className="text-xl font-bold text-blue-700 dark:text-blue-400">
                        {inquiries.filter(i => i.status === 'new' || i.status === 'read').length}
                    </span>
                </div>
                <div className="p-4 bg-purple-50 dark:bg-purple-950/30 border border-purple-100 dark:border-purple-900/50 rounded-xl">
                    <span className="text-xs font-semibold text-purple-500 block">Agent Responses</span>
                    <span className="text-xl font-bold text-purple-700 dark:text-purple-400">
                        {inquiries.filter(i => i.status === 'replied').length}
                    </span>
                </div>
                <div className="p-4 bg-gray-50 dark:bg-slate-800/50 border border-gray-200 dark:border-slate-700 rounded-xl">
                    <span className="text-xs font-semibold text-gray-500 block">Closed Archive</span>
                    <span className="text-xl font-bold text-gray-700 dark:text-gray-400">
                        {inquiries.filter(i => i.status === 'closed').length}
                    </span>
                </div>
            </div>

            {/* Inquiries Thread Stack */}
            <div className="space-y-4 max-w-4xl">
                {inquiries.map((inquiry) => (
                    <div 
                        key={inquiry.id} 
                        className={`bg-white dark:bg-slate-900 border rounded-xl p-5 shadow-sm space-y-4 transition-all ${
                            inquiry.status === 'closed' ? 'opacity-50 border-gray-200 dark:border-slate-800' : 'border-gray-200 dark:border-slate-800'
                        }`}
                    >
                        <div className="flex justify-between items-start gap-4 border-b border-gray-100 dark:border-slate-800 pb-3">
                            <div>
                                <h3 className="font-bold text-gray-900 dark:text-white text-base">{inquiry.property_title}</h3>
                                <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">Contact Agent: {inquiry.agent_name} • Sent {inquiry.created_at}</p>
                            </div>
                            
                            <div className="flex items-center space-x-3">
                                <span className={`text-xs px-2.5 py-1 font-semibold rounded-full uppercase flex items-center gap-1 ${
                                    inquiry.status === 'replied' ? 'bg-purple-100 text-purple-700 dark:bg-purple-950/60 dark:text-purple-400' :
                                    inquiry.status === 'closed' ? 'bg-gray-100 text-gray-600 dark:bg-gray-800' :
                                    'bg-blue-100 text-blue-700 dark:bg-blue-950/60 dark:text-blue-400'
                                }`}>
                                    {inquiry.status === 'replied' && <CheckCircle className="w-3 h-3" />}
                                    {inquiry.status === 'new' && <Clock className="w-3 h-3" />}
                                    {inquiry.status}
                                </span>

                                {inquiry.status !== 'closed' && (
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

                        {/* Text Thread Log */}
                        <div className="space-y-3">
                            <div className="bg-gray-50 dark:bg-slate-950 rounded-xl p-4 text-sm text-gray-700 dark:text-gray-300 whitespace-pre-line">
                                <span className="text-xs font-bold text-gray-400 block mb-1">Your Request Log:</span>
                                "{inquiry.message}"
                            </div>

                            {inquiry.reply_message && (
                                <div className="ml-4 border-l-2 border-indigo-500 pl-4 py-1 text-sm text-gray-800 dark:text-slate-300">
                                    <span className="text-xs font-bold text-indigo-500 block mb-0.5">Response from {inquiry.agent_name}:</span>
                                    "{inquiry.reply_message}"
                                </div>
                            )}
                        </div>

                        {/* Dynamic Reply Action Bar */}
                        {inquiry.status !== 'closed' && (
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