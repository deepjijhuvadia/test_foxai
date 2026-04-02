"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import Image from "next/image";
import { useState } from "react";

const navItems = [
  { name: "Script Lab", path: "/command-center" },
  { name: "Editors", path: "/editors" },
  { name: "Courses", path: "/courses" },
  { name: "About", path: "/about" },
];

export function Navbar() {
  const pathname = usePathname();
  const [imgError, setImgError] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 h-16 border-b border-surface-400 bg-background/80 backdrop-blur-md z-50 flex items-center justify-between px-6">
      {/* Left: Identity */}
      <div className="flex items-center gap-2">
        <Link href="/" className="flex items-center gap-2 transition-opacity duration-200 hover:opacity-80">
          {!imgError ? (
            <Image 
              src="/logo.png" 
              alt="FoxtacticsAI Logo" 
              width={120} 
              height={32} 
              className="h-[28px] md:h-[32px] w-auto object-contain"
              onError={() => setImgError(true)}
            />
          ) : (
            <span className="text-sm font-bold tracking-tight text-primary">
              FoxtacticsAI
            </span>
          )}
        </Link>
      </div>

      {/* Right: Actions / Links */}
      <div className="flex items-center gap-6">
        {navItems.map((item) => (
          <Link
            key={item.path}
            href={item.path}
            className={twMerge(
              clsx(
                "text-sm tracking-wide transition-colors duration-200",
                item.name === "Script Lab" ? "font-bold shadow-primary/50" : "font-medium",
                pathname === item.path
                  ? "text-white"
                  : (item.name === "Script Lab" ? "text-primary hover:text-white" : "text-secondary hover:text-primary")
              )
            )}
          >
            {item.name}
          </Link>
        ))}
        {/* Profile */}
        <div className="w-6 h-6 rounded-full bg-surface-300 border border-surface-400 ml-4 hover:border-primary transition-colors cursor-pointer" />
      </div>
    </nav>
  );
}
