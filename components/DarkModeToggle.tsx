"use client";

import { useRef, useLayoutEffect } from "react";
import styles from "@/styles/DarkModeToggle.module.css";

export default function DarkModeToggle() {
  const thumbRef = useRef<HTMLSpanElement>(null);
  const wrapperRef = useRef<HTMLButtonElement>(null);

  // --- Only for user toggles, no initial state ---
  const toggleTheme = () => {
    const isDarkNow = document.documentElement.classList.contains("dark");
    const next = !isDarkNow;
    document.documentElement.classList.toggle("dark", next);
    localStorage.setItem("theme", next ? "dark" : "light");

    if (thumbRef.current) {
      thumbRef.current.classList.toggle(styles.sliderThumbDark, next);
    }
  };

  useLayoutEffect(() => {
    if (typeof window === "undefined") return;

    // Determine initial theme
    const savedTheme = localStorage.getItem("theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const currentTheme = savedTheme === "dark" ? true : savedTheme === "light" ? false : prefersDark;

    // Apply theme immediately
    document.documentElement.classList.toggle("dark", currentTheme);

    // Update thumb
    if (thumbRef.current) {
      thumbRef.current.classList.toggle(styles.sliderThumbDark, currentTheme);
    }

    // Fade in toggle
    if (wrapperRef.current) {
      wrapperRef.current.style.opacity = "1";
    }
  }, []);

  return (
    <button
      ref={wrapperRef}
      className={styles.toggle}
      onClick={toggleTheme}
      type="button"
      aria-label="Toggle dark mode"
      style={{ opacity: 0, transition: "opacity 0.3s ease-in" }}
    >
      <span className={`${styles.icon} ${styles.iconLight}`}>☀️</span>
      <span className={styles.slider}>
        <span ref={thumbRef} className={styles.sliderThumb} />
      </span>
      <span className={`${styles.icon} ${styles.iconDark}`}>🌙</span>
    </button>
  );
}
