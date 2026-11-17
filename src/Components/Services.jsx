import { useRef, useState } from "react";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useSpring,
  useTransform,
  useMotionTemplate,
  useReducedMotion,
} from "framer-motion";
import {
  ArrowUpRight,
  MonitorSmartphone,
  Gem,
  Share2,
  Search,
  MessageCircle,
  MapPin,
  Film,
  BarChart3,
} from "lucide-react";

/*
  Critical spacing uses inline styles and flex/grid `gap`, so the layout
  stays correct even if a global `* { margin: 0; padding: 0 }` reset exists.
*/

const services = [
  {
    title: "Website Design & Development",
    description:
      "Beautiful, responsive websites that bring your brand to life and turn visitors into meaningful connections.",
    keywords: ["Web Design", "Development", "Responsive Experiences"],
    icon: MonitorSmartphone,
  },
  {
    title: "Branding & Identity",
    description:
      "Distinctive visual identities that capture your personality, communicate your values and make you recognisable.",
    keywords: ["Logo Design", "Visual Identity", "Brand Guidelines"],
    icon: Gem,
  },
  {
    title: "Social Media Marketing",
    description:
      "Thoughtful content and consistent storytelling that help your brand connect with the right audience.",
    keywords: ["Content Strategy", "Social Creatives", "Management"],
    icon: Share2,
  },
  {
    title: "Search Engine Optimisation",
    description:
      "Improve your online visibility and help potential customers discover your business when it matters.",
    keywords: ["SEO", "Local Search", "Website Optimisation"],
    icon: Search,
  },
  {
    title: "WhatsApp Integration",
    description:
      "Make conversations easier with seamless WhatsApp experiences that bring your business closer to customers.",
    keywords: ["Click-to-Chat", "Business Integration", "QR Codes"],
    icon: MessageCircle,
  },
  {
    title: "Google Business Profile",
    description:
      "Build a stronger local presence and make it easier for customers to find and connect with your business.",
    keywords: ["Profile Setup", "Local Visibility", "Optimisation"],
    icon: MapPin,
  },
  {
    title: "Graphics & Video Advertising",
    description:
      "Eye-catching graphics and engaging videos that communicate your message and bring campaigns to life.",
    keywords: ["Creative Design", "Promotional Videos", "Reels"],
    icon: Film,
  },
  {
    title: "Analytics & Reporting",
    description:
      "Understand your digital performance through meaningful insights, tracking and clear reporting.",
    keywords: ["Analytics", "Performance Tracking", "Reporting"],
    icon: BarChart3,
  },
];

const ease = [0.22, 1, 0.36, 1];
const pad = (n) => String(n + 1).padStart(2, "0");

/* ---------- Left: sticky arch that reflects the active service ---------- */
function ArchPreview({ active, mx, my, reduced }) {
  const Icon = services[active].icon;
  const iconX = useTransform(mx, [-0.5, 0.5], [-16, 16]);
  const iconY = useTransform(my, [-0.5, 0.5], [-16, 16]);
  const numX = useTransform(mx, [-0.5, 0.5], [10, -10]);

  return (
    <div className="flex w-full max-w-[440px] flex-col gap-6">
      {/* outer arch */}
      <div
        className="relative aspect-[4/5] w-full border border-antique-gold/40"
        style={{ borderRadius: "999px 999px 0 0", padding: 14 }}
      >
        {/* inner arch */}
        <div
          className="relative h-full w-full overflow-hidden border border-antique-gold/20"
          style={{
            borderRadius: "999px 999px 0 0",
            background:
              "radial-gradient(120% 80% at 50% 0%, rgba(167,101,112,0.45), rgba(103,45,57,0.9) 60%, #3b1a23 100%)",
          }}
        >
          {/* orbit rings */}
          <motion.svg
            viewBox="0 0 400 400"
            className="absolute left-1/2 top-[38%] h-[92%] w-[92%] -translate-x-1/2 -translate-y-1/2"
            animate={reduced ? undefined : { rotate: 360 }}
            transition={{ duration: 90, repeat: Infinity, ease: "linear" }}
            aria-hidden="true"
          >
            <circle cx="200" cy="200" r="190" fill="none" stroke="#D6B779" strokeOpacity="0.3" strokeDasharray="2 7" />
            <circle cx="200" cy="200" r="150" fill="none" stroke="#B08A57" strokeOpacity="0.25" />
            <circle cx="200" cy="10" r="4" fill="#D6B779" />
            <circle cx="350" cy="200" r="3" fill="#E8D6B5" />
          </motion.svg>

          {/* icon */}
          <motion.div
            style={{ x: iconX, y: iconY }}
            className="absolute left-1/2 top-[38%] -translate-x-1/2 -translate-y-1/2"
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={active}
                initial={{ opacity: 0, scale: 0.7, rotate: -12 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                exit={{ opacity: 0, scale: 0.8, rotate: 10 }}
                transition={{ duration: 0.45, ease }}
                className="grid h-32 w-32 place-items-center rounded-full border border-antique-gold/50 bg-deep-burgundy/60 text-light-gold backdrop-blur-sm"
              >
                <Icon size={52} strokeWidth={1} />
              </motion.div>
            </AnimatePresence>
          </motion.div>

          {/* outlined numeral */}
          <motion.div
            style={{ x: numX }}
            className="pointer-events-none absolute bottom-0 left-0 right-0 flex justify-center overflow-hidden"
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={active}
                initial={{ y: "70%", opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: "-40%", opacity: 0 }}
                transition={{ duration: 0.5, ease }}
                className="font-heading font-medium"
                style={{
                  fontSize: "clamp(6rem, 11vw, 9.5rem)",
                  lineHeight: 0.9,
                  color: "transparent",
                  WebkitTextStroke: "1px rgba(214,183,121,0.65)",
                }}
              >
                {pad(active)}
              </motion.span>
            </AnimatePresence>
          </motion.div>
        </div>
      </div>

      {/* progress */}
      <div className="flex items-center gap-4 font-body text-xs tracking-[0.2em] text-champagne/70">
        <span className="text-light-gold">{pad(active)}</span>
        <div className="relative h-px flex-1 bg-champagne/20">
          <motion.div
            className="absolute left-0 top-0 h-px bg-light-gold"
            animate={{ width: `${((active + 1) / services.length) * 100}%` }}
            transition={{ duration: 0.6, ease }}
          />
        </div>
        <span>{pad(services.length - 1)}</span>
      </div>
    </div>
  );
}

/* ---------- Right: accordion row ---------- */
function Row({ service, index, active, setActive, reduced }) {
  const isActive = active === index;

  return (
    <motion.li
      initial={reduced ? false : { opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.7, delay: 0.04 * index, ease }}
      className="relative border-t border-champagne/15"
    >
      {/* sliding gold line shared between rows */}
      {isActive && (
        <motion.span
          layoutId="service-line"
          className="absolute left-0 right-0 top-[-1px] h-px bg-light-gold"
          transition={{ duration: 0.5, ease }}
        />
      )}

      <div
        className="grid grid-cols-[2.25rem_1fr] sm:grid-cols-[3.25rem_1fr]"
        style={{ padding: "26px 0" }}
      >
        <span
          className={`font-body text-xs tracking-[0.15em] transition-colors duration-300 ${
            isActive ? "text-light-gold" : "text-champagne/40"
          }`}
          style={{ paddingTop: 12 }}
        >
          {pad(index)}
        </span>

        <div className="flex min-w-0 flex-col">
          <button
            type="button"
            id={`svc-btn-${index}`}
            aria-expanded={isActive}
            aria-controls={`svc-panel-${index}`}
            onClick={() => setActive(index)}
            onFocus={() => setActive(index)}
            onPointerEnter={(e) => e.pointerType === "mouse" && setActive(index)}
            className="group flex w-full cursor-pointer items-start justify-between gap-4 text-left focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-light-gold"
          >
            <h3
              className={`font-heading font-medium transition-all duration-500 ${
                isActive ? "translate-x-2 text-ivory" : "text-champagne/55 group-hover:text-champagne"
              }`}
              style={{ fontSize: "clamp(1.45rem, 2.6vw, 2.35rem)", lineHeight: 1.12 }}
            >
              {service.title}
            </h3>

            <span
              className={`grid h-10 w-10 shrink-0 place-items-center rounded-full border transition-all duration-500 ${
                isActive
                  ? "border-antique-gold bg-antique-gold text-deep-burgundy"
                  : "border-champagne/25 text-champagne/60"
              }`}
            >
              <ArrowUpRight
                size={17}
                className={`transition-transform duration-500 ${isActive ? "rotate-0" : "rotate-45"}`}
              />
            </span>
          </button>

          {/* expandable details */}
          <div
            id={`svc-panel-${index}`}
            role="region"
            aria-labelledby={`svc-btn-${index}`}
            className="grid transition-[grid-template-rows,opacity] duration-500 ease-out"
            style={{ gridTemplateRows: isActive ? "1fr" : "0fr", opacity: isActive ? 1 : 0 }}
          >
            <div className="min-h-0 overflow-hidden">
              <div className="flex flex-col gap-6" style={{ paddingTop: 18, paddingLeft: 8 }}>
                <p className="max-w-lg font-body text-sm text-champagne/75" style={{ lineHeight: 1.9 }}>
                  {service.description}
                </p>
                <ul className="flex flex-wrap gap-2">
                  {service.keywords.map((k) => (
                    <li
                      key={k}
                      className="rounded-full border border-antique-gold/35 font-body text-[10px] font-medium uppercase tracking-[0.14em] text-light-gold/85"
                      style={{ padding: "7px 14px" }}
                    >
                      {k}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.li>
  );
}

/* ---------- Section ---------- */
export default function Services() {
  const reduced = useReducedMotion();
  const ref = useRef(null);
  const [active, setActive] = useState(0);

  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const mx = useSpring(rawX, { stiffness: 70, damping: 18 });
  const my = useSpring(rawY, { stiffness: 70, damping: 18 });
  const px = useSpring(useMotionValue(500), { stiffness: 120, damping: 25 });
  const py = useSpring(useMotionValue(300), { stiffness: 120, damping: 25 });
  const spotlight = useMotionTemplate`radial-gradient(520px circle at ${px}px ${py}px, rgba(214,183,121,0.12), transparent 70%)`;

  const onMove = (e) => {
    const r = ref.current.getBoundingClientRect();
    const x = e.clientX - r.left;
    const y = e.clientY - r.top;
    px.set(x);
    py.set(y);
    rawX.set(x / r.width - 0.5);
    rawY.set(y / r.height - 0.5);
  };

  const reveal = (delay = 0) => ({
    initial: reduced ? false : { opacity: 0, y: 24 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.3 },
    transition: { duration: 0.8, delay, ease },
  });

  return (
    <section
      id="services"
      ref={ref}
      onMouseMove={onMove}
      className="relative isolate w-full overflow-hidden text-champagne"
      style={{
        background: "#48202A",
        padding: "clamp(88px, 11vw, 150px) clamp(20px, 6vw, 96px)",
      }}
    >
      <motion.div
        aria-hidden="true"
        style={{ background: spotlight }}
        className="pointer-events-none absolute inset-0 -z-10"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -z-10 rounded-full blur-3xl"
        style={{
          right: "-10%",
          bottom: "5%",
          width: 520,
          height: 520,
          background: "radial-gradient(circle, rgba(103,45,57,0.9), transparent 70%)",
        }}
      />

      <div className="mx-auto flex w-full flex-col" style={{ maxWidth: 1440, gap: "clamp(56px, 8vw, 110px)" }}>
        {/* Intro */}
        <div className="grid grid-cols-1 gap-10 md:grid-cols-[1.25fr_0.75fr] md:items-end md:gap-16">
          <div className="flex flex-col gap-7">
            <motion.p
              {...reveal()}
              className="flex items-center gap-4 font-body text-[10px] font-semibold tracking-[0.25em] text-light-gold"
            >
              <span className="h-px w-10 bg-antique-gold" aria-hidden="true" />
              WHAT WE BRING TO THE TABLE
            </motion.p>

            <h2
              className="font-heading font-medium tracking-tight text-ivory"
              style={{ fontSize: "clamp(2.9rem, 6.6vw, 6rem)", lineHeight: 1.03 }}
            >
              {["Everything your", "brand needs,"].map((line, i) => (
                <span key={line} className="block overflow-hidden" style={{ paddingBottom: "0.1em" }}>
                  <motion.span
                    className="block"
                    initial={reduced ? false : { y: "110%" }}
                    whileInView={{ y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: i * 0.12, ease }}
                  >
                    {line}
                  </motion.span>
                </span>
              ))}
              <span className="block italic text-light-gold">
            <motion.span
                className="block whitespace-pre-line"
                initial={reduced ? false : { y: 35, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 1, delay: 0.24, ease }}
            >
                {"Considered creativity.\nConnected expertise."}
            </motion.span>
            </span>
            </h2>
          </div>

          <motion.div {...reveal(0.15)} className="flex max-w-md flex-col gap-7 md:ml-auto">
            <p className="font-body text-sm text-champagne/75" style={{ lineHeight: 2 }}>
              A great brand is more than just a logo or a website. It's every
              interaction, every impression and every story you share. We bring
              the pieces together to create a connected brand experience.
            </p>
            <a
              href="#contact"
              className="group inline-flex w-fit items-center gap-3 border-b border-antique-gold font-body text-[10px] font-semibold tracking-[0.16em] text-light-gold transition-colors hover:text-ivory"
              style={{ paddingBottom: 8 }}
            >
              LET'S FIND YOUR STARTING POINT
              <ArrowUpRight
                size={15}
                className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              />
            </a>
          </motion.div>
        </div>

        {/* Interactive index */}
        <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <div className="hidden lg:sticky lg:top-28 lg:block">
            <ArchPreview active={active} mx={mx} my={my} reduced={reduced} />
          </div>

          <ul className="flex flex-col border-b border-champagne/15">
            {services.map((service, i) => (
              <Row
                key={service.title}
                service={service}
                index={i}
                active={active}
                setActive={setActive}
                reduced={reduced}
              />
            ))}
          </ul>
        </div>

        {/* Closing statement */}
        <motion.div
          {...reveal()}
          className="flex flex-col gap-10 border-t border-champagne/20 md:flex-row md:items-end md:justify-between"
          style={{ paddingTop: "clamp(40px, 5vw, 64px)" }}
        >
          <p
            className="max-w-3xl font-heading text-ivory"
            style={{ fontSize: "clamp(2rem, 4.2vw, 3.6rem)", lineHeight: 1.12 }}
          >
            One vision. Many possibilities.
            <span className="italic text-light-gold"> Let's make yours happen.</span>
          </p>

          <a
            href="#contact"
            className="group inline-flex min-h-12 w-fit shrink-0 items-center gap-3 rounded-full border border-antique-gold bg-antique-gold font-body text-[11px] font-semibold tracking-[0.12em] text-deep-burgundy transition-colors duration-300 hover:bg-transparent hover:text-light-gold focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-light-gold"
            style={{ paddingLeft: 32, paddingRight: 32 }}
          >
            Start a project
            <ArrowUpRight
              size={16}
              className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            />
          </a>
        </motion.div>
      </div>
    </section>
  );
}