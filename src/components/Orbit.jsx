import { motion } from "framer-motion";
const icons = [
  { src: "/images/express.png", angle: 0 },
  { src: "/images/JS.png", angle: 60 },
  { src: "/images/Figma.png", angle: 120 },
  { src: "/images/Postman.png", angle: 180 },
  { src: "/images/Tailwind.png", angle: 240 },
  { src: "/images/React.png", angle: 300 },
];
function Orbit() {
  return (
  <motion.div className="relative w-72 h-72"
       animate={{ rotate: 360 }}
      transition={{
        duration: 10,
        repeat: Infinity,
        ease: "linear",
      }}>


  {icons.map((icon) => (
    <motion.img
      key={icon.src}
      src={icon.src}
      className="absolute w-12 h-12 top-1/2 left-1/2"
      style={{
        transform: `rotate(${icon.angle}deg) translateX(120px) rotate(-${icon.angle}deg)`,
        transformOrigin: "0 0",
      }}
    />
  ))}

</motion.div>
  );
}

export default Orbit;