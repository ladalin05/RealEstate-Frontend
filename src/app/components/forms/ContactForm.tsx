import { useState } from "react";
import { User, Phone, Mail, MessageSquare } from "lucide-react";

export default function ContactForm() {
  const [gdpr, setGdpr] = useState(false);

  return (
    <div className="w-full bg-blue-50 rounded-2xl p-6 mx-auto">
      {/* Name & Phone */}
      <div className="grid grid-cols-2 gap-5 mb-5">
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-2">Name</label>
          <div className="flex items-center bg-white rounded-full px-4 py-2.5 gap-3 border border-blue-100">
            <User className="w-4 h-4 text-gray-300" />
            <input
              type="text"
              placeholder="Your Name"
              className="flex-1 outline-none text-sm text-gray-600 bg-transparent placeholder-gray-300"
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-2">Phone</label>
          <div className="flex items-center bg-white rounded-full px-4 py-2.5 gap-3 border border-blue-100">
            <Phone className="w-4 h-4 text-gray-300" />
            <input
              type="tel"
              placeholder="Your Phone"
              className="flex-1 outline-none text-sm text-gray-600 bg-transparent placeholder-gray-300"
            />
          </div>
        </div>
      </div>

      {/* Email */}
      <div className="mb-5">
        <label className="block text-sm font-medium text-gray-600 mb-2">Email</label>
        <div className="flex items-center bg-white rounded-full px-4 py-2.5 gap-3 border border-blue-100">
          <Mail className="w-4 h-4 text-gray-300" />
          <input
            type="email"
            placeholder="Your Email"
            className="flex-1 outline-none text-sm text-gray-600 bg-transparent placeholder-gray-300"
          />
        </div>
      </div>

      {/* Message */}
      <div className="mb-5">
        <label className="block text-sm font-medium text-gray-600 mb-2">Message</label>
        <div className="flex items-start bg-white rounded-2xl px-4 py-3 gap-3 border border-blue-100">
          <MessageSquare className="w-4 h-4 text-sky-400 mt-0.5 shrink-0" />
          <textarea
            placeholder="Your Message"
            rows={5}
            className="flex-1 outline-none text-sm text-gray-600 bg-transparent resize-none placeholder-gray-300"
          />
        </div>
      </div>

      {/* GDPR */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-600 mb-2">
          GDPR Agreement <span className="text-red-500">*</span>
        </label>
        <div className="flex items-center bg-white rounded-full px-4 py-3 gap-3 border border-blue-100">
          <input
            type="checkbox"
            id="gdpr"
            checked={gdpr}
            onChange={(e) => setGdpr(e.target.checked)}
            className="w-4 h-4 rounded accent-sky-400 cursor-pointer"
          />
          <label htmlFor="gdpr" className="text-xs text-gray-600 cursor-pointer">
            I consent to having this website store my submitted information so they can respond to my inquiry.
          </label>
        </div>
      </div>

      {/* Submit Button */}
      <button className="bg-sky-400 hover:bg-sky-500 active:scale-95 transition-all text-white font-medium text-sm rounded-full px-7 py-3">
        Send Message
      </button>
    </div>
  );
}