"use client";

import { useState, useRef, useLayoutEffect } from "react";
import styles from "@/styles/DarkModeToggle.module.css";

export default function DarkModeToggle() {
  // React state only for user interactions
  const [isDark, setIsDark] = useState<boolean>(false);

  // Ref to the slider thumb for DOM manipulation
  const thumbRef = useRef<HTMLSpanElement>(null);

  // Track if component is ready to fade in
  const wrapperRef = useRef<HTMLButtonElement>(null);

  // --- Initialize theme on first client render ---
  useLayoutEffect(() => {
    if (typeof window === "undefined") return;

    // Determine current theme
    const savedTheme = localStorage.getItem("theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const currentTheme = savedTheme === "dark" ? true : savedTheme === "light" ? false : prefersDark;

    // Update HTML class immediately
    document.documentElement.classList.toggle("dark", currentTheme);

    // Update thumb position via DOM (no setState)
    if (thumbRef.current) {
      if (currentTheme) {
        thumbRef.current.classList.add(styles.sliderThumbDark);
      } else {
        thumbRef.current.classList.remove(styles.sliderThumbDark);
      }
    }

    // Fade in the toggle
    if (wrapperRef.current) {
      wrapperRef.current.style.opacity = "1";
    }

    // Initialize state for future toggles
    setIsDark(currentTheme);
  }, []);

  // --- Toggle handler for user clicks ---
  const toggleTheme = () => {
    const next = !isDark;
    setIsDark(next);
    document.documentElement.classList.toggle("dark", next);
    localStorage.setItem("theme", next ? "dark" : "light");

    // Update thumb position
    if (thumbRef.current) {
      if (next) {
        thumbRef.current.classList.add(styles.sliderThumbDark);
      } else {
        thumbRef.current.classList.remove(styles.sliderThumbDark);
      }
    }
  };

  const aria = isDark ? "Switch to light mode" : "Switch to dark mode";

  return (
    <button
      ref={wrapperRef}
      className={styles.toggle}
      onClick={toggleTheme}
      type="button"
      aria-label={aria}
      style={{ opacity: 0, transition: "opacity 0.3s ease-in" }} // fade-in
    >
      <span className={`${styles.icon} ${styles.iconLight}`}>☀️</span>
      <span className={styles.slider}>
        <span ref={thumbRef} className={styles.sliderThumb} />
      </span>
      <span className={`${styles.icon} ${styles.iconDark}`}>🌙</span>
    </button>
  );
}
