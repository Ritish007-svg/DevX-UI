import { motion, useTransform } from "framer-motion";

const THRESHOLD = 120; // keep in sync with SwipeableCard

const CONFIG = {
  left: {
    sign: -1,
    label: "Interested",
    sub: "Let's connect",
    rgb: "74,222,128",
    icon: "M12 21s-7-4.5-9.5-9A5.5 5.5 0 0 1 12 6a5.5 5.5 0 0 1 9.5 6c-2.5 4.5-9.5 9-9.5 9z",
  },
  right: {
  sign: 1,
  // CHANGED: "Pass" became "Ignore", so it matches your button and the stamp on the card
  label: "Ignore",
  sub: "Maybe next time",
  // CHANGED: grey became a rose pink (same brightness as the green on the other side),
  // so the two sides mirror each other and match your pink Ignore button
  rgb: "251,113,133",
  icon: "M6 6l12 12M18 6L6 18",
},
};

const Zone = ({ side, dragX }) => {
  const c = CONFIG[side];
  const isLeft = side === "left";

  // 0 -> 1 as the card is dragged toward this side
  const progress = useTransform(dragX, (v) =>
    Math.min(Math.max((v * c.sign) / THRESHOLD, 0), 1)
  );

  const opacity = useTransform(progress, [0, 0.15, 1], [0, 0.7, 1]);
  const slide = useTransform(progress, [0, 1], [isLeft ? -90 : 90, 0]);
  const badgeScale = useTransform(progress, [0, 0.85, 1], [0.6, 1, 1.18]);
  const badgeFill = useTransform(
    progress,
    [0.85, 1],
    [`rgba(${c.rgb},0.12)`, `rgba(${c.rgb},0.95)`]
  );
  const iconColor = useTransform(
    progress,
    [0.85, 1],
    [`rgb(${c.rgb})`, "#04130a"]
  );

  return (
    <motion.div
      style={{ opacity }}
      className={`pointer-events-none fixed top-0 z-0 flex h-full w-[30%] items-center justify-center ${
        isLeft ? "left-0" : "right-0"
      }`}
    >
      {/* aurora glow bleeding in from the screen edge */}
      <div
        className="absolute inset-0 blur-2xl"
        style={{
          background: `radial-gradient(ellipse at ${
            isLeft ? "0% 50%" : "100% 50%"
          }, rgba(${c.rgb},0.45) 0%, rgba(${c.rgb},0.12) 45%, transparent 70%)`,
        }}
      />

      <motion.div style={{ x: slide }} className="relative flex flex-col items-center gap-4">
        {/* badge + progress ring */}
      <motion.div style={{ scale: badgeScale }} className="relative h-20 w-20">
  <motion.div
    style={{ backgroundColor: badgeFill }}
    // CHANGED: removed backdrop-blur-md, because the frosted look is what made it feel like glass.
    // Now the circle is a plain fill, like the heart circle
    className="absolute inset-0 rounded-full"
  />
          <svg viewBox="0 0 64 64" className="absolute inset-0 h-full w-full -rotate-90">
            <circle cx="32" cy="32" r="29" fill="none" stroke={`rgba(${c.rgb},0.2)`} strokeWidth="3" />
            <motion.circle
              cx="32"
              cy="32"
              r="29"
              fill="none"
              stroke={`rgb(${c.rgb})`}
              strokeWidth="3"
              strokeLinecap="round"
              style={{ pathLength: progress }}
            />
          </svg>
          <svg viewBox="0 0 24 24" className="absolute inset-0 m-auto h-8 w-8" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <motion.path d={c.icon} style={{ stroke: iconColor, fill: isLeft ? iconColor : "none" }} />
          </svg>
        </motion.div>

        <div className="text-center">
          {/* CHANGED: font is now Borel (font-[borel]) and the size went from text-lg to text-3xl.
    I also removed font-semibold and tracking-wide: Borel is a handwriting font with only one weight,
    and extra letter spacing breaks up its joined letters */}
<p className="text-3xl font-[SEDAN_SC] text-white">{c.label}</p>
          <p className="text-xl mt-5 font-[borel] font-bold" style={{ color: `rgba(${c.rgb},1.2)` }}>
            {c.sub}
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
};

const SwipeZones = ({ dragX }) => (
  <>
    <Zone side="left" dragX={dragX} />
    <Zone side="right" dragX={dragX} />
  </>
);

export default SwipeZones;