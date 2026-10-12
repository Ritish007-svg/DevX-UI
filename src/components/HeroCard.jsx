function HeroCard({image,name,skills,role})
{
  return(
        <div className="relative w-70 h-95 overflow-hidden rounded-[28px]">
          <img
          src={image}
          alt={name}
              className="w-full h-full object-cover"
          />
           {/* Black gradient overlay */}
           <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent">
           <div className="flex justify-between">
           <div className="flex flex-col absolute bottom-5 left-6 ">
              <h2 className="text-xl font-[borel]">
                {name}
              </h2>

              <p className="text-xl font-[borel]">
                {role}
              </p>

              <p className="text-xl font-[borel]">
                {skills}
              </p>
              </div>

              {/* Heart  */}

              <img  className="absolute bottom-5 w-15 right-2" src="/images/heart.png"/>
            </div>
            </div>
      </div>
  )
}

export default HeroCard;