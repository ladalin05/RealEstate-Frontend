// components/ui/Loading.tsx

export const Loading = () => {
    return (
        <div className="w-full min-h-screen flex flex-col items-center justify-center gap-6 z-50 fixed top-0 left-0 bg-white">
            
            {/* Logo mark with animated ring */}
            <div className="relative w-20 h-20 flex items-center justify-center">
                {/* Spinning ring */}
                <div className="absolute inset-0 rounded-full border-4 border-[#0d1b2a]/10 border-t-[#0d1b2a] border-r-[#f2a541] animate-spin" />

                {/* House/roof icon in the center, echoing the WIN logo */}
                <svg width="30" height="26" viewBox="0 0 34 30" fill="none" className="relative z-10">
                    <path d="M4 28L15 4L17 9L8 28H4Z" fill="#0d1b2a" />
                    <path d="M15 4L26 28H30L17 0L15 4Z" fill="#0d1b2a" />
                    <path d="M20 10L30 6L26 15L20 10Z" fill="#f2a541" />
                </svg>
            </div>

            {/* Wordmark */}
            <div className="text-center leading-none">
                <p className="text-xl font-extrabold text-[#0d1b2a] tracking-wide">
                    WIN <span className="text-[#f2a541]">REALTY</span>
                </p>
            </div>

            {/* Subtle loading dots */}
            <div className="flex gap-1.5 mt-1">
                <span className="w-1.5 h-1.5 rounded-full bg-[#0d1b2a] animate-bounce [animation-delay:-0.3s]" />
                <span className="w-1.5 h-1.5 rounded-full bg-[#0d1b2a] animate-bounce [animation-delay:-0.15s]" />
                <span className="w-1.5 h-1.5 rounded-full bg-[#0d1b2a] animate-bounce" />
            </div>
        </div>
    )
}