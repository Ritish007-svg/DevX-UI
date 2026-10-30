function Footer() {
  return (
    <footer className="relative w-full mt-24">

      {/* Curved top edge */}
      <svg
        viewBox="0 0 1440 160"
        preserveAspectRatio="none"
        className="block w-full h-24 md:h-40"
      >
        <path
          d="M0 60 C 300 0, 620 40, 720 160 C 820 40, 1140 0, 1440 60 V160 H0 Z"
          fill="black"
        />
      </svg>

      {/* Back to top, sits in the cream notch */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className="absolute left-1/2 top-6 -translate-x-1/2 text-lg uppercase tracking-widest text-black cursor-pointer hover:underline underline-offset-4 font-bold font-[SEDAN_SC]"
      >
        Back to top
      </button>

      {/* Black body */}
      <div className="bg-black text-[#FFF9ED] -mt-px px-6 pb-10">
        <div className="w-full max-w-[1600px] mx-auto">

          {/* Row 1: brand left, contact right */}
          <div className="flex justify-between items-start pt-6">
            <div>
              <h3 className="font-[Sedan_SC] text-3xl">DevX</h3>
              <p className="font-[borel] text-xl text-[#FFF9ED]/60 mt-1">
                Find your dev crew
              </p>
            </div>

            <div className="text-right text-sm text-[#FFF9ED]/70 leading-relaxed">
              <p className="text-xs uppercase tracking-widest text-[#FFF9ED]">Contact</p>
              <a href="mailto:your@email.com" className="hover:underline underline-offset-4">
                kritish2803@email.com
              </a>
            </div>
          </div>

          {/* Row 2: links */}
          <div className="flex justify-between border-y border-[#FFF9ED]/15 py-6 mt-10 text-xs uppercase tracking-widest">
            <a href="https://github.com/Ritish007-svg" target="_blank" rel="noreferrer" className="hover:underline underline-offset-4">GitHub</a>
            <a href="https://leetcode.com/u/Ay3T1VcTP0/" target="_blank" rel="noreferrer" className="hover:underline underline-offset-4">LeetCode</a>
            <a href="https://www.linkedin.com/in/ritish-karmakar-625532376/?isSelfProfile=true" target="_blank" rel="noreferrer" className="hover:underline underline-offset-4">LinkedIn</a>
            <a href="https://x.com/RitishKarmady" target="_blank" rel="noreferrer" className="hover:underline underline-offset-4">X.com</a>
          </div>

          {/* Row 3: copyright, logo, credit */}
          <div className="flex justify-between items-center pt-6 text-lg text-[#FFF9ED]/60">
            <p>© 2026 DevX. All rights reserved.</p>
            <span className="font-[Sedan_SC] text-2xl text-[#FFF9ED] ml-20">DevX</span>
            <p className="font-[borel] text-xl text-[#FFF9ED]">Brewed by Ritish Karmakar</p>
          </div>

        </div>
      </div>

    </footer>
  );
}

export default Footer;