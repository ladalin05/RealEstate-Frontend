import { Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import Navigation from "../components/Navigation";
import { DashNavigation } from "../components/DashNav";
import Footer from "../components/Footer";

const DashboardLayout = () => {
    const [isHeaderFixed, setIsHeaderFixed] = useState(false);

    useEffect(() => {
        const onScroll = () => { 
            setIsHeaderFixed(window.scrollY > 100);
        };
        window.addEventListener('scroll', onScroll);
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    return (
        <div className="container min-h-screen bg-white dark:bg-slate-950/95">
            <Navigation />
            <main className="min-h-screen overflow-x-hidden pt-20">
                <aside className="h-full">
                    <DashNavigation />
                </aside>
                <section className="w-full ps-64 bg-gray-100 ">
                    <Outlet />
                </section>
            </main>
        </div>
    )
}

export default DashboardLayout;