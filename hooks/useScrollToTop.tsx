'use client';

import { useEffect } from "react";

export default function useScrollToTop() {
    useEffect(() => {
        const timeout = setTimeout(() => {
            window.scrollTo(0, 0);
        }, 550);

        return () => clearTimeout(timeout);
    }, []);
}