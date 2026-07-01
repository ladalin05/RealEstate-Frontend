

export const Loading = () => {
    return (
        <div className="w-full min-h-screen flex flex-col items-center justify-center z-50 fixed top-0 bg-white">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-sky-500"></div>
        </div>
    )
}