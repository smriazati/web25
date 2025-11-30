"use client";

import { useEffect, useState } from "react";
import styles from "@/styles/DarkModeToggle.module.css";

export default function DarkModeToggle() {
  // Start as null so SSR and client both render identical markup
  const [isDark, setIsDark] = useState<boolean | null>(null);

  useEffect(() => {
    const current = document.documentElement.classList.contains("dark");
    setIsDark(current);
  }, []);

  const toggleTheme = () => {
    if (isDark === null) return; // not ready
    const next = !isDark;
    setIsDark(next);
    document.documentElement.classList.toggle("dark", next);
    localStorage.setItem("theme", next ? "dark" : "light");
  };

  // Render neutral markup until we know the theme
  const thumbClass =
    isDark === null
      ? styles.sliderThumb // neutral
      : `${styles.sliderThumb} ${isDark ? styles.sliderThumbDark : ""}`;

  const aria =
    isDark === null
      ? "Toggle dark mode"
      : isDark
        ? "Switch to light mode"
        : "Switch to dark mode";

  return (
    <button
      className={styles.toggle}
      onClick={toggleTheme}
      type="button"
      aria-label={aria}
    >
      <span className={`${styles.icon} ${styles.iconLight}`}>☀️</span>
      <span className={styles.slider}>
        <span className={thumbClass} />
      </span>
      <span className={`${styles.icon} ${styles.iconDark}`}>🌙</span>
    </button>
  );
}
