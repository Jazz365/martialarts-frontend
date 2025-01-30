'use client';

import { useEffect } from "react";

export default function useScrollToTop() {
    useEffect(() => {
        const timeout = setTimeout(() => {
            window.scrollTo(0, 0);
        }, 1000);

        requestAnimationFrame(() => window.scrollTo(0, 0))

        return () => clearTimeout(timeout);
    }, []);
}