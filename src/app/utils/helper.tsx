import { Facebook, Instagram, Linkedin, Twitter, Youtube } from "react-bootstrap-icons";
import { useCallback, useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";

export function ScrollToTop(){
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
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
    second: "2-digit",
    hour12: true,
  });
}


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