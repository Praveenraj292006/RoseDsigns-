import { useEffect, useRef, useState } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useMotionTemplate,
  useReducedMotion,
} from "framer-motion";
import { ArrowUpRight, ArrowUp } from "lucide-react";
import Logo from '../assets/images/RoseDsigns_logo.png'

/*
  Placeholders to replace: email, social URLs and the studio city/time zone.
  Spacing is inline so it survives a global `* { margin:0; padding:0 }` reset.
*/

const ease = [0.22, 1, 0.36, 1];
const EMAIL = "admin@rosedsigns.com";

const columns = [
  {
    title: "Explore",
    links: [
      { name: "Home", href: "#home" },
      { name: "Our Work", href: "#work" },
      { name: "Services", href: "#services" },
      { name: "About", href: "#about" },
      { name: "Contact", href: "#contact" },
    ],
  },
  {
    title: "Services",
    links: [
      { name: "Websites", href: "#services" },
      { name: "Branding & Identity", href: "#services" },
      { name: "Social Media", href: "#services" },
      { name: "SEO", href: "#services" },
      { name: "Video & Graphics", href: "#services" },
    ],
  },
  {
    title: "Follow",
    links: [
      { name: "Instagram", href: "#", external: true },
      { name: "LinkedIn", href: "#", external: true },
      { name: "Behance", href: "#", external: true },
      { name: "WhatsApp", href: "#", external: true },
    ],
  },
];

function FooterLink({ link }) {
  return (
    <a
      href={link.href}
      target={link.external ? "_blank" : undefined}
      rel={link.external ? "noopener noreferrer" : undefined}
      className="group relative inline-flex w-fit items-center gap-2 font-body text-sm text-champagne/75 transition-colors duration-300 hover:text-light-gold focus-visible:text-light-gold focus-visible:outline-none"
    >
      <span className="relative">
        {link.name}
        <span className="absolute left-0 h-px w-0 bg-antique-gold transition-all duration-300 group-hover:w-full group-focus-visible:w-full" style={{ bottom: -4 }} />
      </span>
      {link.external && (
        <ArrowUpRight
          size={13}
          className="-translate-x-1 translate-y-1 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:translate-y-0 group-hover:opacity-100"
        />
      )}
    </a>
  );
}

function useLocalTime(timeZone) {
  const [time, setTime] = useState("");
  useEffect(() => {
    const tick = () =>
      setTime(
        new Intl.DateTimeFormat("en-IN", {
          hour: "numeric",
          minute: "2-digit",
          hour12: true,
          timeZone,
        }).format(new Date())
      );
    tick();
    const t = setInterval(tick, 20000);
    return () => clearInterval(t);
  }, [timeZone]);
  return time;
}

export default function Footer() {
  const reduced = useReducedMotion();
  const time = useLocalTime("Asia/Kolkata");
  const markRef = useRef(null);

  // gold reveal that follows the cursor over the giant wordmark
  const mx = useSpring(useMotionValue(-400), { stiffness: 160, damping: 24 });
  const my = useSpring(useMotionValue(-400), { stiffness: 160, damping: 24 });
  const mask = useMotionTemplate`radial-gradient(260px circle at ${mx}px ${my}px, black 0%, transparent 72%)`;

  const onMarkMove = (e) => {
    const r = markRef.current.getBoundingClientRect();
    mx.set(e.clientX - r.left);
    my.set(e.clientY - r.top);
  };
  const onMarkLeave = () => {
    mx.set(-400);
    my.set(-400);
  };

  const toTop = () =>
    window.scrollTo({ top: 0, behavior: reduced ? "auto" : "smooth" });

  const reveal = (delay = 0) => ({
    initial: reduced ? false : { opacity: 0, y: 24 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.2 },
    transition: { duration: 0.8, delay, ease },
  });

  const wordmark = {
    fontSize: "clamp(3.2rem, 15.5vw, 15rem)",
    lineHeight: 0.95,
    letterSpacing: "-0.03em",
    whiteSpace: "nowrap",
  };

  return (
    <footer
      className="relative isolate overflow-hidden text-champagne"
      style={{
        background: "linear-gradient(180deg, #48202A 0%, #381923 100%)",
        padding: "clamp(88px, 10vw, 140px) clamp(20px, 6vw, 96px) 28px",
      }}
    >
      {/* scalloped edge, ivory hangs down from the Contact section */}
      <svg aria-hidden="true" width="100%" height="40" className="pointer-events-none absolute left-0 block" style={{ top: -1 }}>
        <defs>
          <pattern id="footer-scallop" width="80" height="40" patternUnits="userSpaceOnUse">
            <path d="M0,0 A40,40 0 0 0 80,0 Z" fill="#F7F3EC" />
          </pattern>
        </defs>
        <rect width="100%" height="40" fill="url(#footer-scallop)" />
      </svg>

      <div className="mx-auto flex w-full flex-col" style={{ maxWidth: 1440, gap: "clamp(56px, 7vw, 96px)" }}>
        {/* Top: invitation + back to top */}
        <div className="flex flex-col gap-10 md:flex-row md:items-end md:justify-between">
          <motion.div {...reveal()} className="flex flex-col gap-6">
            <p className="flex items-center gap-4 font-body text-[10px] font-semibold tracking-[0.25em] text-light-gold">
              <span className="h-px w-10 bg-antique-gold" aria-hidden="true" />
              HAVE A PROJECT IN MIND?
            </p>

            <a
              href={`mailto:${EMAIL}`}
              className="group relative w-fit font-heading font-medium text-ivory transition-colors duration-500 hover:text-light-gold"
              style={{ fontSize: "clamp(1.9rem, 5vw, 4.4rem)", lineHeight: 1.1 }}
            >
              {EMAIL}
              <span
                className="absolute left-0 h-px w-full origin-left scale-x-100 bg-antique-gold transition-transform duration-700 ease-out group-hover:scale-x-0"
                style={{ bottom: -6 }}
                aria-hidden="true"
              />
              <span
                className="absolute left-0 h-px w-full origin-right scale-x-0 bg-light-gold transition-transform delay-150 duration-700 ease-out group-hover:scale-x-100"
                style={{ bottom: -6 }}
                aria-hidden="true"
              />
            </a>
          </motion.div>

          <motion.button
            type="button"
            onClick={toTop}
            aria-label="Back to top"
            {...reveal(0.1)}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
            className="group relative grid shrink-0 place-items-center self-start rounded-full border border-antique-gold/50 text-light-gold transition-colors duration-500 hover:border-light-gold hover:bg-antique-gold hover:text-deep-burgundy focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-light-gold md:self-auto"
            style={{ width: 124, height: 124 }}
          >
            <motion.svg
              viewBox="0 0 200 200"
              className="absolute inset-0 h-full w-full"
              animate={reduced ? undefined : { rotate: -360 }}
              transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
              aria-hidden="true"
            >
              <defs>
                <path id="top-ring" d="M100,100 m-78,0 a78,78 0 1,1 156,0 a78,78 0 1,1 -156,0" />
              </defs>
              <text fill="currentColor" fontSize="13" fontWeight="600" letterSpacing="4" fontFamily="Inter, sans-serif">
                <textPath href="#top-ring" textLength="480" lengthAdjust="spacing">
                  BACK TO TOP · BACK TO TOP · BACK TO TOP ·
                </textPath>
              </text>
            </motion.svg>
            <ArrowUp size={26} strokeWidth={1.4} className="transition-transform duration-500 group-hover:-translate-y-1" />
          </motion.button>
        </div>

        {/* Middle: brand + link columns */}
        <div
          className="grid grid-cols-2 gap-x-8 gap-y-12 border-t border-champagne/15 lg:grid-cols-[1.4fr_1fr_1fr_1fr]"
          style={{ paddingTop: "clamp(40px, 5vw, 64px)" }}
        >
          <motion.div
            {...reveal()}
            className="col-span-2 flex max-w-sm flex-col gap-6 lg:col-span-1"
            >
            {/* Large brand logo */}
            <a href="#home" className="block w-fit">
                <img
                src={Logo}
                alt="RoseDsigns Creative & Digital Studio"
                className="w-56 md:w-64 lg:w-72 h-auto object-contain object-left"
                />
            </a>

            <p
                className="font-body text-sm text-champagne/65"
                style={{ lineHeight: 1.9 }}
            >
                Identities, websites and campaigns for brands that care how their
                work looks, feels and lasts.
            </p>
            </motion.div>

          {columns.map((col, i) => (
            <motion.nav key={col.title} aria-label={col.title} {...reveal(0.08 * (i + 1))} className="flex flex-col gap-5">
              <h3 className="font-body text-[10px] font-semibold tracking-[0.22em] text-light-gold">
                {col.title.toUpperCase()}
              </h3>
              <ul className="flex flex-col gap-3.5">
                {col.links.map((link) => (
                  <li key={link.name}>
                    <FooterLink link={link} />
                  </li>
                ))}
              </ul>
            </motion.nav>
          ))}
        </div>

        {/* Giant wordmark with a cursor-led gold reveal */}
        <motion.div
          {...reveal()}
          ref={markRef}
          onMouseMove={onMarkMove}
          onMouseLeave={onMarkLeave}
          className="relative select-none overflow-hidden text-center font-heading font-semibold"
          aria-hidden="true"
        >
          <span
            className="block"
            style={{
              ...wordmark,
              color: "transparent",
              WebkitTextStroke: "1px rgba(214,183,121,0.28)",
            }}
          >
            ROSEDSIGNS
          </span>
          <motion.span
            className="absolute inset-0 block"
            style={{
              ...wordmark,
              background: "linear-gradient(120deg, #B08A57, #E8D6B5 50%, #B08A57)",
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
              color: "transparent",
              WebkitMaskImage: mask,
              maskImage: mask,
            }}
          >
            ROSEDSIGNS
          </motion.span>
        </motion.div>

        {/* Bottom bar */}
        <div className="flex flex-col gap-4 border-t border-champagne/15 font-body text-xs text-champagne/55 sm:flex-row sm:items-center sm:justify-between" style={{ paddingTop: 24 }}>
          <p>© {new Date().getFullYear()} Rosedsigns. All rights reserved.</p>

          <p className="flex items-center gap-3">
            <span className="relative flex h-2 w-2" aria-hidden="true">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-antique-gold opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-antique-gold" />
            </span>
            Chennai{time && <> · {time}</>}
          </p>

          <p className="flex items-center gap-6">
            <a href="#" className="transition-colors hover:text-light-gold">Privacy</a>
            <a href="#" className="transition-colors hover:text-light-gold">Terms</a>
          </p>
        </div>
      </div>
    </footer>
  );
}