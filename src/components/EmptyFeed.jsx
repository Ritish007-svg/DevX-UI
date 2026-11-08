const DanceCat = "/images/dance-cat.gif";
// imports motion, which gives us animated versions of div, ul, li, img, etc.
import { motion } from "framer-motion";

const TIPS = [
  { title: "Polish your profile", text: "A good bio and sharp skills list get you more requests." },
  { title: "Check your requests", text: "Someone may already be waiting to connect with you." },
  { title: "Message your connections", text: "Keep the conversations with your matches going." },
];

// the left column's 3 items, same shape as TIPS so both sides use the same layout
const CAUGHT_UP = [
  { title: "You're all caught up", text: "You've gone through every developer on DevX for now." },
  { title: "Fresh faces soon", text: "New people join regularly, so new profiles will show up here." },
  { title: "Check back later", text: "Come back in a while and your feed will have new people to meet." },
];

// ===== ANIMATION SETTINGS (change the numbers here to customise) =====

// left list timing (the parent controls when each child starts)
const leftList = {
  hidden: {},
  show: {
    transition: {
      // seconds to wait before the first item starts (so the GIF shows first)
      delayChildren: 0.6,
      // seconds between one item starting and the next one starting
      staggerChildren: 0.25,
    },
  },
};

// right list timing, same as left but reversed
const rightList = {
  hidden: {},
  show: {
    transition: {
      // seconds to wait before the first item starts (keep same as left)
      delayChildren: 1.3,
      // seconds between items (keep same as left)
      staggerChildren: 0.25,
      // -1 = start from the LAST item (bottom to top), 1 = normal (top to bottom)
      staggerDirection: -1,
    },
  },
};

// how each left item moves
const leftItem = {
  // x: -100 = starts 100px to the left. Bigger number = longer slide
  hidden: { opacity: 0, x: -100 },
  show: {
    opacity: 1,
    x: 0,
    // duration = how long one slide takes (seconds), ease = speed curve
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

// how each right item moves
const rightItem = {
  // x: 100 = starts 100px to the right
  hidden: { opacity: 0, x: 100 },
  show: {
    opacity: 1,
    x: 0,
    // keep the same as the left so both sides feel equal
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const HEADING = "font-['Sedan_SC']";
const BODY = "font-['Borel']";

const EmptyFeed = () => (
  /* height is 100vh minus the navbar, so items-center puts all 3 columns in the true middle */
  <div className="relative left-1/2 -translate-x-1/2 w-screen lg:left-0 lg:translate-x-0 lg:w-auto lg:fixed lg:inset-0 z-0 px-6 lg:px-16 py-20 lg:py-0 flex flex-col lg:flex-row items-center justify-between gap-10 text-white mt-20">

    {/* ===== LEFT COLUMN ===== */}
    {/* plain div, because each item animates on its own now */}
    <div className="order-2 lg:order-1 w-full max-w-md lg:max-w-none lg:w-[28rem] text-center lg:text-left">
      {/* label, styled exactly like "While you wait" so both labels are the same height */}
      <h3 className={`${HEADING} mb-4 text-base lg:text-lg uppercase tracking-widest text-zinc-400`}>
        Feed complete
      </h3>

      {/* motion.ul controls the timing; variants = leftList, starts hidden, plays "show" */}
      <motion.ul
        variants={leftList}
        initial="hidden"
        animate="show"
        className="divide-y divide-white/10"
      >
        {CAUGHT_UP.map((t) => (
          // motion.li slides in using leftItem; the stagger comes from the ul above
          <motion.li key={t.title} variants={leftItem} className="flex flex-col gap-1 py-6">
            {/* title size: change text-2xl / lg:text-4xl to resize */}
            <strong className={`${HEADING} text-2xl lg:text-4xl font-normal text-[#fdf6ec]`}>
              {t.title}
            </strong>
            {/* paragraph size and gap under the title (mt-5) */}
            <span className={`${BODY} text-lg lg:text-xl leading-relaxed text-zinc-400 mt-5`}>
              {t.text}
            </span>
          </motion.li>
        ))}
      </motion.ul>
    </div>

    {/* ===== CENTER COLUMN (GIF) ===== */}
    {/* only the GIF animates as a whole: fades in and grows */}
    <motion.div
      // starts invisible and a bit smaller (0.85 = 85% size)
      initial={{ opacity: 0, scale: 0.85 }}
      // grows to full size and fades in
      animate={{ opacity: 1, scale: 1 }}
      // no delay, so the GIF appears first
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="order-1 lg:order-2 shrink-0"
    >
      <img
        src={DanceCat}
        alt="Dancing cat celebrating"
        className="block w-[min(300px,80vw)] lg:w-auto h-auto lg:h-[min(640px,calc(100vh-12rem))] aspect-[9/16] object-cover rounded-3xl shadow-[0_20px_80px_rgba(253,246,236,0.18)]"
      />
    </motion.div>

    {/* ===== RIGHT COLUMN ===== */}
    {/* plain div, same reason as the left. Keep the width equal to the left column */}
    <div className="order-3 w-full max-w-md lg:max-w-none lg:w-[28rem] text-center lg:text-right">
      <h3 className={`${HEADING} mb-4 text-base lg:text-lg uppercase tracking-widest text-zinc-400`}>
        While you wait
      </h3>

      {/* variants = rightList, so items come in bottom to top */}
      <motion.ul
        variants={rightList}
        initial="hidden"
        animate="show"
        className="divide-y divide-white/10"
      >
        {TIPS.map((t) => (
          // motion.li slides in from the right using rightItem
          <motion.li key={t.title} variants={rightItem} className="flex flex-col gap-1 py-6">
            <strong className={`${HEADING} text-2xl lg:text-4xl font-normal text-[#fdf6ec]`}>
              {t.title}
            </strong>
            <span className={`${BODY} text-lg lg:text-xl leading-relaxed text-zinc-400 mt-5`}>
              {t.text}
            </span>
          </motion.li>
        ))}
      </motion.ul>
    </div>
  </div>
);

export default EmptyFeed;