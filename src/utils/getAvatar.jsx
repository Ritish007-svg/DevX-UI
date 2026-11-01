export const getDefaultAvatar = (user) => {
  // CHANGED: path now points to your female image (use your real file name and extension)
  if (user?.gender === "female") return "/images/default-female.png";
  // CHANGED: path now points to your male image
  if (user?.gender === "male") return "/images/default-male.png";
  // CHANGED: path now points to your neutral image
  return "/images/default-others.png";
};

// unchanged name and job: returns the user's photo or the default
const getAvatar = (user) => {
  // unchanged: use their photo if they have one
  if (user?.photoUrl) return user.photoUrl;

  // CHANGED: instead of three checks here, reuse the new function above
  return getDefaultAvatar(user);
};

export default getAvatar;