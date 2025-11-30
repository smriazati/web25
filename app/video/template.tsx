"use client";

import { animateValues, animationDuration, animationEase, initialValues } from "@/lib/constants";
import { motion, AnimatePresence } from "framer-motion";

export default function Template({ children }: { children: React.ReactNode }) {


    return (
        <AnimatePresence mode="wait">
            <motion.div
                initial={initialValues}
                animate={animateValues}
                transition={{ duration: animationDuration, ease: animationEase }}
            >
                {children}
            </motion.div>
        </AnimatePresence>
    );
}
