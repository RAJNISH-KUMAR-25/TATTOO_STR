"use client";

/**
 * Prince Tattoo — One Page Site (Next.js / React + Tailwind)
 * - Typed (no `any`), passes ESLint
 * - next/image everywhere (no <img> warnings)
 * - 3D coverflow gallery with in-box reflection + autoplay + controls
 * - WhatsApp FAB, smooth scroll, glass UI
 */

import React from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles,
  MapPin,
  Phone,
  Mail,
  Instagram,
  Facebook,
  Menu,
  X,
} from "lucide-react";

/* =============================== ASSETS =============================== */
/** HERO (Home) images */
const HOME_IMAGES = [
  "/prince/home_1.jpg",
  "/prince/home_2.jpg",
  "/prince/home_3.jpg",
  "/prince/home_4.jpg",
  "/prince/home_5.jpg",
  "/prince/home_6.jpg",
  "/prince/home_7.jpg",
  "/prince/home_8.jpg",
  "/prince/home_9.jpg",
  "/prince/home_10.jpg",
] as const;

/** GALLERY images (spelled as requested: gallary_*.jpg) */
const GALLARY_IMAGES = [
  "/prince/gallary_1.jpg",
  "/prince/gallary_2.jpg",
  "/prince/gallary_3.jpg",
  "/prince/gallary_4.jpg",
  "/prince/gallary_5.jpg",
  "/prince/gallary_6.jpg",
  "/prince/gallary_7.jpg",
  "/prince/gallary_8.jpg",
  "/prince/gallary_9.jpg",
  "/prince/gallary_10.jpg",
] as const;

/** Background texture */
const BG =
  "https://as1.ftcdn.net/v2/jpg/07/71/05/88/1000_F_771058830_Gl3e1T7akEjCRrJ7MlcSFcZxbbcpCNVB.jpg";
const PURPLE = "#6B21A8";

/* =============================== UI TOKENS =============================== */
const baseFrame = "border border-white/15 bg-white/[0.06] backdrop-blur-xl";
const frameRounded = `rounded-3xl ${baseFrame}`;
const frameSquare = `rounded-none ${baseFrame}`;

/* =============================== HEADER (fixed) =============================== */
function useHeaderElevated() {
  const [elevated, setElevated] = React.useState(false);
  React.useEffect(() => {
    const onScroll = () => setElevated((window.scrollY || 0) > 4);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return elevated;
}

const NAV = [
  "Home",
  "Announcements",
  "Services",
  "Artists",
  "Gallery",
  "Pricing",
  "Booking",
  "Contact",
] as const;

type SmoothHandler = (
  e: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
  href: string
) => void;

function HeaderBar({ onSmooth }: { onSmooth: SmoothHandler }) {
  const elevated = useHeaderElevated();
  const [menuOpen, setMenuOpen] = React.useState(false);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-colors ${
        elevated
          ? "bg-black/70 backdrop-blur-md border-b border-white/10"
          : "bg-black/40 backdrop-blur-sm"
      }`}
    >
      <div className="max-w-7xl mx-auto grid grid-cols-3 items-center px-4 md:px-6 py-3">
        {/* === Brand (Logo + Name) === */}
        <div className="justify-self-start flex items-center gap-2">
          <a
            href="#home"
            onClick={(e) => onSmooth(e, "#home")}
            className="flex items-center gap-2 text-base md:text-lg font-semibold"
          >
            <div className="relative w-9 h-9 md:w-10 md:h-10 rounded-full border border-white/20 bg-white/10 overflow-hidden">
              <Image
                src="/prince/LOGO.png"
                alt="Prince Tattoo Logo"
                fill
                sizes="(max-width:768px) 40px, 48px"
                priority
              />
            </div>
            <span className="hidden sm:inline-flex items-center gap-1">
              <Sparkles className="h-5 w-5 text-purple-500" />
              Prince Tattoo
            </span>
          </a>
        </div>

        {/* === Desktop Nav === */}
        <nav className="hidden md:flex items-center justify-center gap-6">
          {NAV.map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              onClick={(e) => onSmooth(e, `#${item.toLowerCase()}`)}
              className="text-sm text-gray-200/90 hover:text-white transition"
            >
              {item}
            </a>
          ))}
        </nav>

        {/* === Right actions === */}
        <div className="justify-self-end flex items-center gap-3">
          <a
            href="#booking"
            onClick={(e) => onSmooth(e, "#booking")}
            className="hidden md:inline-block rounded-full px-4 py-1.5 text-sm bg-purple-700/30 border border-white/20 hover:bg-purple-700/40"
          >
            Book Now
          </a>
          <button
            onClick={() => setMenuOpen((s) => !s)}
            className="md:hidden text-white hover:text-purple-400"
            aria-label="Toggle menu"
          >
            {menuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* === Mobile Drawer === */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className={`${frameSquare} border-t border-white/15 bg-black/80 px-4 md:px-6 md:hidden`}
          >
            <div className="mx-auto max-w-7xl py-3 flex flex-col gap-2">
              {NAV.map((label) => (
                <a
                  key={label}
                  href={`#${label.toLowerCase()}`}
                  onClick={(e) => onSmooth(e, `#${label.toLowerCase()}`)}
                  className="py-2 text-sm text-gray-100 hover:text-white"
                >
                  {label}
                </a>
              ))}
              <a
                href="#booking"
                onClick={(e) => onSmooth(e, "#booking")}
                className="py-2 text-sm text-gray-100 hover:text-white"
              >
                Book Now
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

/* =============================== SECTION WRAPPER =============================== */
const Section = ({
  id,
  children,
  className = "",
  isGallery = false,
}: {
  id?: string;
  children: React.ReactNode;
  className?: string;
  isGallery?: boolean;
}) => (
  <section
    id={id}
    className={`relative min-h-screen py-16 md:py-20 flex items-center justify-center snap-start overflow-x-hidden scroll-mt-24 ${className}`}
    style={{
      backgroundImage: `url(${BG})`,
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundAttachment: "fixed",
    }}
  >
    <div className="absolute inset-0 bg-black/70 backdrop-blur-[14px]" />
    <div className="relative z-10 w-full">
      {isGallery ? (
        children
      ) : (
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className={frameRounded + " p-6 md:p-8"}>{children}</div>
        </div>
      )}
    </div>
  </section>
);

/* =============================== HERO (Home) =============================== */
function HeroCarousel() {
  const [active, setActive] = React.useState(0);
  const count = HOME_IMAGES.length;
  const intervalRef = React.useRef<number | null>(null);
  const starterRef = React.useRef<number | null>(null);

  React.useEffect(() => {
    starterRef.current = window.setTimeout(() => {
      intervalRef.current = window.setInterval(
        () => setActive((i) => (i + 1) % count),
        5000
      );
    }, 3000);

    return () => {
      if (starterRef.current) window.clearTimeout(starterRef.current);
      if (intervalRef.current) window.clearInterval(intervalRef.current);
    };
  }, [count]);

  return (
    <div className="relative w-full min-h-screen overflow-hidden bg-black snap-start">
      {HOME_IMAGES.map((src, i) => (
        <Image
          key={src}
          src={src}
          alt={`home ${i + 1}`}
          fill
          className={`absolute inset-0 object-cover transition-opacity duration-700 ${
            i === active ? "opacity-100" : "opacity-0"
          }`}
          priority={i === 0}
          sizes="100vw"
        />
      ))}

      {/* Callout */}
      <div className="absolute left-8 bottom-12 md:left-14">
        <div
          className={`${frameRounded} max-w-xl px-6 py-5 md:px-7 md:py-6 bg-black/55 border-white/20`}
          style={{ boxShadow: `0 1px 0 0 ${PURPLE}30 inset` }}
        >
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">
            Prince Tattoo • Raipur
          </h1>
          <p className="mt-2 text-gray-200">
            Custom designs • Hygienic setup • Skilled artists
          </p>
          <div className="mt-4 flex gap-3">
            <a
              href="#booking"
              className="rounded-full px-5 py-2 text-sm font-semibold text-white"
              style={{
                backgroundColor: "rgba(107,33,168,.22)",
                border: "1px solid rgba(255,255,255,.18)",
              }}
            >
              Book Now
            </a>
            <a
              href="#gallery"
              className="rounded-full px-5 py-2 text-sm font-semibold text-white/90 border border-white/25 bg-white/10 hover:bg-white/20 transition"
            >
              Gallery
            </a>
          </div>
        </div>
      </div>

      {/* Arrows */}
      <button
        onClick={() => setActive((i) => (i - 1 + count) % count)}
        className="absolute left-4 md:left-10 top-1/2 -translate-y-1/2 h-12 w-12 rounded-full border border-white/30 bg-white/15 text-white text-3xl leading-none hover:bg-white/25 backdrop-blur-sm"
        aria-label="Previous"
      >
        ‹
      </button>
      <button
        onClick={() => setActive((i) => (i + 1) % count)}
        className="absolute right-4 md:right-10 top-1/2 -translate-y-1/2 h-12 w-12 rounded-full border border-white/30 bg-white/15 text-white text-3xl leading-none hover:bg-white/25 backdrop-blur-sm"
        aria-label="Next"
      >
        ›
      </button>
    </div>
  );
}

/* ===================== GALLERY COVERFLOW (only 5 visible) ===================== */
function CoverflowGallery() {
  const [current, setCurrent] = React.useState(0);
  const [isPlaying, setIsPlaying] = React.useState(true);
  const [isHovered, setIsHovered] = React.useState(false);
  const autoplayRef = React.useRef<number | null>(null);
  const count = GALLARY_IMAGES.length;

  const stopAutoplay = React.useCallback(() => {
    if (autoplayRef.current) {
      window.clearInterval(autoplayRef.current);
      autoplayRef.current = null;
    }
    setIsPlaying(false);
  }, []);

  const startAutoplay = React.useCallback(() => {
    if (autoplayRef.current) return;
    autoplayRef.current = window.setInterval(() => {
      setCurrent((c) => (c + 1) % count);
    }, 4000);
    setIsPlaying(true);
  }, [count]);

  React.useEffect(() => {
    if (isPlaying) startAutoplay();
    return () => stopAutoplay();
  }, [isPlaying, startAutoplay, stopAutoplay]);

  // Touch
  const touchX = React.useRef<number | null>(null);
  const onTouchStart = (e: React.TouchEvent<HTMLDivElement>) =>
    (touchX.current = e.touches[0].clientX);
  const onTouchEnd = (e: React.TouchEvent<HTMLDivElement>) => {
    if (touchX.current == null) return;
    const dx = touchX.current - e.changedTouches[0].clientX;
    if (Math.abs(dx) > 40) {
      stopAutoplay();
      setCurrent((c) => (c + (dx > 0 ? 1 : -1) + count) % count);
    }
    touchX.current = null;
  };

  const prev = () => {
    stopAutoplay();
    setCurrent((c) => (c - 1 + count) % count);
  };
  const next = () => {
    stopAutoplay();
    setCurrent((c) => (c + 1) % count);
  };

  // Style based on relative offset (-2..2)
  const getStyleByOffset = (offset: number): React.CSSProperties => {
    const abs = Math.abs(offset);
    const sign = Math.sign(offset);

    const translateX = offset * 260;
    const translateZ = -abs * 220;
    const rotateY = -sign * Math.min(abs * 60, 60);
    const baseScale = 1 - abs * 0.1;
    const opacity = abs > 3 ? 0 : 1 - abs * 0.15;

    const scale = offset === 0 && isHovered ? baseScale * 1.18 : baseScale;

    return {
      transform: `
        translateX(${translateX}px)
        translateZ(${translateZ}px)
        rotateY(${rotateY}deg)
        scale(${scale})
      `,
      opacity,
      zIndex: 100 - abs + (offset === 0 ? 10 : 0),
      transition:
        "transform 0.8s cubic-bezier(0.68,-0.55,0.265,1.55), opacity 0.5s",
    } as React.CSSProperties;
  };

  const visibleOffsets = [-2, -1, 0, 1, 2] as const;

  return (
    <div className={`${frameRounded} p-6 md:p-8 bg-black/40`}>
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-6">
        Gallery
      </h2>

      <div
        className="relative w-full h-[70vh] min-h-[520px] flex items-center justify-center overflow-visible"
        style={{ perspective: "1200px", transformStyle: "preserve-3d" }}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        {visibleOffsets.map((off) => {
          const idx = (current + off + count) % count;
          const src = GALLARY_IMAGES[idx];
          return (
            <div
              key={`${idx}-${off}`}
              className="absolute w-80 h-80 md:w-96 md:h-96 rounded-2xl overflow-hidden border border-white/10 shadow-[0_30px_80px_rgba(0,0,0,0.85)] cursor-pointer bg-black/20"
              style={getStyleByOffset(off)}
              onMouseEnter={() => off === 0 && setIsHovered(true)}
              onMouseLeave={() => off === 0 && setIsHovered(false)}
              onClick={() => setCurrent(idx)}
            >
              <Image
                src={src}
                alt={`gallary-${idx}`}
                fill
                sizes="(max-width: 768px) 320px, 384px"
                className="object-cover"
                priority={off === 0}
              />

              {/* In-box reflection (uses background for mask) */}
              <div
                className="absolute left-0 right-0 bottom-0 h-[45%] pointer-events-none"
                style={{
                  transform: "translateY(100%) scaleY(-1)",
                  backgroundImage: `url(${src})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  opacity: 0.25,
                  WebkitMaskImage:
                    "linear-gradient(to bottom, rgba(0,0,0,0.5), rgba(0,0,0,1))",
                  maskImage:
                    "linear-gradient(to bottom, rgba(0,0,0,0.5), rgba(0,0,0,1))",
                }}
              />
            </div>
          );
        })}

        {/* Arrows */}
        <button
          onClick={prev}
          className="absolute left-6 md:left-10 top-1/2 -translate-y-1/2 h-14 w-14 rounded-full border border-white/20 bg-white/10 backdrop-blur-xl hover:bg-white/20 text-3xl text-white shadow-lg transition"
          aria-label="Previous"
        >
          ‹
        </button>
        <button
          onClick={next}
          className="absolute right-6 md:right-10 top-1/2 -translate-y-1/2 h-14 w-14 rounded-full border border-white/20 bg-white/10 backdrop-blur-xl hover:bg-white/20 text-3xl text-white shadow-lg transition"
          aria-label="Next"
        >
          ›
        </button>

        {/* Play / Pause (a little space above images) */}
        <button
          onClick={() => (isPlaying ? stopAutoplay() : startAutoplay())}
          className="absolute bottom-6 left-1/2 -translate-x-1/2 h-14 w-14 flex items-center justify-center rounded-full border border-white/20 bg-white/10 backdrop-blur-xl hover:bg-white/20 text-white text-2xl shadow-lg transition"
          aria-label={isPlaying ? "Pause autoplay" : "Play autoplay"}
          title={isPlaying ? "Pause" : "Play"}
        >
          {isPlaying ? "❚❚" : "▶"}
        </button>
      </div>
    </div>
  );
}

/* =============================== INTERACTIVE FOOTER (Shapes) =============================== */
function InteractiveFooter() {
  const ref = React.useRef<HTMLDivElement>(null);

  const onMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    el.style.setProperty("--mx", String(x));
    el.style.setProperty("--my", String(y));
  };
  const onLeave = () => {
    const el = ref.current;
    if (!el) return;
    el.style.setProperty("--mx", "0");
    el.style.setProperty("--my", "0");
  };
  const handleSlash = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const t = e.currentTarget;
    t.classList.add("slashed");
    window.setTimeout(() => t.classList.remove("slashed"), 500);
  };

  const shapes: Array<{
    t: "circle" | "square" | "triangle" | "diamond" | "hex" | "star";
    left?: string;
    top?: string;
    bottom?: string;
    s: number;
    col: string;
    k: number;
  }> = [
    { t: "circle", left: "6%", top: "28%", s: 36, col: "236,72,153", k: 0.9 },
    { t: "square", left: "12%", top: "16%", s: 24, col: "99,102,241", k: 0.6 },
    { t: "hex", left: "18%", top: "34%", s: 28, col: "14,165,233", k: 0.7 },
    { t: "diamond", left: "22%", top: "20%", s: 24, col: "34,197,94", k: 0.8 },
    { t: "triangle", left: "28%", top: "40%", s: 32, col: "245,158,11", k: 1.0 },
    { t: "star", left: "34%", top: "18%", s: 28, col: "59,130,246", k: 0.7 },
    { t: "circle", left: "40%", top: "34%", s: 22, col: "250,204,21", k: 0.6 },
    { t: "square", left: "46%", top: "22%", s: 26, col: "168,85,247", k: 0.7 },
    { t: "diamond", left: "52%", top: "38%", s: 24, col: "20,184,166", k: 0.5 },
    { t: "hex", left: "58%", top: "26%", s: 30, col: "244,63,94", k: 0.9 },
    { t: "triangle", left: "64%", top: "42%", s: 24, col: "147,51,234", k: 0.8 },
    { t: "star", left: "70%", top: "20%", s: 30, col: "34,197,94", k: 0.7 },
    { t: "circle", left: "76%", top: "36%", s: 30, col: "56,189,248", k: 0.9 },
    { t: "square", left: "82%", top: "24%", s: 22, col: "251,146,60", k: 0.6 },
    { t: "diamond", left: "10%", bottom: "14%", s: 20, col: "236,72,153", k: 0.6 },
    { t: "hex", left: "18%", bottom: "18%", s: 22, col: "99,102,241", k: 0.7 },
    { t: "triangle", left: "30%", bottom: "12%", s: 28, col: "14,165,233", k: 0.8 },
    { t: "star", left: "42%", bottom: "16%", s: 26, col: "245,158,11", k: 0.7 },
    { t: "circle", left: "54%", bottom: "14%", s: 20, col: "59,130,246", k: 0.5 },
    { t: "square", left: "66%", bottom: "18%", s: 24, col: "250,204,21", k: 0.6 },
    { t: "diamond", left: "78%", bottom: "12%", s: 28, col: "168,85,247", k: 0.9 },
    { t: "hex", left: "90%", bottom: "16%", s: 22, col: "34,197,94", k: 0.6 },
  ];

  return (
    <footer
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className="relative overflow-hidden px-4 sm:px-6 lg:px-8 py-10 select-none border-t border-white/15"
      style={{ "--mx": 0, "--my": 0 } as React.CSSProperties}
    >
      {/* Gradient BG */}
      <div
        className="absolute inset-0 -z-20"
        style={{
          background:
            "radial-gradient(100% 120% at 50% 100%, rgba(107,33,168,.18), rgba(0,0,0,.95))",
        }}
      />

      {/* Shapes Layer */}
      <div className="absolute inset-0 z-0">
        {shapes.map((s, i) => {
          const pos: React.CSSProperties = {
            ...(s.left ? { left: s.left } : {}),
            ...(s.top ? { top: s.top } : {}),
            ...(s.bottom ? { bottom: s.bottom } : {}),
            width: s.s,
            height: s.s,
            background: `linear-gradient(145deg, rgba(${s.col},.9), rgba(${s.col},.3))`,
            border: "1px solid rgba(255,255,255,.18)",
            boxShadow: `0 0 ${Math.max(8, s.s / 2)}px rgba(${s.col},.4)`,
            transform: `translate(calc(var(--mx) * ${s.k * 22}px), calc(var(--my) * ${
              s.k * -16
            }px))`,
            transition: "transform 120ms linear",
          };
          const cls =
            s.t === "circle"
              ? "pt-circle"
              : s.t === "square"
              ? "pt-square"
              : s.t === "triangle"
              ? "pt-triangle"
              : s.t === "diamond"
              ? "pt-diamond"
              : s.t === "hex"
              ? "pt-hex"
              : "pt-star";
          return (
            <div
              key={`${s.t}-${i}`}
              className={`absolute cursor-pointer ${cls}`}
              style={pos}
              onClick={handleSlash}
            />
          );
        })}
      </div>

      {/* Crystal Panel */}
      <div className="relative z-10 flex justify-center">
        <div
          className="rounded-2xl border border-white/20 bg-white/10 backdrop-blur-2xl px-5 py-3 md:px-6 md:py-4 shadow-[0_6px_25px_rgba(0,0,0,0.35),inset_0_1px_0_rgba(255,255,255,0.25)]"
          style={{
            backgroundImage:
              "linear-gradient(135deg, rgba(255,255,255,0.14), rgba(255,255,255,0.06))",
          }}
        >
          <div className="text-center">
            <p className="text-sm text-gray-100">
              © {new Date().getFullYear()}{" "}
              <span className="font-semibold text-white">Prince Tattoo</span> •
              All Rights Reserved
            </p>
            <p className="mt-1 text-xs text-gray-300">
              Hover or click on the shapes ✨
            </p>
          </div>
        </div>
      </div>

      {/* Shape CSS */}
      <style jsx>{`
        .pt-circle {
          border-radius: 9999px;
        }
        .pt-square {
          border-radius: 10px;
        }
        .pt-triangle {
          clip-path: polygon(50% 0%, 0% 100%, 100% 100%);
        }
        .pt-diamond {
          clip-path: polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%);
        }
        .pt-hex {
          clip-path: polygon(25% 5%, 75% 5%, 100% 50%, 75% 95%, 25% 95%, 0% 50%);
        }
        .pt-star {
          clip-path: polygon(
            50% 0%,
            61% 35%,
            98% 35%,
            68% 57%,
            79% 91%,
            50% 72%,
            21% 91%,
            32% 57%,
            2% 35%,
            39% 35%
          );
        }
        [class*="pt-"] {
          position: absolute;
          overflow: hidden;
        }
        [class*="pt-"]::after {
          content: "";
          position: absolute;
          top: 50%;
          left: 50%;
          width: 1.5px;
          height: 140%;
          background-color: rgba(255, 255, 255, 0.9);
          transform-origin: center;
          transform: translate(-50%, -50%) rotate(45deg) scaleY(0);
          transition: transform 0.4s cubic-bezier(0.22, 1, 0.36, 1);
        }
        .slashed::after {
          transform: translate(-50%, -50%) rotate(45deg) scaleY(1);
        }
      `}</style>
    </footer>
  );
}

/* =============================== PAGE =============================== */
export default function Page() {
  const smooth: SmoothHandler = (e, href) => {
    e.preventDefault();
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen overflow-x-hidden snap-y snap-mandatory scroll-smooth bg-[#0b0c0e] text-white">
      <style jsx global>{`
        html,
        body {
          overflow-x: hidden;
        }
      `}</style>

      <HeaderBar onSmooth={smooth} />

      {/* ================= HOME ================= */}
      <div id="home" className="snap-start">
        <HeroCarousel />
      </div>

      {/* ================= ANNOUNCEMENTS ================= */}
      <Section id="announcements">
        <div className="flex flex-col md:flex-row gap-6">
          <div className={frameRounded + " p-6 flex-1"}>
            <h2 className="text-3xl font-bold">Announcements</h2>
            <ul className="mt-4 space-y-3 text-sm text-gray-200">
              <li>• Festive Offer: 10% off on custom designs till Oct 31.</li>
              <li>• New Artist: Zara joins the team (Neo-traditional).</li>
              <li>• Walk-ins welcome daily 12–7 PM.</li>
            </ul>
          </div>
          <div className={frameRounded + " p-6 md:w-[380px]"}>
            <h3 className="text-lg font-semibold">Studio Hours</h3>
            <p className="mt-2 text-sm text-gray-300">Mon–Sun • 11:00 – 20:00</p>
            <h3 className="mt-5 text-lg font-semibold">Quick Contact</h3>
            <p className="mt-2 text-sm text-gray-300">
              +91 9589557355 • princetattoos0903@gmail.com
            </p>
          </div>
        </div>
      </Section>

      {/* ================= SERVICES ================= */}
      <Section id="services">
        <h2 className="text-3xl md:text-4xl font-bold text-center">Services</h2>
        <p className="mt-3 text-center text-gray-300">
          Premium inks. Steady hands. Timeless art.
        </p>
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {[
            { t: "Custom Tattoos", d: "Unique designs from concept to stencil." },
            { t: "Black & Grey", d: "Portrait realism and fine gradients." },
            { t: "Fine Line", d: "Delicate linework & minimalist styles." },
            { t: "Cover-Ups", d: "Redesigns that honor what came before." },
            { t: "Photo Realism", d: "Lifelike art captured in ink." },
            { t: "Piercings", d: "Sterile, safe, and styled to you." },
          ].map((s) => (
            <motion.div
              key={s.t}
              whileHover={{ y: -6, scale: 1.03 }}
              transition={{ type: "spring", stiffness: 220, damping: 18 }}
              className={frameRounded + " p-6"}
            >
              <h3 className="text-lg font-semibold">{s.t}</h3>
              <p className="mt-2 text-sm text-gray-300">{s.d}</p>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* ================= ARTISTS ================= */}
      <Section id="artists">
        <h2 className="text-3xl md:text-4xl font-bold text-center">Artists</h2>
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {[
            {
              n: "Riya Kapoor",
              r: "Fine Line / Florals",
              src: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?q=80&w=1200",
            },
            {
              n: "Arjun Mehta",
              r: "Black & Grey / Portraits",
              src: "https://images.unsplash.com/photo-1544006659-f0b21884ce1d?q=80&w=1200",
            },
            {
              n: "Zara Ali",
              r: "Neo-Trad / Color",
              src: "https://images.unsplash.com/photo-1541534401786-2077eed87a74?q=80&w=1200",
            },
          ].map((a) => (
            <div key={a.n} className={frameRounded + " overflow-hidden"}>
              <div className="relative h-64 w-full">
                <Image
                  src={a.src}
                  alt={a.n}
                  fill
                  sizes="(max-width:768px) 100vw, 33vw"
                  className="object-cover hover:scale-110 transition-transform duration-500"
                />
              </div>
              <div className="p-5">
                <h3 className="text-lg font-semibold">{a.n}</h3>
                <p className="text-sm text-gray-300">{a.r}</p>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* ================= GALLERY ================= */}
      <Section id="gallery" isGallery>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full">
          <CoverflowGallery />
        </div>
      </Section>

      {/* ================= PRICING ================= */}
      <Section id="pricing">
        <h2 className="text-3xl md:text-4xl font-bold text-center">
          Pricing (Starting)
        </h2>
        <p className="mt-3 text-center text-gray-300">
          Exact quotes depend on size, placement, detail, and artist.
        </p>
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {[
            { t: "Mini (1–2 in)", p: "₹1,499 – ₹2,999" },
            { t: "Medium (3–6 in)", p: "₹3,499 – ₹7,999" },
            { t: "Large / Custom", p: "Consultation based" },
          ].map((card) => (
            <div key={card.t} className={frameRounded + " p-6"}>
              <h3 className="text-lg font-semibold">{card.t}</h3>
              <p className="mt-2 text-sm text-gray-300">{card.p}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* ================= BOOKING (Formspree) ================= */}
      <Section id="booking">
        <div className="grid gap-8 md:grid-cols-2">
          <div className={frameRounded + " p-6"}>
            <h3 className="text-2xl font-semibold">Book a Consultation</h3>
            <p className="mt-2 text-gray-300 text-sm">
              Fill the form — we’ll email you within 24 hours.
            </p>
            <form
              action="https://formspree.io/f/movkpeyd"
              method="POST"
              className="mt-6 grid gap-4"
            >
              <input
                name="name"
                placeholder="Full name"
                required
                className="w-full rounded-xl bg-black/40 border border-white/15 px-4 py-3 outline-none focus:ring-2 focus:ring-purple-700/40"
              />
              <div className="grid gap-4 sm:grid-cols-2">
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  required
                  className="w-full rounded-xl bg-black/40 border border-white/15 px-4 py-3 outline-none focus:ring-2 focus:ring-purple-700/40"
                />
                <input
                  name="phone"
                  placeholder="Phone"
                  required
                  className="w-full rounded-xl bg-black/40 border border-white/15 px-4 py-3 outline-none focus:ring-2 focus:ring-purple-700/40"
                />
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <input
                  name="artist"
                  placeholder="Preferred artist (optional)"
                  className="w-full rounded-xl bg-black/40 border border-white/15 px-4 py-3 outline-none focus:ring-2 focus:ring-purple-700/40"
                />
                <input
                  type="date"
                  name="date"
                  className="w-full rounded-xl bg-black/40 border border-white/15 px-4 py-3 outline-none focus:ring-2 focus:ring-purple-700/40"
                />
              </div>
              <textarea
                name="notes"
                placeholder="Describe size, placement, references…"
                className="min-h-[120px] w-full rounded-xl bg-black/40 border border-white/15 px-4 py-3 outline-none focus:ring-2 focus:ring-purple-700/40"
              />
              <button
                type="submit"
                className="mt-2 rounded-full px-5 py-3 text-sm font-semibold transition border border-white/20"
                style={{
                  backgroundColor: "rgba(107,33,168,.22)",
                }}
              >
                Send Booking Request
              </button>
            </form>
          </div>

          <div className={frameRounded + " p-6"}>
            <h3 className="text-2xl font-semibold">What to expect</h3>
            <ul className="mt-4 space-y-3 text-sm text-gray-200">
              <li>1) We’ll review your idea and check artist availability.</li>
              <li>2) You’ll get an email with time slots and a rough quote.</li>
              <li>3) A small deposit secures your appointment.</li>
            </ul>
            <div className="mt-6 grid gap-2 text-sm text-gray-300">
              <p>• Disposable needles • Hospital-grade sterilization • Certified inks</p>
              <p>• Hours: Mon–Sun 11:00 – 20:00</p>
            </div>
          </div>
        </div>
      </Section>

      {/* ================= CONTACT ================= */}
      <Section id="contact">
        <div className="grid gap-8 md:grid-cols-2">
          {/* Contact info */}
          <div className={frameRounded + " p-6"}>
            <h3 className="text-xl font-semibold mb-4">Contact & Hours</h3>

            <a
              href="https://maps.app.goo.gl/osXhYmWNRurW1ShB9"
              target="_blank"
              rel="noreferrer"
              className="flex items-start gap-3 text-gray-200 hover:text-white"
            >
              <MapPin className="h-5 w-5 text-purple-500" />
              Find us on Google Maps
            </a>

            <p className="mt-3 flex items-start gap-3 text-gray-200">
              <Phone className="h-5 w-5 text-purple-500" />
              +91 9589557355
            </p>

            <a
              href="mailto:princetattoos0903@gmail.com"
              className="mt-3 flex items-start gap-3 text-gray-200 hover:text-white"
            >
              <Mail className="h-5 w-5 text-purple-500" />
              princetattoos0903@gmail.com
            </a>

            <div className="mt-5 flex items-center gap-4 text-gray-300">
              <a
                href="https://www.instagram.com/prince_tattoo_raipur/"
                target="_blank"
                rel="noreferrer"
                className="h-10 w-10 inline-flex items-center justify-center rounded-full border border-white/15 bg-white/10 hover:bg-white/20"
                aria-label="Instagram"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href="https://www.facebook.com/share/1AiDHvUX3k/"
                target="_blank"
                rel="noreferrer"
                className="h-10 w-10 inline-flex items-center justify-center rounded-full border border-white/15 bg-white/10 hover:bg-white/20"
                aria-label="Facebook"
              >
                <Facebook className="h-5 w-5" />
              </a>
            </div>

            <p className="mt-6 text-sm text-gray-400">Hours: Mon–Sun 11:00 – 20:00</p>
          </div>

          {/* Map embed (with fallback link) */}
          <div className={frameRounded + " p-0 overflow-hidden"}>
            <div className="p-3">
              <div className="rounded-2xl border border-white/10 overflow-hidden bg-black/30">
                <iframe
                  title="Map"
                  className="h-[360px] w-full border-0 block"
                  src="https://www.google.com/maps?q=Raipur,+Chhattisgarh&output=embed"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
              <a
                href="https://maps.app.goo.gl/osXhYmWNRurW1ShB9"
                target="_blank"
                rel="noreferrer"
                className="mt-3 inline-block rounded-full px-4 py-2 text-sm border border-white/20 bg-white/10 hover:bg-white/20"
              >
                Open in Google Maps
              </a>
            </div>
          </div>
        </div>
      </Section>

      {/* ================= FOOTER (Interactive) ================= */}
      <InteractiveFooter />

      {/* ================= Floating WhatsApp ================= */}
      <a
        href="https://wa.me/919589557355?text=Hi%20Prince%20Tattoo%20%E2%9C%A8%20I'd%20like%20to%20book%20a%20tattoo%20consultation."
        target="_blank"
        rel="noreferrer"
        className="fixed bottom-6 right-6 md:bottom-8 md:right-8 group"
        aria-label="Chat on WhatsApp"
      >
        <span className="sr-only">WhatsApp</span>
        <div className="h-14 w-14 md:h-16 md:w-16 rounded-full shadow-[0_10px_30px_rgba(0,0,0,0.35)] border border-white/10 bg-[#25D366] grid place-items-center hover:scale-105 transition">
          {/* WhatsApp glyph */}
          <svg
            viewBox="0 0 32 32"
            width="26"
            height="26"
            fill="currentColor"
            className="text-white"
            aria-hidden="true"
          >
            <path d="M19.11 17.48c-.29-.14-1.7-.83-1.96-.92-.26-.1-.45-.14-.64.14-.19.29-.73.92-.9 1.11-.17.2-.33.22-.61.08-.29-.14-1.2-.44-2.29-1.41-.85-.76-1.42-1.7-1.58-1.98-.17-.29-.02-.45.12-.59.12-.12.29-.32.43-.49.14-.17.19-.29.29-.49.1-.2.05-.37-.02-.51-.08-.14-.64-1.55-.88-2.12-.23-.55-.46-.48-.64-.49-.17-.01-.37-.01-.57-.01-.2 0-.52.07-.79.37-.27.29-1.04 1.02-1.04 2.48s1.07 2.88 1.21 3.08c.15.2 2.1 3.21 5.08 4.5.71.31 1.27.5 1.7.64.71.22 1.35.19 1.86.11.57-.08 1.7-.69 1.95-1.36.24-.68.24-1.26.17-1.36-.06-.11-.23-.17-.52-.31z" />
            <path d="M16.02 3.2C9.42 3.2 4.08 8.54 4.08 15.14c0 2.3.63 4.44 1.73 6.28L4 28.8l7.57-1.79c1.76.97 3.78 1.52 5.94 1.52 6.6 0 11.94-5.34 11.94-11.94S22.62 3.2 16.02 3.2zm0 21.67c-1.98 0-3.82-.58-5.37-1.58l-.38-.24-4.49 1.06 1.2-4.37-.25-.4a10.5 10.5 0 0 1-1.6-5.61c0-5.82 4.73-10.55 10.55-10.55s10.55 4.73 10.55 10.55-4.73 10.55-10.55 10.55z" />
          </svg>
        </div>
      </a>
    </div>
  );
}
