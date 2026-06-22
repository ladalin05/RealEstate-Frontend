import { useRef, useState } from "react";
import { Geo } from "react-bootstrap-icons";
import { ChevronLeft, ChevronRight, Image, Map, Clapperboard} from "lucide-react";


export const PropImags = ({images}: {images: string[]}) => {
    
    const imageRef = useRef<HTMLDivElement>(null);
    const [image, setImage] = useState(images[0] || "");
    const [option, setOption] = useState("image");
    const [currentIndex, setCurrentIndex] = useState(0);
    const handleImage = (index: number) => {
        setImage(images[index]);
        setCurrentIndex(index);

        const container = imageRef.current;
        if (!container) return;

        const width = container.offsetWidth;
        const imageWidth = container.querySelector("img")?.clientWidth ?? 0;
        if (!imageWidth) return;

        const currentIndex = Math.round(container.scrollLeft / imageWidth);
        const visibleCenter = (width / imageWidth) / 2;
        const diff = index - currentIndex;

        if (diff >= visibleCenter || (diff <= visibleCenter && currentIndex > 0)) {
            container.scrollTo({
                left: (currentIndex + (diff >= visibleCenter ? 1 : -1)) * imageWidth,
                behavior: "smooth",
            });
        }
    };
    
    const handleNextImage = () => {
        if (currentIndex < images.length - 1) {
            setCurrentIndex(currentIndex + 1);
            setImage(images[currentIndex]);
        }
    };

    const handlePreImage = () => {
        if (currentIndex > 0) {
            setCurrentIndex(currentIndex - 1);
            setImage(images[currentIndex]);
        }
    };

    const handleOptionChange = (option: string) => {
        setOption(option);
    }

    return (
        <>
            <div className="relative w-full h-160 rounded-sm overflow-hidden">
                <div className="flex items-center gap-2 absolute top-4 right-4 z-10">
                    <button className="w-10 h-10 flex justify-center items-center bg-black/50 hover:bg-black/70 rounded-sm" onClick={() => handleOptionChange("image")}> <Image size={20} className="text-white font-bold" /> </button>
                    <button className="w-10 h-10 flex justify-center items-center bg-black/50 hover:bg-black/70 rounded-sm" onClick={() => handleOptionChange("map")}> <Map size={20} className="text-white font-bold" /> </button>
                    <button className="w-10 h-10 flex justify-center items-center bg-black/50 hover:bg-black/70 rounded-sm" onClick={() => handleOptionChange("geo")}> <Geo size={20} className="text-white font-bold" /> </button>
                    <button className="w-10 h-10 flex justify-center items-center bg-black/50 hover:bg-black/70 rounded-sm" onClick={() => handleOptionChange("clapperboard")}> <Clapperboard size={20} className="text-white font-bold" /> </button>
                </div>
                {option == "image" && (
                    <>
                        <div className="w-full flex items-center justify-between absolute top-1/2 -translate-y-1/2 z-10 px-3">
                            <button className="w-10 h-10 flex justify-center items-center bg-blue-400/50 hover:bg-blue-400/70 rounded-sm" onClick={() => handlePreImage()}> <ChevronLeft size={40} className="text-white font-bold" /> </button>
                            <button className="w-10 h-10 flex justify-center items-center bg-blue-400/50 hover:bg-blue-400/70 rounded-sm" onClick={() => handleNextImage()}> <ChevronRight size={40} className="text-white font-bold" /> </button>
                        </div>
                        <img src={image} alt="Property Image" className="w-full h-full object-cover" />
                    </>
                )}
                {option == "map" && (
                    <div className="absolute inset-0">
                        <iframe
                            className="w-full h-full rounded-sm"
                            src={`https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3582.441419644714!2d-87.6684526849778!3d41.80920397922195!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x880e2cbbd9b9a7b5%3A0x6c8e5c8a9e7b8c9b!2s8100%20S%20Ashland%20Ave%2C%20Chicago%2C%20IL%2060620%2C%20USA!5e0!3m2!1sen!2s!4v1587654321234!5m2!1sen!2s`}
                            title="Google Map"
                            frameBorder="0"
                            allowFullScreen
                        />
                    </div>
                )}
                {option == "geo" && (
                    <div className="absolute inset-0">
                        <iframe
                            className="w-full h-full rounded-sm"
                            src={`https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3582.441419644714!2d-87.6684526849778!3d41.80920397922195!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x880e2cbbd9b9a7b5%3A0x6c8e5c8a9e7b8c9b!2s8100%20S%20Ashland%20Ave%2C%20Chicago%2C%20IL%2060620%2C%20USA!5e0!3m2!1sen!2s!4v1587654321234!5m2!1sen!2s`}
                            title="Google Map"
                            frameBorder="0"
                            allowFullScreen
                        />
                    </div>
                )}
                {option == "clapperboard" && (
                    <div className="relative w-full" style={{ paddingBottom: "56.25%" }}>
                        <iframe
                        className="absolute top-0 left-0 w-full h-full rounded-lg"
                        src={`https://www.youtube.com/embed/-NInBEdSvp8`}
                        title="YouTube video"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        />
                    </div>
                )}
            </div>
            {option == "image" && (
                <div className="flex gap-1 mt-2 w-full h-20 overflow-x-hidden" ref={imageRef}>
                    {images.map((image, index) => (
                        <div key={index} className="w-23 h-full flex-shrink-0 rounded-sm overflow-hidden" onClick={() => handleImage(index)}>
                                <img key={index} src={image} alt={`Thumbnail ${index + 1}`} className="w-full h-full object-cover" />
                        </div>
                    ))}
                </div>
            )}
        </>
    );
}