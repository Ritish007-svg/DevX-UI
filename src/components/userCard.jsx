import getAvatar,{getDefaultAvatar} from "../utils/getAvatar";

const UserCard = ({ user,onSend }) => {
  const skills = user.skills ?? [];
  const extra = skills.length - 3;

  return (
    <div className="relative h-160 w-100 flex justify-center overflow-hidden rounded-[32px] bg-neutral-900 border-4 border-amber-50">
      {/* photo fills the whole card */}
     <img
  // unchanged: the photo to show
    key={user.photoUrl + user.gender}
  src={getAvatar(user)}
  // unchanged: text shown if the image can't load
  alt={user.firstName}
  // ADDED: the browser runs this function only when the image fails to load
  onError={(e) => {
    // ADDED: if the default also fails, don't try again forever
    e.currentTarget.onerror = null;
    // ADDED: replace the broken image with the gender-based default
    e.currentTarget.src = getDefaultAvatar(user);
  }}
  // unchanged: styling
  className="absolute inset-0 h-full w-full object-cover"
/>

      {/* dark fade so the white text is readable */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />

      {/* text and buttons sit at the bottom */}
      <div className="absolute inset-x-0 bottom-0 p-5 text-white">
        <h2 className="font-[borel] text-3xl">
          {user.firstName} {user.lastName}
        </h2>

        {skills.length > 0 && (
          <p className="mt-2 font-[borel] text-lg">
            {skills.slice(0, 3).join(" • ")} {extra > 0 && `+${extra}`}
          </p>
        )}

        {user.bio && <p className="mt-3 font-[Sedan_SC] line-clamp-3 text-md">{user.bio}</p>}

        <div className="mt-5 flex gap-4">
          <button className="flex-1 rounded-xl bg-green-200 py-3 font-['Sedan_SC'] cursor-pointer text-lg font-bold text-black" onClick={()=>onSend("Interested", user._id)}>
            Interested
          </button>
          <button className="flex-1 rounded-xl bg-red-300 py-3 cursor-pointer font-['Sedan_SC'] text-lg font-bold text-black"
          onClick={()=>onSend("Ignore", user._id)}>
            Ignore
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserCard;