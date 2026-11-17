import { useRef, useState } from "react";
import {
  motion,
  useScroll,
  useVelocity,
  useSpring,
  useTransform,
  useMotionValue,
  useMotionTemplate,
  useAnimationFrame,
  useReducedMotion,
} from "framer-motion";
import { ArrowUpRight } from "lucide-react";

/*
  Gold divider between Services (deep burgundy) and Contact (ivory).
  Spacing is set inline so it survives a global `* { margin:0; padding:0 }` reset.
*/

const ease = [0.22, 1, 0.36, 1];
const wrap = (min, max, v) => {
  const range = max - min;
  return ((((v - min) % range) + range) % range) + min;
};

/* Scalloped edge: repeating arches echo the arch frames used elsewhere */
function Scallop({ id, color, position }) {
  const top = position === "top";
  return (
    <svg
      aria-hidden="true"
      width="100%"
      height="40"
      className="pointer-events-none absolute left-0 z-10 block"
      style={{ [top ? "top" : "bottom"]: -1 }}
    >
      <defs>
        <pattern id={id} width="80" height="40" patternUnits="userSpaceOnUse">
          <path
            d={top ? "M0,0 A40,40 0 0 0 80,0 Z" : "M0,40 A40,40 0 0 1 80,40 Z"}
            fill={color}
          />
        </pattern>
      </defs>
      <rect width="100%" height="40" fill={`url(#${id})`} />
    </svg>
  );
}

function Rosette({ size }) {
  return (
    <motion.svg
      viewBox="0 0 100 100"
      width={size}
      height={size}
      className="shrink-0"
      animate={{ rotate: 360 }}
      transition={{ duration: 24, repeat: Infinity, ease: "linear" }}
      aria-hidden="true"
    >
      {Array.from({ length: 8 }).map((_, i) => (
        <ellipse
          key={i}
          cx="50"
          cy="26"
          rx="9"
          ry="24"
          fill="none"
          stroke="#48202A"
          strokeWidth="1.6"
          transform={`rotate(${i * 45} 50 50)`}
        />
      ))}
      <circle cx="50" cy="50" r="3.5" fill="#48202A" />
    </motion.svg>
  );
}

/* One infinite row. Speed follows scroll velocity; hovering slows it to a crawl. */
function TextRow({ text, direction, base, outlined, velocityFactor, reduced }) {
  const pos = useRef(0);
  const x = useMotionValue(0);
  const slow = useSpring(1, { stiffness: 80, damping: 20 });
  const [hovered, setHovered] = useState(false);
  const xPct = useTransform(x, (v) => `${v}%`);

  useAnimationFrame((_, delta) => {
    if (reduced) return;
    let move = direction * base * slow.get() * (delta / 1000);
    move += move * velocityFactor.get();
    pos.current += move;
    x.set(wrap(-25, 0, pos.current));
  });

  const gap = "clamp(24px, 3.5vw, 56px)";

  return (
    <div
      className="overflow-hidden"
      onPointerEnter={() => {
        slow.set(0.1);
        setHovered(true);
      }}
      onPointerLeave={() => {
        slow.set(1);
        setHovered(false);
      }}
    >
      <motion.div style={{ x: xPct }} className="flex w-max whitespace-nowrap">
        {[0, 1, 2, 3].map((n) => (
          <span key={n} className="flex items-center" style={{ gap, paddingRight: gap }}>
            <span
              className={`font-heading ${outlined ? "italic" : "font-medium"} transition-colors duration-500`}
              style={{
                fontSize: "clamp(3.4rem, 11vw, 10rem)",
                lineHeight: 1.08,
                color: outlined && !hovered ? "transparent" : "#48202A",
                WebkitTextStroke: outlined ? "1.5px #48202A" : "0",
              }}
            >
              {text}
            </span>
            <Rosette size={64} />
          </span>
        ))}
      </motion.div>
    </div>
  );
}

export default function Divider() {
  const reduced = useReducedMotion();
  const ref = useRef(null);

  // scroll velocity drives row speed and a slight skew
  const { scrollY } = useScroll();
  const velocity = useVelocity(scrollY);
  const smooth = useSpring(velocity, { damping: 50, stiffness: 400 });
  const velocityFactor = useTransform(smooth, [0, 1000], [0, 4], { clamp: false });
  const skew = useTransform(smooth, [-2000, 2000], [-7, 7], { clamp: true });

  // cursor light + badge follow
  const px = useSpring(useMotionValue(600), { stiffness: 120, damping: 25 });
  const py = useSpring(useMotionValue(200), { stiffness: 120, damping: 25 });
  const light = useMotionTemplate`radial-gradient(420px circle at ${px}px ${py}px, rgba(255,246,222,0.55), transparent 70%)`;
  const bx = useSpring(useMotionValue(0), { stiffness: 140, damping: 16 });
  const by = useSpring(useMotionValue(0), { stiffness: 140, damping: 16 });

  const onMove = (e) => {
    const r = ref.current.getBoundingClientRect();
    px.set(e.clientX - r.left);
    py.set(e.clientY - r.top);
    bx.set((e.clientX - (r.left + r.width / 2)) * 0.18);
    by.set((e.clientY - (r.top + r.height / 2)) * 0.18);
  };
  const onLeave = () => {
    bx.set(0);
    by.set(0);
  };

  return (
    <section
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      aria-label="Let's create something timeless"
      className="relative isolate overflow-hidden"
      style={{
        background:
          "linear-gradient(135deg, #B08A57 0%, #D6B779 45%, #C49F66 70%, #B08A57 100%)",
        padding: "clamp(88px, 11vw, 150px) 0",
      }}
    >
      <Scallop id="scallop-top" color="#48202A" position="top" />
      <Scallop id="scallop-bottom" color="#F7F3EC" position="bottom" />

      {/* cursor light */}
      <motion.div
        aria-hidden="true"
        style={{ background: light }}
        className="pointer-events-none absolute inset-0 -z-10"
      />

      {/* slow shimmer sweep */}
      {!reduced && (
        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 -z-10 w-1/4"
          style={{
            background:
              "linear-gradient(100deg, transparent, rgba(255,246,222,0.45), transparent)",
          }}
          initial={{ x: "-120%" }}
          animate={{ x: "480%" }}
          transition={{ duration: 3.2, repeat: Infinity, repeatDelay: 5, ease: "easeInOut" }}
        />
      )}

      {/* kinetic rows */}
      <motion.div
        style={{ skewX: reduced ? 0 : skew }}
        initial={reduced ? false : { opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 1, ease }}
        className="flex flex-col"
        /* gap between the two rows */
      >
        <TextRow
          text="Let's create something timeless"
          direction={-1}
          base={2.2}
          velocityFactor={velocityFactor}
          reduced={reduced}
        />
        <div style={{ height: 8 }} />
        <TextRow
          text="Brands made to be kept"
          direction={1}
          base={2.2}
          outlined
          velocityFactor={velocityFactor}
          reduced={reduced}
        />
      </motion.div>

      {/* floating badge that leans toward the cursor */}
      <div className="pointer-events-none absolute inset-0 grid place-items-center">
        <motion.a
          href="#contact"
          aria-label="Let's talk, go to contact"
          style={{ x: bx, y: by }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.96 }}
          className="group pointer-events-auto relative grid place-items-center rounded-full border border-antique-gold bg-ivory text-deep-burgundy shadow-[0_20px_60px_rgba(72,32,42,0.35)] transition-colors duration-500 hover:bg-deep-burgundy hover:text-light-gold focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-deep-burgundy"
          initial={reduced ? false : { opacity: 0, scale: 0.6 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, delay: 0.3, ease }}
        >
          <span style={{ width: "clamp(118px, 13vw, 168px)", height: "clamp(118px, 13vw, 168px)" }} className="grid place-items-center">
            <motion.svg
              viewBox="0 0 200 200"
              className="absolute inset-0 h-full w-full"
              animate={reduced ? undefined : { rotate: 360 }}
              transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
              aria-hidden="true"
            >
              <defs>
                <path id="badge-ring" d="M100,100 m-76,0 a76,76 0 1,1 152,0 a76,76 0 1,1 -152,0" />
              </defs>
              <text fill="currentColor" fontSize="14" fontWeight="600" letterSpacing="4.4" fontFamily="Inter, sans-serif">
                <textPath href="#badge-ring" textLength="470" lengthAdjust="spacing">
                  LET'S TALK · LET'S TALK · LET'S TALK ·
                </textPath>
              </text>
            </motion.svg>
            <ArrowUpRight
              size={34}
              strokeWidth={1.4}
              className="transition-transform duration-500 group-hover:-translate-y-1 group-hover:translate-x-1"
            />
          </span>
        </motion.a>
      </div>
    </section>
  );
}