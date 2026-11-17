
import { useEffect, useState } from "react";
import {
  motion,
  AnimatePresence,
  useReducedMotion,
} from "framer-motion";

import Logo from "../assets/images/RoseDsigns_logo.png";
import petal1 from "../assets/images/petal-1.png";
import petal2 from "../assets/images/petal-2.png";
import petal3 from "../assets/images/petal-3.png";

const PETAL_IMAGES = [petal1, petal2, petal3];
const SHOW_MS = 4200;
const ease = [0.22, 1, 0.36, 1];

const rand = (min, max) => min + Math.random() * (max - min);
const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];

function makePetals() {
  const mobile = window.innerWidth < 640;

  const frontCount = mobile ? 5 : 8;
  const backCount = mobile ? 12 : 22;

  const build = (i, layer) => {
    const front = layer === "front";
    const dir = Math.random() > 0.5 ? 1 : -1;

    return {
      id: `${layer}-${i}`,
      layer,
      src: pick(PETAL_IMAGES),
      left: rand(-4, 100),
      size: front
        ? rand(mobile ? 52 : 72, mobile ? 80 : 118)
        : rand(mobile ? 22 : 28, mobile ? 40 : 58),
      duration: front ? rand(3.2, 4.4) : rand(4.4, 6.6),
      delay: rand(0, front ? 2.2 : 1.8),
      sway: rand(40, front ? 150 : 90),
      blur: front ? 0 : rand(1, 2.6),
      opacity: front ? 1 : rand(0.6, 0.85),
      rotate: rand(-60, 60),
      spin: dir * rand(160, 420),
      flipX: dir * rand(180, 540),
      flipY: -dir * rand(120, 360),
    };
  };

  return [
    ...Array.from({ length: backCount }, (_, i) => build(i, "back")),
    ...Array.from({ length: frontCount }, (_, i) => build(i, "front")),
  ];
}

function Petal({ p }) {
  return (
    <motion.img
      src={p.src}
      alt=""
      draggable={false}
      decoding="async"
      className="pointer-events-none absolute select-none will-change-transform"
      style={{
        top: 0,
        left: `${p.left}%`,
        width: p.size,
        height: "auto",
        opacity: p.opacity,
        transformPerspective: 700,
        filter: `blur(${p.blur}px) drop-shadow(0 8px 12px rgba(0,0,0,0.35))`,
      }}
      initial={{
        y: "-25vh",
        x: 0,
        rotate: p.rotate,
        rotateX: 0,
        rotateY: 0,
      }}
      animate={{
        y: "115vh",
        x: [0, p.sway, -p.sway * 0.8, p.sway * 0.6, -p.sway * 0.3],
        rotate: p.rotate + p.spin,
        rotateX: p.flipX,
        rotateY: p.flipY,
      }}
      transition={{
        y: { duration: p.duration, delay: p.delay, ease: "linear" },
        x: { duration: p.duration, delay: p.delay, ease: "easeInOut" },
        rotate: { duration: p.duration, delay: p.delay, ease: "linear" },
        rotateX: { duration: p.duration, delay: p.delay, ease: "linear" },
        rotateY: { duration: p.duration, delay: p.delay, ease: "linear" },
      }}
    />
  );
}

export default function Preloader({ onComplete }) {
  const reduced = useReducedMotion();

  const [visible, setVisible] = useState(
    () => !sessionStorage.getItem("rosedsigns-loaded")
  );

  const [petals] = useState(() =>
    visible && !reduced ? makePetals() : []
  );

  // If already loaded in this browser session, finish immediately.
  useEffect(() => {
    if (!visible) {
      onComplete?.();
      return;
    }

    const timer = setTimeout(() => {
      sessionStorage.setItem("rosedsigns-loaded", "true");
      setVisible(false);
    }, reduced ? 1600 : SHOW_MS);

    return () => clearTimeout(timer);
  }, [visible, reduced, onComplete]);

  // Lock scrolling while preloader is visible.
  useEffect(() => {
    if (!visible) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [visible]);

  const back = petals.filter((p) => p.layer === "back");
  const front = petals.filter((p) => p.layer === "front");

  return (
    <AnimatePresence onExitComplete={onComplete}>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[99999] flex items-center justify-center overflow-hidden"
          style={{ background: "#48202A" }}
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.9, ease }}
          role="status"
          aria-label="Loading RoseDsigns"
        >
          {/* Background glow */}
          <div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(circle at center, rgba(167,101,112,0.28), transparent 65%)",
            }}
          />

          {/* Back petals */}
          {!reduced && (
            <div className="pointer-events-none absolute inset-0 overflow-hidden">
              {back.map((p) => (
                <Petal key={p.id} p={p} />
              ))}
            </div>
          )}

          {/* Logo */}
          <div className="relative z-10 flex flex-col items-center gap-10">
            <motion.img
              src={Logo}
              alt="RoseDsigns"
              className="w-64 max-w-[75vw] object-contain"
              initial={{ opacity: 0, y: 20, scale: 0.92 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{
                duration: 1.1,
                delay: reduced ? 0 : 1.2,
                ease,
              }}
            />

            {/* Progress */}
            <div className="flex flex-col items-center gap-4">
              <div className="h-px w-40 overflow-hidden bg-champagne/20">
                <motion.div
                  className="h-full origin-left bg-light-gold"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{
                    duration: reduced ? 1.2 : (SHOW_MS - 900) / 1000,
                    delay: 0.3,
                    ease: "easeInOut",
                  }}
                />
              </div>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{
                  delay: reduced ? 0.2 : 1.8,
                  duration: 0.8,
                }}
                className="font-body text-[9px] tracking-[0.35em] text-champagne/70"
              >
                CREATING SOMETHING BEAUTIFUL
              </motion.p>
            </div>
          </div>

          {/* Front petals */}
          {!reduced && (
            <div className="pointer-events-none absolute inset-0 z-20 overflow-hidden">
              {front.map((p) => (
                <Petal key={p.id} p={p} />
              ))}
            </div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
