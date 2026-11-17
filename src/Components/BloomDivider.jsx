
import { useState } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useReducedMotion,
} from "framer-motion";
import { ArrowDown, Plus } from "lucide-react";

const words = [
  "PURPOSE",
  "PERSONALITY",
  "PRESENCE",
  "POSSIBILITY",
];

const ease = [0.22, 1, 0.36, 1];

export default function BloomDivider() {
  const [revealed, setRevealed] = useState(false);
  const reduced = useReducedMotion();

  // Pointer-responsive movement
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);

  const smoothX = useSpring(pointerX, {
    stiffness: 80,
    damping: 20,
  });

  const smoothY = useSpring(pointerY, {
    stiffness: 80,
    damping: 20,
  });

  const rotateX = useTransform(smoothY, [-0.5, 0.5], [10, -10]);
  const rotateY = useTransform(smoothX, [-0.5, 0.5], [-10, 10]);

  const handlePointerMove = (event) => {
    if (event.pointerType === "touch") return;

    const bounds = event.currentTarget.getBoundingClientRect();

    pointerX.set(
      (event.clientX - bounds.left) / bounds.width - 0.5
    );

    pointerY.set(
      (event.clientY - bounds.top) / bounds.height - 0.5
    );
  };

  const handlePointerLeave = () => {
    pointerX.set(0);
    pointerY.set(0);
  };

  return (
    <section
      className="relative w-full overflow-hidden bg-dusty-blush px-5 py-24 sm:px-8 md:py-32 lg:px-[7%]"
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
    >
      {/* Background decoration */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-30"
        style={{
          backgroundImage:
            "radial-gradient(var(--color-antique-rose) 0.7px, transparent 0.7px)",
          backgroundSize: "22px 22px",
        }}
      />

      <div className="relative mx-auto max-w-[1440px]">

        {/* Top label */}
        <div className="mb-12 flex items-center justify-between gap-4 md:mb-16">
          <span className="font-body text-[9px] font-semibold tracking-[0.25em] text-deep-burgundy">
            A THOUGHT BEHIND EVERY CREATION
          </span>

          <span className="font-body text-[9px] tracking-[0.2em] text-deep-burgundy/60">
            R — 001
          </span>
        </div>

        {/* Main interactive composition */}
        <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-[1fr_0.9fr] md:gap-8 lg:gap-20">

          {/* Left content */}
          <div className="order-2 md:order-1">

            <motion.p
              initial={reduced ? false : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease }}
              className="mb-6 font-body text-[10px] font-semibold tracking-[0.22em] text-antique-rose"
            >
              MORE THAN JUST DESIGN
            </motion.p>

            <motion.h2
              initial={reduced ? false : { opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, ease }}
              className="font-heading text-5xl font-medium leading-[1.02] tracking-tight text-deep-burgundy sm:text-6xl lg:text-7xl"
            >
              Every brand
              <br />
              has a story.
              <br />
              <span className="italic text-antique-rose">
                Make yours bloom.
              </span>
            </motion.h2>

            <p className="mt-7 max-w-md font-body text-sm leading-8 text-deep-burgundy/75">
              Behind every memorable brand is an idea worth believing in.
              We help bring that idea to life with intention, imagination
              and a little bit of magic.
            </p>

            {/* Interactive reveal */}
            <div className="mt-9">
              <button
                type="button"
                onClick={() => setRevealed((value) => !value)}
                aria-expanded={revealed}
                className="group inline-flex min-h-12 items-center gap-4 border border-deep-burgundy px-6 py-3 font-body text-[10px] font-semibold tracking-[0.16em] text-deep-burgundy transition-colors duration-300 hover:bg-deep-burgundy hover:text-champagne"
              >
                {revealed ? "CLOSE THE THOUGHT" : "REVEAL THE THOUGHT"}

                <motion.span
                  animate={{ rotate: revealed ? 45 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <Plus size={17} />
                </motion.span>
              </button>

              <motion.div
                initial={false}
                animate={{
                  height: revealed ? "auto" : 0,
                  opacity: revealed ? 1 : 0,
                  marginTop: revealed ? 20 : 0,
                }}
                transition={{ duration: 0.5, ease }}
                className="overflow-hidden"
              >
                <p className="max-w-md border-l-2 border-antique-gold py-2 pl-5 font-heading text-2xl italic leading-snug text-deep-burgundy">
                  "Good design gets noticed.
                  Great design gets remembered."
                </p>
              </motion.div>
            </div>
          </div>

          {/* Right interactive rose */}
          <div className="order-1 flex items-center justify-center md:order-2">

            <motion.div
              style={
                reduced
                  ? {}
                  : {
                      rotateX,
                      rotateY,
                      transformPerspective: 1000,
                    }
              }
              className="relative aspect-square w-full max-w-[420px]"
            >

              {/* Outer orbit */}
              <motion.div
                animate={reduced ? undefined : { rotate: 360 }}
                transition={{
                  duration: 55,
                  repeat: Infinity,
                  ease: "linear",
                }}
                className="absolute inset-0 rounded-full border border-antique-rose/50"
              >
                <span className="absolute left-1/2 top-0 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rotate-45 bg-antique-gold" />
                <span className="absolute bottom-0 left-1/2 h-3 w-3 -translate-x-1/2 translate-y-1/2 rotate-45 bg-antique-gold" />
              </motion.div>

              {/* Inner orbit */}
              <motion.div
                animate={reduced ? undefined : { rotate: -360 }}
                transition={{
                  duration: 38,
                  repeat: Infinity,
                  ease: "linear",
                }}
                className="absolute inset-[9%] rounded-full border border-dashed border-antique-rose/50"
              />

              {/* Rose petals */}
              <motion.div
                animate={
                  reduced
                    ? undefined
                    : {
                        rotate: [0, 4, 0, -4, 0],
                        scale: [1, 1.025, 1],
                      }
                }
                transition={{
                  duration: 9,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute inset-[16%]"
              >
                <svg
                  viewBox="0 0 300 300"
                  className="h-full w-full"
                  role="img"
                  aria-label="Decorative blooming rose emblem"
                >
                  <defs>
                    <radialGradient id="bloomGradient">
                      <stop
                        offset="0%"
                        stopColor="var(--color-champagne)"
                      />
                      <stop
                        offset="100%"
                        stopColor="var(--color-antique-rose)"
                        stopOpacity="0.55"
                      />
                    </radialGradient>
                  </defs>

                  {Array.from({ length: 12 }).map((_, index) => (
                    <ellipse
                      key={index}
                      cx="150"
                      cy="90"
                      rx="28"
                      ry="70"
                      fill="url(#bloomGradient)"
                      fillOpacity="0.8"
                      stroke="var(--color-antique-rose)"
                      strokeWidth="0.8"
                      transform={`rotate(${index * 30} 150 150)`}
                    />
                  ))}

                  {Array.from({ length: 8 }).map((_, index) => (
                    <ellipse
                      key={`inner-${index}`}
                      cx="150"
                      cy="117"
                      rx="18"
                      ry="43"
                      fill="var(--color-antique-rose)"
                      fillOpacity="0.4"
                      transform={`rotate(${index * 45} 150 150)`}
                    />
                  ))}

                  <circle
                    cx="150"
                    cy="150"
                    r="13"
                    fill="var(--color-deep-burgundy)"
                  />

                  <circle
                    cx="150"
                    cy="150"
                    r="5"
                    fill="var(--color-light-gold)"
                  />
                </svg>
              </motion.div>

              {/* Centre label */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <span className="font-heading text-sm italic text-deep-burgundy">
                  RoseDsigns
                </span>
              </div>

              {/* Floating decorative dots */}
              <span className="absolute left-[13%] top-[35%] h-2 w-2 rounded-full bg-antique-gold" />
              <span className="absolute right-[10%] top-[65%] h-2 w-2 rounded-full bg-antique-rose" />
              <span className="absolute bottom-[12%] left-[35%] h-1.5 w-1.5 rounded-full bg-deep-burgundy/50" />

            </motion.div>
          </div>
        </div>

        {/* Bottom marquee */}
        <div className="mt-20 overflow-hidden border-y border-deep-burgundy/20 py-5 md:mt-28">
          <motion.div
            animate={reduced ? undefined : { x: ["0%", "-50%"] }}
            transition={{
              duration: 30,
              repeat: Infinity,
              ease: "linear",
            }}
            className="flex w-max items-center gap-10"
          >
            {[...words, ...words, ...words, ...words].map((word, index) => (
              <span
                key={index}
                className="flex items-center gap-10 font-heading text-xl italic text-deep-burgundy/80 md:text-2xl"
              >
                {word}
                <span className="h-2 w-2 rotate-45 bg-antique-gold" />
              </span>
            ))}
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <div className="mt-8 flex items-center justify-center gap-3">
          <span className="font-body text-[9px] tracking-[0.2em] text-deep-burgundy/60">
            KEEP EXPLORING
          </span>
          <ArrowDown size={14} className="text-deep-burgundy" />
        </div>

      </div>
    </section>
  );
}
