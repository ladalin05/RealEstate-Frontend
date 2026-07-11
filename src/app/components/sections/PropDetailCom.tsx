import { useRef, useState } from "react";
import { Geo, InfoCircle } from "react-bootstrap-icons";
import { ChevronLeft, ChevronRight, Image, Map, Clapperboard} from "lucide-react";
import { useTranslation } from 'react-i18next';
import { CameraVideoOff } from "react-bootstrap-icons";


export const PropImags = ({images, latitude, longitude}: {images: string[], latitude: string, longitude: string}) => {
    const { t } = useTranslation();
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
            <div className="relative w-full lg:h-160 md:h-100 h-80 rounded-sm overflow-hidden">
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
                        {image ? (
                            <img src={image} alt="Property Image" 
                                className="w-full h-full object-cover" 
                                onError={(e) => {
                                    e.currentTarget.onerror = null;
                                    e.currentTarget.src = 'http://localhost:9000/images/properties/no-image-found.jpg';
                                }}/>
                        ) : (
                            <div className="w-full h-full bg-gray-200 dark:bg-slate-700 flex items-center justify-center">
                                <span className="text-gray-400 text-sm">{t('general.no_image')}</span>
                            </div>
                        )}
                    </>
                )}
                {option == "map" && (
                    <div className="absolute inset-0">
                        <iframe
                            className="w-full h-full rounded-sm"
                            src={`https://maps.google.com/maps?q=${latitude},${longitude}&z=15&output=embed`}
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
                                <img key={index} 
                                    src={image} 
                                    alt={`Thumbnail ${index + 1}`} 
                                    className="w-full h-full object-cover"
                                    onError={(e) => {
                                        e.currentTarget.onerror = null;
                                        e.currentTarget.src = 'http://localhost:9000/images/properties/no-image-found.jpg';
                                    }} />
                        </div>
                    ))}
                </div>
            )}
        </>
    );
}

interface PlaceholderProps {
  icon: React.ReactNode;
  titleKey: string;
  titleFallback: string;
  subtitleKey: string;
  subtitleFallback: string;
  size?: 'sm' | 'lg';
}

const Placeholder = ({ icon, titleKey, titleFallback, subtitleKey, subtitleFallback, size = 'lg' }: PlaceholderProps) => {
  const { t } = useTranslation();
  const isLg = size === 'lg';

  return (
    <div className={
      `w-full rounded-sm border border-dashed border-gray-300 bg-gray-50 dark:bg-gray-800/40 dark:border-gray-700 flex flex-col items-center justify-center gap-3 text-center
      ${isLg ? 'h-full min-h-[220px] p-8' : 'p-6'} `}>
      <div className={`
        rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center
        ${isLg ? 'w-14 h-14' : 'w-12 h-12'} `}>
        {icon}
      </div>
      <p className="text-base font-semibold text-gray-700 dark:text-gray-200">
        {t(titleKey) || titleFallback}
      </p>
      <p className="text-sm text-gray-500 dark:text-gray-400 ">
        {t(subtitleKey) || subtitleFallback}
      </p>
    </div>
  );
};

export const NoVideoPlaceholder = () => (
  <Placeholder
    icon={<CameraVideoOff size={26} className="text-gray-500 dark:text-gray-400" />}
    titleKey="general.no_video_available"
    titleFallback="No video available"
    subtitleKey="general.no_video_subtitle"
    subtitleFallback="This listing doesn't have a video tour yet."
  />
);

export const NoFeaturesPlaceholder = () => (
  <Placeholder
    icon={<InfoCircle size={22} className="text-gray-500 dark:text-gray-400" />}
    titleKey="general.no_features_title"
    titleFallback="No additional features"
    subtitleKey="general.no_features_subtitle"
    subtitleFallback="The agent hasn't listed any extra features for this property yet."
    size="sm"
  />
);

export const NoAmenitiesPlaceholder = () => (
  <Placeholder
    icon={<InfoCircle size={22} className="text-gray-500 dark:text-gray-400" />}
    titleKey="general.no_amenities_title"
    titleFallback="No amenities"
    subtitleKey="general.no_amenities_subtitle"
    subtitleFallback="The agent hasn't listed any amenities for this property yet."
    size="sm"
  />
);