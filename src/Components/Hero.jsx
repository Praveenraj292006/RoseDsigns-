import { useEffect, useRef, useState } from "react";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useSpring,
  useTransform,
  useMotionTemplate,
  useReducedMotion,
} from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Logo from '../assets/images/RoseDsigns_logo.png'

/*
  NOTE: critical spacing (padding / margin / max-width) is set with inline
  styles and flex `gap`, so the layout stays correct even if a global
  `* { margin: 0; padding: 0 }` reset is still in your CSS.
*/

const phrases = [
  "make lasting impressions.",
  "tell your story.",
  "stand out beautifully.",
  "inspire connection.",
];

const services = [
  "Branding",
  "Websites",
  "Content",
  "Digital Marketing",
  "Brands That Bloom",
];

const ease = [0.22, 1, 0.36, 1];

/* ---------- Magnetic button ---------- */
function Magnetic({ children, className = "", href }) {
  const x = useSpring(useMotionValue(0), { stiffness: 220, damping: 18 });
  const y = useSpring(useMotionValue(0), { stiffness: 220, damping: 18 });

  const onMove = (e) => {
    const r = e.currentTarget.getBoundingClientRect();
    x.set((e.clientX - (r.left + r.width / 2)) * 0.25);
    y.set((e.clientY - (r.top + r.height / 2)) * 0.35);
  };
  const reset = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.a
      href={href}
      style={{ x, y, paddingLeft: 32, paddingRight: 32 }}
      onMouseMove={onMove}
      onMouseLeave={reset}
      className={className}
    >
      {children}
    </motion.a>
  );
}



/* ---------- Rose ----------
   viewBox is 500x500, centre (250,250).
   A petal's tip reaches 2*ry from the centre, so the largest ring
   reaches 190 and the text ring (r=224) sits safely outside it.   */
const C = 250;
const rings = [
  { count: 8, rx: 36, ry: 95, depth: 1, fill: 0.38, stroke: "#B08A57" },
  { count: 10, rx: 29, ry: 76, depth: -1.6, fill: 0.5, stroke: "#D6B779" },
  { count: 12, rx: 22, ry: 54, depth: 2.4, fill: 0.7, stroke: "#E8D6B5" },
  { count: 8, rx: 15, ry: 32, depth: -3.2, fill: 0.9, stroke: "#F7F3EC" },
];

function Petals({ ring, mx, reduced, order }) {
  const rotate = useTransform(mx, [-0.5, 0.5], [-14 * ring.depth, 14 * ring.depth]);

  return (
    <motion.g
      style={{ rotate: reduced ? 0 : rotate, originX: 0.5, originY: 0.5 }}
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1.5, delay: 0.2 + order * 0.15, ease }}
    >
      {Array.from({ length: ring.count }).map((_, k) => (
        <ellipse
          key={k}
          cx={C}
          cy={C - ring.ry}
          rx={ring.rx}
          ry={ring.ry}
          fill="url(#petal)"
          fillOpacity={ring.fill}
          stroke={ring.stroke}
          strokeOpacity="0.6"
          strokeWidth="0.9"
          transform={`rotate(${(360 / ring.count) * k} ${C} ${C})`}
        />
      ))}
    </motion.g>
  );
}

function Rose({ mx, my, reduced }) {
  const scale = useTransform(my, [-0.5, 0.5], [1.03, 0.97]);
  const rotateX = useTransform(my, [-0.5, 0.5], [7, -7]);
  const rotateY = useTransform(mx, [-0.5, 0.5], [-7, 7]);
  const label = "Identity · Web · Packaging · Campaigns · ";

  return (
    <motion.div
      style={{ scale, rotateX, rotateY, transformPerspective: 1000 }}
      className="relative mx-auto aspect-square w-full"
    >
      {/* glow */}
      <div
        aria-hidden="true"
        className="absolute rounded-full blur-3xl"
        style={{
          inset: "10%",
          background:
            "radial-gradient(circle, rgba(167,101,112,0.6), rgba(103,45,57,0) 70%)",
        }}
      />

      {/* faint orbit lines */}
      <svg viewBox="0 0 500 500" className="absolute inset-0 h-full w-full overflow-visible" aria-hidden="true">
        <circle cx={C} cy={C} r="238" fill="none" stroke="#B08A57" strokeOpacity="0.25" />
        <circle cx={C} cy={C} r="205" fill="none" stroke="#B08A57" strokeOpacity="0.12" strokeDasharray="2 6" />
      </svg>

      {/* rotating text ring */}
      <motion.svg
        viewBox="0 0 500 500"
        className="absolute inset-0 h-full w-full overflow-visible"
        animate={reduced ? undefined : { rotate: 360 }}
        transition={{ duration: 70, repeat: Infinity, ease: "linear" }}
        aria-hidden="true"
      >
        <defs>
          <path id="ring" d={`M${C},${C} m-222,0 a222,222 0 1,1 444,0 a222,222 0 1,1 -444,0`} />
        </defs>
        <text fill="#D6B779" fillOpacity="0.85" fontSize="11.5" fontFamily="Inter, sans-serif">
          <textPath href="#ring" textLength="1385" lengthAdjust="spacing">
            {label.repeat(3)}
          </textPath>
        </text>
      </motion.svg>

      {/* petals */}
      <svg
        viewBox="0 0 500 500"
        className="absolute inset-0 h-full w-full overflow-visible"
        role="img"
        aria-label="Rosedsigns rose emblem"
      >
        <defs>
          <radialGradient id="petal" cx="50%" cy="0%" r="100%">
            <stop offset="0%" stopColor="#D9B1AE" stopOpacity="0.95" />
            <stop offset="100%" stopColor="#A76570" stopOpacity="0.18" />
          </radialGradient>
        </defs>

        {rings.map((ring, i) => (
          <Petals key={i} ring={ring} mx={mx} reduced={reduced} order={i} />
        ))}

        <circle cx={C} cy={C} r="5" fill="#F7F3EC" />
        <circle cx={C} cy={C} r="15" fill="none" stroke="#D6B779" strokeOpacity="0.75" />
      </svg>
    </motion.div>
  );
}

/* ---------- Hero ---------- */
export default function Hero({ isLoaded }) {
  const reduced = useReducedMotion();
  const ref = useRef(null);
  const [index, setIndex] = useState(0);

  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const mx = useSpring(rawX, { stiffness: 70, damping: 18 });
  const my = useSpring(rawY, { stiffness: 70, damping: 18 });

  const px = useSpring(useMotionValue(700), { stiffness: 120, damping: 25 });
  const py = useSpring(useMotionValue(350), { stiffness: 120, damping: 25 });
  const spotlight = useMotionTemplate`radial-gradient(560px circle at ${px}px ${py}px, rgba(214,183,121,0.15), transparent 70%)`;

  const onMove = (e) => {
    const r = ref.current.getBoundingClientRect();
    const x = e.clientX - r.left;
    const y = e.clientY - r.top;
    px.set(x);
    py.set(y);
    rawX.set(x / r.width - 0.5);
    rawY.set(y / r.height - 0.5);
  };

  useEffect(() => {
    if (reduced) return;
    const t = setInterval(() => setIndex((i) => (i + 1) % phrases.length), 3200);
    return () => clearInterval(t);
  }, [reduced]);

  return (
    <section
      id="home"
      ref={ref}
      onMouseMove={onMove}
      className="relative isolate flex flex-col overflow-hidden text-champagne"
      style={{
        minHeight: "100svh",
        background: "linear-gradient(180deg, #672D39 0%, #55252F 55%, #48202A 100%)",
      }}
    >
        {/* Decorative cropped D logo */}
        <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-24 top-1/2 z-0 h-[600px] w-[420px] -translate-y-1/2 overflow-hidden opacity-[0.13] md:-left-32 md:h-[750px] md:w-[520px]"
        >
        <img
            src={Logo}
            alt=""
            className="absolute left-[-90px] top-[-35px] w-[650px] max-w-none"
        />
        </div>
      {/* cursor spotlight */}
      <motion.div
        aria-hidden="true"
        style={{ background: spotlight }}
        className="pointer-events-none absolute inset-0 -z-10"
      />

      {/* Main content */}
      <div
        className="grid w-full flex-1 items-center gap-10 lg:grid-cols-[1fr_0.9fr] lg:gap-10"
        style={{
          maxWidth: 1440,
          marginLeft: "auto",
          marginRight: "auto",
          padding: "120px 1% 50px",
        }}
      >
        {/* Copy */}
        <div className="flex flex-col gap-9">
          <h1
            className="font-heading font-medium tracking-[-0.02em] text-ivory"
            style={{ fontSize: "clamp(2.7rem, 6.2vw, 5.8rem)", lineHeight: 1.02 }}
          >
            {["We design", "brands that"].map((line, i) => (
              <span key={line} className="block overflow-hidden" style={{ paddingBottom: "0.1em" }}>
                <motion.span
                  className="block"
                 initial={{ y: "110%" }}
                 animate={{ y: isLoaded ? 0 : "110%" }}
                  transition={{ duration: 1, delay: 0.15 + i * 0.12, ease }}
                >
                  {line}
                </motion.span>
              </span>
            ))}

            <span className="relative block overflow-hidden italic text-light-gold" style={{ height: "1.2em" }}>
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={phrases[index]}
                  className="absolute left-0 top-0 block whitespace-nowrap"
                  initial={{ y: "100%", opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: "-100%", opacity: 0 }}
                  transition={{ duration: 0.7, ease }}
                >
                  {phrases[index]}
                </motion.span>
              </AnimatePresence>
            </span>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={
            isLoaded
                ? { opacity: 1, y: 0 }
                : { opacity: 0, y: 16 }
            }
            transition={{ duration: 0.9, delay: 0.7, ease }}
            className="max-w-[34rem] font-body text-[15px] font-light text-champagne/80 md:text-base"
            style={{ lineHeight: 1.8 }}
          >
            Distinctive identities. Considered websites. Stories that connect.

            We shape a presence that feels unmistakably yours — bringing strategy, creativity and digital expertise together to help your business stand out.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={
            isLoaded
                ? { opacity: 1, y: 0 }
                : { opacity: 0, y: 16 }
            }
            transition={{ duration: 0.9, delay: 0.85, ease }}
            className="flex flex-wrap items-center gap-4"
          >
            <Magnetic
              href="#contact"
              className="group inline-flex min-h-12 items-center gap-3 rounded-full border border-antique-gold bg-antique-gold font-body text-[11px] font-semibold tracking-[0.12em] text-deep-burgundy transition-colors duration-300 hover:bg-transparent hover:text-light-gold focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-light-gold"
            >
              Let's Talk
              <ArrowUpRight
                size={16}
                className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              />
            </Magnetic>

            <Magnetic
              href="#work"
              className="inline-flex min-h-12 items-center rounded-full border border-champagne/30 font-body text-[11px] font-medium tracking-[0.12em] text-champagne transition-colors duration-300 hover:border-light-gold hover:text-light-gold focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-light-gold"
            >
              Discover Our Work
            </Magnetic>
          </motion.div>

          <motion.dl
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.1 }}
            className="flex max-w-[34rem] gap-10 border-t border-antique-gold/25"
            style={{ paddingTop: 24 }}
          >
            {[
              ["120+", "brands launched"],
              ["9 yrs", "in practice"],
              ["94%", "clients return"],
            ].map(([value, label]) => (
              <div key={label} className="flex flex-col gap-1">
                <dt className="font-heading text-3xl font-semibold text-ivory">{value}</dt>
                <dd className="font-body text-xs text-champagne/60">{label}</dd>
              </div>
            ))}
          </motion.dl>
        </div>

        {/* Rose, larger and allowed to bleed slightly past the column on desktop */}
        <div className="w-full lg:scale-[1.12] lg:origin-center">
        {isLoaded && (
            <Rose mx={mx} my={my} reduced={reduced} />
        )}
        </div>
      </div>

      {/* Services marquee (in normal flow, so it never overlaps content) */}
      <div
        className="overflow-hidden border-t border-antique-gold/25 bg-deep-burgundy/60 backdrop-blur-sm"
        style={{ paddingTop: 20, paddingBottom: 20 }}
      >
        <motion.div
          className="flex w-max gap-12 whitespace-nowrap"
          animate={reduced ? undefined : { x: ["0%", "-50%"] }}
          transition={{ duration: 36, repeat: Infinity, ease: "linear" }}
        >
          {[...services, ...services, ...services, ...services].map((s, i) => (
            <span key={i} className="flex items-center gap-12 font-heading text-xl italic text-champagne/80">
              {s}
              <span className="h-1.5 w-1.5 rotate-45 bg-antique-gold" aria-hidden="true" />
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}