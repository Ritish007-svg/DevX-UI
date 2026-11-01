import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import getAvatar, { getDefaultAvatar } from "../utils/getAvatar";
// the same card component the feed uses, so the preview is exactly what others see
import UserCard from "./userCard";
import axios from "axios";
import BASE_URL from "../utils/constants";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/UserSlice";
// ADDED: motion lets a normal div animate
import { motion } from "framer-motion";
const EditProfileForm = ({ user }) => {
  const [formData, setFormData] = useState({
    firstName: user.firstName || "",
    lastName: user.lastName || "",
    age: user.age ?? "",
    gender: user.gender || "male",
    photoUrl: user.photoUrl || "",
    bio: user.bio || "",
    skills: (user.skills || []).join(", "),
  });

  const [error, seterror] = useState("");
  const [showToast, setshowToast] = useState(false);
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // the user object the preview card shows, rebuilt from formData on every keystroke
  const previewUser = {
    ...user,
    ...formData,
    skills: formData.skills
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean),
  };

  const saveProfile = async () => {
    seterror("");
    try {
      const res = await axios.patch(
        BASE_URL + "/profile/update",
        { ...formData, skills: previewUser.skills },
        { withCredentials: true }
      );
      dispatch(addUser(res.data.data));
      setshowToast(true);
      setTimeout(() => {
        setshowToast(false);
      }, 3000);
    } catch (err) {
      // CHANGED: strips the two prefixes the backend adds, so the error reads shorter
      seterror(
        String(err.response?.data || "Something went wrong")
          .replace("Error message", "")
          .replace("User validation failed: ", "")
      );
    }
  };

  return (
    // OUTER: "relative" so the toast can be placed inside it, pt-24 leaves room for the toast
    <div className="relative flex flex-col items-center gap-8 px-4 pb-16 pt-24 xl:flex-row xl:items-start xl:justify-center">
      {/* GREEN TOAST: always on the page, only fades and slides */}
      <div
        className={`absolute left-1/2 top-4 z-50 -translate-x-1/2 rounded-xl border-2 border-black bg-[#b8f5cf] px-6 py-3 font-[Sedan_SC] text-lg font-bold text-black shadow-lg transition-all duration-500 ease-out ${
          showToast
            ? "translate-y-0 opacity-100"
            : "pointer-events-none -translate-y-4 opacity-0"
        }`}
      >
        Profile updated successfully
      </div>

      {/* CREAM CARD: the form */}
      {/* CHANGED: motion.div instead of div; starts 80px to the left and invisible, then slides to its place */}
<motion.div
  initial={{ opacity: 0, x: -100 }}
  animate={{ opacity: 1, x: 0 }}
  transition={{ duration: 1.5, ease: "easeOut" }}
  className="w-full min-w-0 max-w-[960px] rounded-[32px] bg-[#FFF9ED] p-6 text-black shadow-2xl sm:p-10 xl:flex-1"
>
        <h1 className="font-[borel] text-4xl">Edit profile</h1>
        <p className="mt-1 font-[Sedan_SC] text-2xl text-black/60">
          This is how other developers will see you.
        </p>

        {/* GRID: two columns on desktop */}
        <div className="mt-8 grid gap-x-8 gap-y-6 md:grid-cols-[280px_1fr]">
          {/* ROW 1, LEFT: the photo box */}
          <div className="order-1 h-96 w-full overflow-hidden rounded-[28px] border-4 border-black bg-neutral-900">
            <img
              src={getAvatar(formData)}
              alt="profile preview"
              onError={(e) => {
                e.currentTarget.onerror = null;
                e.currentTarget.src = getDefaultAvatar(formData);
              }}
              className="h-full w-full object-cover"
            />
          </div>

          {/* ROW 1, RIGHT: names, age, gender, bio */}
          <div className="order-3 flex flex-col gap-5 md:order-2">
            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label className="mb-1 block font-[Sedan_SC] text-lg font-bold tracking-wide">
                  First name
                </label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  className="w-full rounded-xl border-2 border-black/15 bg-white/60 px-4 py-3 outline-none transition focus:border-black"
                />
              </div>
              <div>
                <label className="mb-1 block font-[Sedan_SC] text-lg font-bold tracking-wide">
                  Last name
                </label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  className="w-full rounded-xl border-2 border-black/15 bg-white/60 px-4 py-3 outline-none transition focus:border-black"
                />
              </div>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label className="mb-1 block font-[Sedan_SC] text-lg font-bold tracking-wide">
                  Age
                </label>
                <input
                  type="number"
                  min="18"
                  max="75"
                  name="age"
                  value={formData.age}
                  onChange={handleChange}
                  className="w-full rounded-xl border-2 border-black/15 bg-white/60 px-4 py-3 outline-none transition focus:border-black"
                />
              </div>
              <div>
                <label className="mb-1 block font-[Sedan_SC] text-lg font-bold tracking-wide">
                  Gender
                </label>
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  className="w-full rounded-xl border-2 border-black/15 bg-white/60 px-4 py-3 outline-none transition focus:border-black"
                >
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="others">Others</option>
                </select>
              </div>
            </div>

            <div className="flex flex-1 flex-col">
              <label className="mb-1 block font-[Sedan_SC] text-lg font-bold tracking-wide">
                Bio
              </label>
              <textarea
                maxLength="500"
                name="bio"
                value={formData.bio}
                onChange={handleChange}
                className="min-h-[7.5rem] w-full flex-1 resize-none rounded-xl border-2 border-black/15 bg-white/60 px-4 py-3 outline-none transition focus:border-black"
              />
            </div>
          </div>

          {/* ROW 2, LEFT: photo url */}
          <div className="order-2 md:order-3">
            <label className="mb-1 block font-[Sedan_SC] text-lg font-bold tracking-wide">
              Photo URL
            </label>
            <input
              type="text"
              name="photoUrl"
              value={formData.photoUrl}
              onChange={handleChange}
              placeholder="https://..."
              className="w-full rounded-xl border-2 border-black/15 bg-white/60 px-4 py-3 outline-none transition focus:border-black"
            />
          </div>

          {/* ROW 2, RIGHT: skills, buttons and the error */}
          <div className="relative order-4">
            <label className="mb-1 block font-[Sedan_SC] text-lg font-bold tracking-wide">
              Skills
            </label>
            <input
              type="text"
              name="skills"
              value={formData.skills}
              onChange={handleChange}
              placeholder="React, Node.js, MongoDB"
              className="w-full rounded-xl border-2 border-black/15 bg-white/60 px-4 py-3 outline-none transition focus:border-black"
            />
            <p className="mt-1 text-sm text-black/50">
              Separate skills with commas. Maximum 10.
            </p>

            <div className="mt-4 flex gap-4">
              <button
                type="button"
                onClick={saveProfile}
                className="flex-1 cursor-pointer rounded-xl bg-black py-[8px] font-[Sedan_SC] text-base font-bold text-[#FFF9ED] transition hover:bg-black/80"
              >
                Save changes
              </button>
            </div>

            {/* ERROR: absolute, so it takes no space and the card never grows */}
            {/* CHANGED: this one line shows the red error when there is one, otherwise the normal hint, so no extra space is used */}
<p className={` font-[SEDAN_SC] mt-4 text-lg ${error ? "text-red-700" : "text-black/50"}`}>
  {error || ""}
</p>
          </div>
          {/* CLOSES the Skills block above */}
        </div>
        {/* CLOSES the grid */}
      </motion.div>
      {/* CLOSES the cream card */}

      {/* LIVE PREVIEW: outside the cream card, next to it */}
      {/* CHANGED: motion.div instead of div; starts 80px to the right and invisible, with the same timing as the form so they move together */}
<motion.div
  initial={{ opacity: 0, x: 100 }}
  animate={{ opacity: 1, x: 0 }}
  transition={{ duration: 1.5, ease: "easeOut" }}
  className="ml-10 mt-12 shrink-0"
>
        <p className="mb-10 text-center font-[Sedan_SC] text-4xl text-[#FFF9ED]">
          Live preview
        </p>
        {/* onSend is empty so the buttons do nothing here */}
        <UserCard user={previewUser} onSend={() => {}} />
      </motion.div>
    </div>
  );
};

const Profile = () => {
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();

  // runs when the page opens
  useEffect(() => {
    // if the app already knows the user, don't ask the backend again
    if (user) return;

    // asks the backend who is logged in (the cookie tells it)
    const loadUser = async () => {
      try {
        const res = await axios.get(BASE_URL + "/profile/view", {
          withCredentials: true,
        });
        // this route sends the user directly, so it's res.data
        dispatch(addUser(res.data));
      } catch (err) {
        console.log(err.message);
      }
    };
    loadUser();
  }, [user, dispatch]);

  // shows a small text instead of a blank page while the user loads
  if (!user)
    return (
      <p className="mt-10 text-center font-[Sedan_SC] text-2xl text-[#FFF9ED]">
        Loading...
      </p>
    );
  return <EditProfileForm user={user} />;
};

export default Profile;