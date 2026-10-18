import {Link} from "react-router-dom"
import Orbit from "./components/Orbit"
import HeroCarousel from "./components/HeroCarousel";

import Person1 from "../images/Person1.png";
import Person2 from "../images/Person2.png";
import Person3 from "../images/Person3.png";
import Person4 from "../images/Person4.png";
import Person5 from "../images/Person5.png";
import Person6 from "../images/Person6.png";
import Person7 from "../images/Person7.png";
import Tick from "../images/right-arrow.png"

import HeroFeatures from "./components/HeroFeatures";
import Footer from "./components/HeroFooter"

const developers = [
  {
    image: Person1,
    name: "Anny Foe",
    role: "Frontend Dev",
    skills: "React • Tailwind ",
  },
  {
    image: Person2,
    name: "Jessica Sans",
    role: "Backend Dev",
    skills: "Node.js • Express",
  },
  {
    image: Person3,
    name: "Rakesh Singh",
    role: "AI Engineer",
    skills: "Python • ML",
  },
  {
    image: Person4,
    name: "Ram Kumar",
    role: "UI/UX Designer",
    skills: "Figma • Adobe",
  },
  {
    image: Person5,
    name: "Ashiqi Salin",
    role: "Vibe Coder",
    skills: "CtrlC CtrlV",
  },
  {
    image: Person6,
    name: "Alexis Sanchez",
    role: "CyberSecurity",
    skills: "Networking • OS",
  },
  {
    image: Person7,
    name: "Emma Watson",
    role: "MERN Dev",
    skills: "React • NodeJS",
  },
];

function Hero()
{
  return(
    <>
<section className="min-h-screen bg-[#FFF9ED] flex flex-col items-center pt-20 overflow-hidden">

  {/* THIS is your new row */}
  <div className="flex flex-row items-center justify-between gap-40">

    {/* LEFT ROTATION */}
    <Orbit />

    {/* YOUR EXISTING TEXT */}
    <div className="flex flex-col items-center mt-6">
      <h1 className="font-[Sedan_SC] font-bold text-black text-5xl">
        Introducing DevX
      </h1>

      <h2 className="font-[borel] text-3xl text-black text-center max-w-4xl mt-8 leading-relaxed">
        Discover people who share your stack, send connection requests,
        and chat in real time, with an AI assistant to help you along the way.
      </h2>

      <button className="mt-6 bg-black text-white rounded-3xl pl-6 pr-2 py-2 flex items-center justify-between w-48 cursor-pointer">
  <span className="text-xl font-[borel] leading-none pt-3">
    Get Started
  </span>

  <Link to="/login" className="bg-gray-400 text-black rounded-full w-8 h-8 flex items-center justify-center">
    <img src={Tick} alt="right-arrow" className="w-full h-full object-contain p-2" />
  </Link>
</button>
    </div>

    {/* RIGHT ROTATION */}
    <Orbit />

  </div>

  {/* HeroCard Carousel  */}
 

 {/* HeroCard Carousel */}
<div className="mt-5 w-full flex flex-col items-center">
  <HeroCarousel cards={developers} />
  {/* <h1 className="font-[borel] font-bold text-black text-3xl">
        Brewed By Ritish Karmakar
      </h1> */}
</div>

<HeroFeatures/>

<div className="flex flex-row items-center justify-between gap-40">
    <div className="mt-23">
  <Orbit/>
  </div>


{/* CTA SECTION */}
<div className="flex flex-col items-center mt-20">
      <h1 className="font-[Sedan_SC] font-bold text-black text-5xl">
        Ready To Find Your Dev Crew ? 
      </h1> 

      <h2 className="font-[borel] text-3xl text-black text-center max-w-4xl mt-8 leading-relaxed">
      Join the waitlist and be the first to swipe
      </h2>

      <button className="mt-6 bg-black text-white rounded-3xl pl-6 pr-2 py-2 flex items-center justify-between w-48 cursor-pointer">
  <span className="text-xl font-[borel] leading-none pt-3">
    Get Started
  </span>

  <Link to="/login" className="bg-gray-400 text-black rounded-full w-8 h-8 flex items-center justify-center">
    <img src={Tick} alt="right-arrow" className="w-full h-full object-contain p-2" />
  </Link>
</button>
    </div>
     <div className="mt-23">
    <Orbit/>
    </div>
</div>
{/* CTA ENDS */}


<Footer/>



</section>

    </>
  )
}

export default Hero;