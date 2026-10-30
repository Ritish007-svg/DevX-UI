import { motion, useMotionValue, useTransform, animate } from "framer-motion";

const THRESHOLD = 120;

// 0 = front card, 1 = next card (right, faded), 2 = the one after
const SLOTS = [
  { x: 0, scale: 1, opacity: 1 },
  { x: 400, scale: 0.85, opacity: 0.4 },
  { x: 750, scale: 0.72, opacity: 0.2 },
];

const variants = {
  exit: (dir) => ({
    x: dir === "interested" ? -650 : 650,
    rotate: dir === "interested" ? -20 : 20,
    opacity: 0,
    transition: { duration: 0.35, ease: "easeIn" },
  }),
};

const SwipeableCard = ({ pos, exitDir, onSwipe, dragX, children }) => {
  const isTop = pos === 0;

  const x = useMotionValue(0);
  const rotate = useTransform(x, [-250, 250], [-14, 14]);
  const interestedOpacity = useTransform(x, [-140, -30], [1, 0]);
  const ignoreOpacity = useTransform(x, [30, 140], [0, 1]);

  const handleDrag = (_, info) => {
    if (isTop) dragX?.set(info.offset.x);
  };

  const handleDragEnd = (_, info) => {
    const { offset, velocity } = info;
    dragX?.set(0); // reset the side glow

    if (offset.x < -THRESHOLD || velocity.x < -500) {
      onSwipe("interested");
    } else if (offset.x > THRESHOLD || velocity.x > 500) {
      onSwipe("ignored");
    } else {
      animate(x, 0, { type: "spring", stiffness: 400, damping: 30 });
    }
  };

  return (
    // OUTER: slot position (slide / scale / fade) + exit animation
    <motion.div
      className="absolute inset-0"
      style={{ zIndex: 3 - pos, pointerEvents: isTop ? "auto" : "none" }}
      initial={{ x: SLOTS[2].x + 300, scale: 0.6, opacity: 0 }}
      animate={{
        ...SLOTS[pos],
        transition: { type: "spring", stiffness: 220, damping: 26 },
      }}
      variants={variants}
      exit="exit"
      custom={exitDir}
    >
      {/* INNER: drag + tilt + stamps */}
      <motion.div
        className="h-full w-full select-none"
        style={{
          x,
          rotate,
          touchAction: "pan-y",
          cursor: isTop ? "grab" : "default",
        }}
        drag={isTop ? "x" : false}
        dragElastic={0.8}
        dragMomentum={false}
        onDrag={handleDrag}
        onDragEnd={handleDragEnd}
      >
        {children}

        {isTop && (
          <>
            <motion.div
              style={{ opacity: interestedOpacity }}
              className="pointer-events-none absolute right-6 top-8 rotate-12 rounded-xl border-2 border-green-300 px-3 py-1 text-xl font-bold text-green-300 font-[Borel]"
            >
              INTERESTED
            </motion.div>
            <motion.div
              style={{ opacity: ignoreOpacity }}
              className="pointer-events-none absolute left-6 top-8 -rotate-12 rounded-xl border-2 border-red-300 px-3 py-1 text-xl font-bold text-red-300"
            >
              IGNORE
            </motion.div>
          </>
        )}
      </motion.div>
    </motion.div>
  );
};

export default SwipeableCard;