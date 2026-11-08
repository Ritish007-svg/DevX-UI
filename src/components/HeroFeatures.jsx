const Person1 = "/images/Person1.png";
const Person7 = "/images/Person7.png";
// NEW: motion lets us animate normal HTML tags like div
import { motion } from "framer-motion";

function HeroFeatures() {
  return (
    <section className="w-full flex flex-col items-center mt-6 px-6">
      <div className="flex flex-col items-center mt-6">
        <h1 className="font-[Sedan_SC] font-bold text-black text-5xl"> Everything you need to find your dev crew</h1>
        <h2 className="font-[borel] text-3xl text-black text-center max-w-4xl mt-8 leading-relaxed"> Match, connect and build, all in one place </h2>
      </div>

      {/* Bento Grids */}
      <div className="flex gap-5 w-full  mx-auto px-6 mt-14 h-140">

        {/* CHANGED: big card is now a motion.div (it was a normal div) */}
        <motion.div
          className="flex-2 bg-black rounded-[28px]"
          // NEW: starting look: invisible and pushed 100px down
          initial={{ opacity: 0, y: 100 }}
          // NEW: when the card scrolls into view, animate to fully visible at its real position
          whileInView={{ opacity: 1, y: 0 }}
          // NEW: play only once (not every time you scroll past), start when 30% of the card is on screen
          viewport={{ once: true, amount: 0.3 }}
          // NEW: a slow 1.8 second slide-up. The big card has no delay, so it goes first
          transition={{ duration: 1.8, ease: "easeOut", delay: 0 }}
        >
          {/* 1st big box */}
          <div className="p-10 gap-2">
            <h1 className="font-[Sedan_SC] text-5xl text-[#FFF9ED] leading-tight">Find devs who share your stack</h1>
            <h2 className=" mt-10 text-3xl text-[#FFF9ED]/60 font-[borel] leading-relaxed">
              Match with people using React, Node, Figma and more, then send a connection request in one tap.
            </h2>
          </div>

          {/* Images row */}
          <div className="flex ml-20 mr-10 gap-10 items-center justify-between">

            {/* Photos with the pill between them */}
            <div className="relative flex items-center justify-between shrink-0 w-140 h-60">
              <img src={Person1} alt="User1" className="w-48 h-65 object-cover rounded-2xl rotate-10 shrink-0" />

              {/* Pill, centered between the photos */}
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10 bg-[#FFF9ED] text-black font-[borel] text-lg rounded-2xl px-3 py-1 whitespace-nowrap">
                <h2 className="pt-3 text-center font-bold">You both use React</h2>
              </div>

              <img src={Person7} alt="User3" className="w-48 h-65 object-cover rounded-2xl -rotate-10 shrink-0" />
            </div> {/* END: photos block */}

            {/* Right side: a connection request card plus the CTA */}
            <div className="flex flex-row items-end gap-6 mt-20">
              <div className="bg-[#FFF9ED]/10 rounded-2xl p-4 w-64 text-[#FFF9ED]">
                <p className="text-sm text-[#FFF9ED]/60">New connection request</p>
                <p className="font-[borel] text-xl mt-1">Anny Foe · React, Tailwind</p>
                <div className="flex gap-2 mt-3">
                  <span className="bg-[#FFF9ED] text-black text-sm rounded-full px-4 py-1">Accept</span>
                  <span className="border border-[#FFF9ED]/30 text-sm rounded-full px-4 py-1">Ignore</span>
                </div>
              </div>

              <button className="bg-[#FFF9ED] text-black rounded-3xl pl-6 pr-2 py-2 flex items-center justify-between w-52 cursor-pointer">
                <span className="font-[borel] text-xl">Find your match</span>
                <span className="bg-black text-white rounded-full w-8 h-8 flex items-center justify-center">→</span>
              </button>
            </div> {/* END: request card and button */}

          </div> {/* END: images row */}
        {/* CHANGED: closing tag now matches the motion.div opened above */}
        </motion.div> {/* END: BIG CARD */}

        {/* Right column that holds the two small cards */}
        <div className="flex-1 flex flex-col gap-5">

          {/* CHANGED: first small card (Chat in real time) is now a motion.div */}
          <motion.div
            className="flex-1 bg-black rounded-[28px]"
            // NEW: starting look: invisible and pushed 100px down
            initial={{ opacity: 0, x: 100 }}
            // NEW: when it scrolls into view, animate to visible at its real position
            whileInView={{ opacity: 1, x: 0 }}
            // NEW: play only once, start when 30% of the card is on screen
            viewport={{ once: true, amount: 0.3 }}
            // NEW: same speed as the big card, but waits 0.5 seconds so the big card goes first
            transition={{ duration: 1.8, ease: "easeOut", delay: 0.4 }}
          >
            <div className="flex-1 flex flex-col gap-5 p-10">
              {/* text */}
              <div className="flex-1 min-w-0 ">
                <h3 className="font-[Sedan_SC] text-3xl text-[#FFF9ED]">Chat in real time</h3>
                <p className="font-[borel] text-xl text-[#FFF9ED]/60 mt-5">Say hi the moment you connect.</p>
              </div>

              {/* chat bubbles */}
              <div className="flex flex-col gap-2 ">
                <p className="bg-[#FFF9ED]/10 text-[#FFF9ED] rounded-2xl rounded-bl-sm px-4 py-2 w-fit">
                  Hey, saw you use Tailwind too 👋
                </p>
                <p className="bg-[#FFF9ED] text-black rounded-2xl rounded-br-sm px-4 py-2 w-fit self-end">
                  Yes! Want to team up? 🚀
                </p>
              </div> {/* END: chat bubbles */}
            </div> {/* END: padded content */}
          {/* CHANGED: closing tag now matches the motion.div opened above */}
          </motion.div> {/* END: SMALL CARD 1 */}

          {/* CHANGED: second small card (AI wingman) is now a motion.div */}
          <motion.div
            className="flex-1 bg-black rounded-[28px]"
            // NEW: same starting look as the other cards
            initial={{ opacity: 0, x: 100 }}
            // NEW: animate to visible at its real position when scrolled into view
            whileInView={{ opacity: 1, x: 0 }}
            // NEW: play only once, start when 30% of the card is on screen
            viewport={{ once: true, amount: 0.3 }}
            // NEW: waits 1 second, so it goes last (big card, then chat card, then this one)
            transition={{ duration: 1.8, ease: "easeOut", delay: 1.0 }}
          >
            <div className="flex-1 flex flex-col gap-5 p-10">
              {/* text */}
              <div className="flex-1 min-w-0 ">
                <h3 className="font-[Sedan_SC] text-3xl text-[#FFF9ED]">Dev,Your AI wingman for networking</h3>
                <p className="font-[borel] text-xl text-[#FFF9ED]/60 mt-5">Get icebreakers and project ideas in seconds.</p>
              </div>

              {/* chat bubbles */}
              <div className="flex flex-col gap-2 ">
                <p className="bg-[#FFF9ED]/10 text-[#FFF9ED] rounded-2xl rounded-bl-sm px-4 py-2 w-fit">
                  Suggest a project for React + Node
                </p>
                <p className="bg-[#FFF9ED] text-black rounded-2xl rounded-br-sm px-4 py-2 w-fit self-end">
                  Try a study-room app with live chat
                </p>
              </div> {/* END: chat bubbles */}
            </div> {/* END: padded content */}
          {/* CHANGED: closing tag now matches the motion.div opened above */}
          </motion.div> {/* END: SMALL CARD 2 */}

        </div> {/* END: right column */}
      </div> {/* END: bento row */}
    </section>
  );
}

export default HeroFeatures;