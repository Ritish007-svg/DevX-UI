
import { motion, AnimatePresence } from "framer-motion";

// CHANGED: deleted the GOOD emoji list and the PARTICLES array, we don't use particles anymore

const VibeFeedback = ({ feedback }) => {
  // NEW: same check you had before, so it works with your current decision values
  const isInterested = feedback?.decision === "interested";

  return (
    // CHANGED: the old full-screen overlay (and its green/white glow) is gone.
    // This wrapper only lines the pill up in the center, under the navbar.
    // top-[130px] is a temporary spot, we'll attach it to the card stack in Step 3
    <div className="pointer-events-none fixed inset-x-0 top-[130px] z-50 flex justify-center">
      {/* CHANGED: mode="wait" makes an old pill leave before the new one enters,
          so two pills are never shown side by side */}
      <AnimatePresence mode="wait">
        {feedback && (
          <motion.div
            key={feedback.id}
            // NEW: the same slide-and-fade for both outcomes (10px up, 0.25 seconds)
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            // CHANGED: one shape for both. Solid mint or pink (the same colors as your card buttons),
            // fully rounded like the navbar, Sedan SC font. No blur, no transparency
            className={`flex items-center gap-3 rounded-full py-2 pl-5 pr-2 font-['Sedan_SC'] text-lg font-bold text-black ${
              isInterested ? "bg-green-200" : "bg-red-300"
            }`}
          >
            {/* CHANGED: short, plain wording instead of the emoji lines */}
            <span className="pt-1 leading-none">
              {isInterested
                ? `Request sent to ${feedback.name}`
                : `Skipped ${feedback.name}`}
            </span>

            {/* NEW: black circle with a glyph, the same style as the arrow in your buttons.
                A check for interested, an arrow for ignore */}
            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-black text-sm text-white">
              {isInterested ? "✓" : "X"}
            </span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default VibeFeedback;