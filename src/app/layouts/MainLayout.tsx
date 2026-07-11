import { Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import Navigation from "../components/Navigation";
import Footer from "../components/Footer";
import { AuthService } from "../services/auth.service";

const MainLayout = () => {
    const [isHeaderFixed, setIsHeaderFixed] = useState(false);

    useEffect(() => {
        const onScroll = () => { 
            setIsHeaderFixed(window.scrollY > 100);
        };
        window.addEventListener('scroll', onScroll);
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    useEffect(() => {
        AuthService.checkAuthUser()
    }, []);

    return (
        <div className="container min-h-screen bg-white dark:bg-slate-950/95 mx-auto">
            <Navigation />
            <main className="min-h-screen overflow-x-hidden">
                <Outlet />
            </main>
            <Footer />
        </div>
    )
}

export default MainLayout;