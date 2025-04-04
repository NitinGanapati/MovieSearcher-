"use client";

import { MdLightMode, MdDarkMode } from "react-icons/md";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function DarkMode() {
  const { theme, setTheme, systemTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return <div className="w-6 h-6"></div>; 

  const currentTheme = theme === "system" ? systemTheme : theme;

  return (
    <div>
      {currentTheme === "dark" ? (
        <MdLightMode
          className="text-2xl cursor-pointer"
          onClick={() => setTheme("light")}
        />
      ) : (
        <MdDarkMode
          className="text-2xl cursor-pointer"
          onClick={() => setTheme("dark")}
        />
      )}
    </div>
  );
}
