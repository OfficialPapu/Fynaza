"use client";
import { useState, useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { ScaleLoader } from "react-spinners";

const Preloader = ({ apiCallInProgress }) => {
    const [loading, setLoading] = useState(false);
    const pathname = usePathname();
    const searchParams = useSearchParams();

    useEffect(() => {
        setLoading(true);

        const timer = setTimeout(() => {
            setLoading(false);
        }, 50000); // Simulate loading time

        return () => clearTimeout(timer);
    }, [pathname, searchParams, apiCallInProgress]);

    return (
        loading && (
            <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-white z-50">
                <ScaleLoader />
            </div>
        )
    );
};

export default Preloader;
