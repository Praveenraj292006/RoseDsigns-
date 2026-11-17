import { useState } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from "framer-motion";
import { Menu, X, ArrowUpRight } from "lucide-react";
import RodeDsigns from '../assets/images/RoseDsigns_logo.png'

const navLinks = [
  { name: "Home", href: "#home" },
  { name: "Our Work", href: "#work" },
  { name: "Services", href: "#services" },
];

// Real colour values so Framer Motion can interpolate them
const COLORS = {
  burgundy: "rgba(103, 45, 57, 1)",
  deepBurgundy: "rgba(72, 32, 42, 0.94)",
  gold: "rgba(176, 138, 87, 1)",
  goldClear: "rgba(176, 138, 87, 0)",
};

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 40);
  });

  const closeMenu = () => setMenuOpen(false);

  return (
    <motion.header
      initial={false}
      animate={{
        paddingTop: isScrolled ? 14 : 0,
        paddingLeft: isScrolled ? 16 : 0,
        paddingRight: isScrolled ? 16 : 0,
      }}
      transition={{ type: "spring", stiffness: 180, damping: 25 }}
      className="fixed top-0 left-0 z-[1000] w-full pointer-events-none"
    >
      <motion.nav
        initial={false}
        animate={{
          maxWidth: isScrolled ? 950 : 2400,
          borderRadius: isScrolled ? (menuOpen ? 28 : 999) : 0,
          backgroundColor: isScrolled ? COLORS.deepBurgundy : COLORS.burgundy,
          borderColor: isScrolled ? COLORS.gold : COLORS.goldClear,
          boxShadow: isScrolled
            ? "0 12px 35px rgba(72, 32, 42, 0.28)"
            : "0 0 0 rgba(72, 32, 42, 0)",
          paddingLeft: isScrolled ? 28 : 40,
          paddingRight: isScrolled ? 28 : 40,
        }}
        transition={{ type: "spring", stiffness: 180, damping: 25 }}
        className="mx-auto w-full border backdrop-blur-xl pointer-events-auto overflow-hidden"
      >
        {/* Bar */}
        <div
          className={`flex items-center justify-between transition-[height] duration-300 ${
            isScrolled ? "h-[68px]" : "h-[108px]"
          }`}
        >
          {/* Logo */}

<a
  href="#home"
  onClick={closeMenu}
  className="flex shrink-0 items-center gap-3"
>
  <img
    src={RodeDsigns}
    alt="RoseDsigns logo"
    className="h-15 w-15 object-contain bg-ivory rounded-full"
  />

  <div className="flex flex-col leading-none">
    <span className="font-heading text-[30px] font-semibold tracking-[-1px] text-antique-gold md:text-[32px]">
      ROSE<span className="text-light-gold">DSIGNS</span>
      <span className="text-champagne">.</span>
    </span>

    <span className="mt-1 font-body text-[8px] tracking-[0.23em] text-champagne/70">
      CREATIVE & DIGITAL STUDIO
    </span>
  </div>
</a>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-8 lg:gap-10 text-ivory">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="group text-inherit relative  text-[15px]  tracking-wide  transition-colors uppercase duration-300 hover:text-light-gold focus-visible:text-light-gold focus-visible:outline-none"
              >
                {link.name}
                <span className="absolute -bottom-2 left-0 h-px w-0 bg-antique-gold transition-all duration-300 group-hover:w-full group-focus-visible:w-full" />
              </a>
            ))}
          </div>

          {/* Desktop CTA */}
        <button
        type="button"
        onClick={() =>
            document.getElementById("contact")?.scrollIntoView({
            behavior: "smooth",
            })
        }
        className="
            hidden md:flex
            flex-none
            items-center justify-center
            gap-4
            w-[145px]
            h-[48px]
            px-6
            py-3
            border border-antique-gold
            bg-antique-gold
            font-body
            text-[10px]
            font-semibold
            uppercase
            tracking-[0.15em]
            text-deep-burgundy
            transition-all duration-300
            hover:-translate-y-0.5
            hover:bg-transparent
            hover:text-light-gold
        "
        >
        <span>Let's Talk</span>

</button>

          {/* Mobile button */}
          <button
            onClick={() => setMenuOpen((o) => !o)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            className="md:hidden flex h-11 w-11 items-center justify-center rounded-full text-light-gold transition-colors hover:bg-antique-gold/10 "
          >
            {menuOpen ? <X size={23} /> : <Menu size={23} />}
          </button>
        </div>

        {/* Mobile menu */}
        <AnimatePresence initial={false}>
          {menuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="md:hidden overflow-hidden border-t border-antique-gold/25"
            >
              <div className="py-3">
                {navLinks.map((link, index) => (
                  <motion.a
                    key={link.name}
                    href={link.href}
                    onClick={closeMenu}
                    initial={{ opacity: 0, x: -15 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.05 + index * 0.06 }}
                    className="flex items-center justify-between border-b border-antique-gold/20 py-4 font-heading text-2xl text-light-gold transition-colors hover:text-light-gold"
                  >
                    <span className="flex items-center gap-4 text-ivory">
                      <span className="font-body text-[10px] text-light-gold">
                        0{index + 1}
                      </span>
                      {link.name}
                    </span>
                    <ArrowUpRight size={17} className="text-antique-gold" />
                  </motion.a>
                ))}

                <button
  type="button"
  onClick={() => {
    closeMenu();
    document.getElementById("contact")?.scrollIntoView({
      behavior: "smooth",
    });
  }}
  className="
    mt-5 mb-3
    flex w-full flex-none
    h-12
    items-center justify-center
    gap-3
    border border-antique-gold
    bg-antique-gold
    px-4 py-3
    font-body text-[10px]
    font-bold uppercase tracking-widest
    text-deep-burgundy
    transition-all duration-300
    hover:bg-transparent
    hover:text-light-gold
  "
>
  Start a Project
  
</button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
    </motion.header>
  );
}