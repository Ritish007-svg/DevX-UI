import { useEffect, useMemo, useRef } from "react";
import {
  motion,
  animate,
  useMotionValue,
  useTransform,
  useReducedMotion,
} from "framer-motion";
import HeroCard from "./HeroCard";

/* ---------- Tweak these ---------- */
const CARD_W = 280;          // must match HeroCard w-70  (70 * 4px)
const CARD_H = 380;          // must match HeroCard h-95  (95 * 4px)
const SPACING = 310;         // px between card centers
const TILT = 9;              // degrees of rotateY per card from center
const DEPTH = 30;            // how strongly outer cards come forward
const SECONDS_PER_CARD = 1.4;  // lower = faster
const MIN_ITEMS = 12;        // repeat cards until the loop is at least this long
/* --------------------------------- */

// Wraps v into the range [min, max)
const wrap = (min, max, v) => {
  const range = max - min;
  return ((((v - min) % range) + range) % range) + min;
};

// function CarouselItem({ card, index, total, progress }) {
function CarouselItem({ card, index, total, progress, onPause, onResume }) {
  // Signed distance from center: 0 = center, negative = left, positive = right
  const pos = useTransform(progress, (p) =>
    wrap(-total / 2, total / 2, index - p)
  );

  const x = useTransform(pos, (v) => v * SPACING);
  const rotateY = useTransform(pos, (v) => -v * TILT);
  const z = useTransform(pos, (v) => v * v * DEPTH);

  // Fade at the far edges so the wrap-around jump is never visible
  const opacity = useTransform(
    pos,
    [-total / 2, -total / 2 + 1.5, total / 2 - 1.5, total / 2],
    [0, 1, 1, 0]
  );

   return (
    <motion.div
      // CHANGED: added cursor-pointer so the cursor becomes a hand over a card (Step 3)
      className="absolute cursor-pointer"
      style={{
        left: "50%",
        top: "50%",
        marginLeft: -CARD_W / 2,
        marginTop: -CARD_H / 2,
        x,
        z,
        rotateY,
        opacity,
      }}
      // NEW: while the mouse is over this card, it is "in the hover state"
      // and the inner wrapper below can react to that
      whileHover="hover"
      // NEW: pause the carousel when the mouse enters this card
      onHoverStart={onPause}
      // NEW: start the carousel again when the mouse leaves this card
      onHoverEnd={onResume}
    >
      {/* NEW: inner wrapper that does the lifting. The outer box stays still,
          so the card never flickers when the mouse is near its bottom edge */}
      <motion.div
        // NEW: when the parent is in the "hover" state, move up 24px
        variants={{ hover: { y: -24 } }}
        // NEW: spring motion, so the lift feels smooth and natural
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      >
        <HeroCard {...card} />
      </motion.div>
    </motion.div>
  );
}

function HeroCarousel({ cards }) {
  const reduceMotion = useReducedMotion();
  const progress = useMotionValue(0);
  const controlsRef = useRef(null);

  // Repeat the cards so the loop is long enough for wide screens
  const items = useMemo(() => {
    const reps = Math.max(1, Math.ceil(MIN_ITEMS / cards.length));
    return Array.from(
      { length: cards.length * reps },
      (_, i) => cards[i % cards.length]
    );
  }, [cards]);

  const total = items.length;

  useEffect(() => {
    if (reduceMotion) return;
    // progress: 0 -> total, then loops. Frame 0 and frame `total` look identical.
    controlsRef.current = animate(progress, total, {
      duration: total * SECONDS_PER_CARD,
      ease: "linear",
      repeat: Infinity,
      repeatType: "loop",
    });
    return () => controlsRef.current?.stop();
  }, [total, progress, reduceMotion]);

  // NEW: pauses the carousel animation (called when the mouse enters a card)
const pause = () => controlsRef.current?.pause();

// NEW: resumes the animation (called when the mouse leaves a card)
const resume = () => controlsRef.current?.play();
  return (
  <motion.div
  className="relative w-full overflow-x-clip "
  style={{ height: CARD_H * 1.4, perspective: 1200 }}
  // CHANGED: removed the onHoverStart / onHoverEnd that were here,
  // so the strip no longer pauses when the mouse is on empty space
>
  {items.map((card, index) => (
    <CarouselItem
      key={index}
      card={card}
      index={index}
      total={total}
      progress={progress}
      // NEW: hand the pause function down to each card
      onPause={pause}
      // NEW: hand the resume function down to each card
      onResume={resume}
    />
  ))}
</motion.div>
  );
}

export default HeroCarousel;