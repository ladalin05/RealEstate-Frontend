import { Facebook, Instagram, Linkedin, Telegram, Twitter, TwitterX, Youtube } from "react-bootstrap-icons";
import { useCallback, useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { PropertyService } from "../services/property.service";
import type { TFunction } from "i18next";

export function ScrollToTop(){
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

export function formatPeriod(text: string = "", t: TFunction) {
  return text
    .replace(/per day/g, t("general.per_day"))
    .replace(/per month/g, t("general.per_month"))
    .replace(/per yeear/g, t("general.per_year"))
    .replace(/days?/g, t("general.day"))
    .replace(/months?/g, t("general.month"))
    .replace(/years?/g, t("general.year"));
}

export const toggleFavourite = (id: number) => {
    try{
        const user = JSON.parse(localStorage.getItem("user") || "null");
        if(!user){
          return window.location.href = "/login";
        }
        const response = PropertyService.toggleFavorite({ propertyId: id, userId: parseInt(user.id) });
        return response;
    }catch(error){
        console.error('Error toggling favorite:', error);
        return false;
    }
}


export function useAutoScrollCarousel( itemsLength: number, AUTO_SCROLL_INTERVAL: number, GAP = 16, ) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);

  const [active, setActive] = useState(0);
  const [number, setNumber] = useState(0);

  const activeRef = useRef(0);
  const numberRef = useRef(0);
  const autoScrollRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const isPausedRef = useRef(false);

  useEffect(() => {
    activeRef.current = active;
  }, [active]);

  useEffect(() => {
    numberRef.current = number;
  }, [number]);

  const calculateNumber = useCallback(() => {
    const scrollContainer = scrollRef.current;
    const innerContainer = innerRef.current;

    if (!scrollContainer || !innerContainer || !innerContainer.children[0]) return;

    const childWidth = (innerContainer.children[0] as HTMLElement).offsetWidth;
    const visibleCount = scrollContainer.offsetWidth / (childWidth + GAP);

    setNumber(Math.round(itemsLength - visibleCount) + 1);
  }, [itemsLength]);

  const scrollToIndex = useCallback((index: number) => {
    const scrollContainer = scrollRef.current;
    const innerContainer = innerRef.current;

    if (!scrollContainer || !innerContainer || !innerContainer.children[0]) return;

    const childWidth = (innerContainer.children[0] as HTMLElement).offsetWidth;

    setActive(index);
    activeRef.current = index;

    scrollContainer.scrollTo({
      left: (childWidth + GAP) * index,
      behavior: "smooth",
    });
  }, []);

  const stopAutoScroll = useCallback(() => {
    if (autoScrollRef.current) {
      clearInterval(autoScrollRef.current);
      autoScrollRef.current = null;
    }
  }, []);

  const startAutoScroll = useCallback(() => {
    stopAutoScroll();

    autoScrollRef.current = setInterval(() => {
      if (isPausedRef.current) return;

      const next =
        activeRef.current + 1 >= numberRef.current ? 0 : activeRef.current + 1;

      scrollToIndex(next);
    }, AUTO_SCROLL_INTERVAL);
  }, [AUTO_SCROLL_INTERVAL, scrollToIndex, stopAutoScroll]);

  const handleScrollEvent = useCallback(() => {
    const scrollContainer = scrollRef.current;
    const innerContainer = innerRef.current;

    if (!scrollContainer || !innerContainer || !innerContainer.children[0]) return;

    const childWidth = (innerContainer.children[0] as HTMLElement).offsetWidth;
    const index = Math.round(scrollContainer.scrollLeft / (childWidth + GAP));

    setActive(index);
  }, []);

  return {
    scrollRef,
    innerRef,
    active,
    number,
    isPausedRef,
    calculateNumber,
    scrollToIndex,
    startAutoScroll,
    stopAutoScroll,
    handleScrollEvent,
  };
}

export function convertFromISO({isoString}: {isoString: string}): string {
  const date = new Date(isoString);

  if (isNaN(date.getTime())) {
    throw new Error("Invalid ISO date string");
  }

  return date.toLocaleString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit", 
    hour12: true,
  });
}

export const formatTimeOnly = (timeStr: string) => {
  if (!timeStr) return '';
  const [hour, minute] = timeStr.split(':');
  const date = new Date();
  date.setHours(+hour, +minute);
  return date.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  });
};

export function filterProperty({filter, setPropertiesData, initialPropertiesData}: {filter: Record<string, string>, setPropertiesData: React.Dispatch<React.SetStateAction<any[]>>, initialPropertiesData: any[]}){
    let filtered = [...initialPropertiesData];

        Object.entries(filter).forEach(([key, value]) => {
            if (!value || value === "All") return;

            filtered = filtered.filter((prop) => {
                switch (key) {
                    case "search_address":
                        return prop.address.toLowerCase().includes(value.toLowerCase());
                    case "search_text":
                        return prop.name.toLowerCase().includes(value.toLowerCase());
                    case "area":
                        return prop.area_id === Number(value);
                    case "category":
                        return prop.category_id === Number(value);
                    case "status":
                        return prop.status?.toLowerCase() === value.toLowerCase();
                    case "rooms":
                        return prop.bedrooms === Number(value);
                    case "bathrooms":
                        return prop.bathrooms === Number(value);
                    case "garage":
                        return prop.garages === Number(value);
                    case "features":
                        return value.toLowerCase() === "featured" 
                        ? prop.featured 
                        : prop.amenities?.some(
                            (item: string) => item.toLowerCase() === value.toLowerCase()
                        );
                    case "min_area":
                        const size = Number( prop.size.replace(/[^\d]/g, ""));
                        return size >= Number(value);
                    case "max_area":
                        const size2 = Number( prop.size.replace(/[^\d]/g, ""));
                        return size2 <= Number(value);
                    case "minPrice":
                        const price = Number(prop.price.replace(/[$,]/g, ""));
                        return price >= Number(value);
                    case "maxPrice":
                        const price2 = Number(prop.price.replace(/[$,]/g, ""));
                        return price2 <= Number(value);
                    default:
                        return true;
                }
            });
        });

        setPropertiesData(filtered);
}

export function getIcon(key: string){
    switch (key) {
        case "facebook":
            return Facebook;
        case "twitter":
            return Twitter;
        case "linkedin":
            return Linkedin;
        case "instagram":
            return Instagram;
        case "youtube":
            return Youtube;
        default:
            return null;
    }
}

const socialIcons: Record<string, React.ElementType> = {
    facebook:  Facebook,
    telegram:  Telegram,
    twitter:   TwitterX,
    instagram: Instagram,
    linkedin:  Linkedin,
    youtube:   Youtube,
};

export function SocialIcon ({ platform, size = 12, className = "text-gray-500" }: { platform: string; size?: number; className?: string; }) {
    const Icon = socialIcons[platform.toLowerCase()];
    if (!Icon) return null;
    return <Icon size={size} className={className} />;
};

export function toHMS(time: string): string {
    if (!time) return "";
    
    const ampmMatch = time.match(/(\d{1,2}):(\d{2})\s?(am|pm)/i);
    if (ampmMatch) {
        let [, h, m, period] = ampmMatch;
        let hour = parseInt(h, 10);
        if (period.toLowerCase() === "pm" && hour !== 12) hour += 12;
        if (period.toLowerCase() === "am" && hour === 12) hour = 0;
        return `${String(hour).padStart(2, "0")}:${m}:00`;
    }
    
    if (/^\d{2}:\d{2}$/.test(time)) return `${time}:00`;
    return time;
}

export function buildPayload(form: any) {
    return {
        property_id: Number(form.property_id),
        agent_id: form.agent_id ? Number(form.agent_id) : null,
        name: form.name.trim(),
        email: form.email.trim(),
        phone: form.phone?.trim() || null,
        tour_type: form.tour_type,
        schedule_date: form.schedule_date, // must be "YYYY-MM-DD" already
        schedule_time: toHMS(form.schedule_time),
        message: form.message?.trim() || null,
    };
}

export function refreshToken() {
    const token = localStorage.getItem("token");
    if(token) {
        
    }
}

export const getPasswordStrength = (password: string): "weak" | "fair" | "good" | "strong" | null => {
  if (!password) return null;
  let score = 0;
  if (password.length >= 8) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;
  if (score <= 1) return "weak";
  if (score === 2) return "fair";
  if (score === 3) return "good";
  return "strong";
};


export const formatDateBadge = (dateStr: string) => {
    const d = new Date(dateStr + "T00:00:00");
    return {
        day: d.toLocaleDateString("en-US", { day: "2-digit" }),
        month: d.toLocaleDateString("en-US", { month: "short" }).toUpperCase(),
        weekday: d.toLocaleDateString("en-US", { weekday: "long" })
    };
};