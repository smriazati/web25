"use client";

import { useEffect, useState } from "react";
import styles from "@/styles/DarkModeToggle.module.css";

const DarkModeToggle = () => {
  const [isDark, setIsDark] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setHydrated(true);

    const savedTheme = localStorage.getItem("theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

    const shouldBeDark = savedTheme === "dark" || (!savedTheme && prefersDark);

    setIsDark(shouldBeDark);
    document.documentElement.classList.toggle("dark", shouldBeDark);
  }, []);

  // Prevent hydration mismatch by hiding the toggle until ready
  if (!hydrated) {
    return (
      <button
        className={styles.toggle}
        aria-label="Initializing theme"
        style={{ visibility: "hidden" }}
        type="button"
      />
    );
  }

  const toggleTheme = () => {
    const next = !isDark;
    setIsDark(next);
    document.documentElement.classList.toggle("dark", next);
    localStorage.setItem("theme", next ? "dark" : "light");
  };

  return (
    <button
      className={styles.toggle}
      onClick={toggleTheme}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      type="button"
    >
      <span className={styles.icon}>☀️</span>
      <span className={styles.slider}>
        <span
          className={`${styles.sliderThumb} ${isDark ? styles.sliderThumbDark : ""
            }`}
        />
      </span>
      <span className={styles.icon}>🌙</span>
    </button>
  );
};

export default DarkModeToggle;
