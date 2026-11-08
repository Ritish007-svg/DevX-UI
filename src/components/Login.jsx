
import { Link, useNavigate } from "react-router-dom";
const LoginImg = "/images/Login.png";
import { useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../utils/UserSlice";
import BASE_URL from "../utils/constants";

function Login() {
  const navigate = useNavigate();
  const [emailId, setemailId] = useState("");
  const [error, setError] = useState("");
  const [firstName, setfirstName] = useState("");
  const [gender, setGender] = useState("male"); // used on signup so the right default avatar is shown
  // This flag is the heart of the toggle: true = login mode, false = signup mode
  const [isLoginForm, setIsLoginForm] = useState(true);
  const [password, setpassword] = useState("");
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user);
  console.log(user);

  // CHANGED: renamed from `Login` to `handleLogin`.
  // A function called Login inside the Login component has the same name as the component, which is confusing.
  const handleLogin = async () => {
    // NEW: clear the old error before trying again
    setError("");
    try {
      const result = await axios.post(
        BASE_URL + "/login",
        {
          emailId,
          password,
        },
        {
          withCredentials: true,
        }
      );
      dispatch(addUser(result.data));
      navigate("/feed");
    } catch (err) {
      // CHANGED: added `?.` and a fallback.
      // If the backend is off, err.response is undefined, and the old line would crash inside catch.
      setError(err.response?.data?.message);
    }
  };

  // CHANGED: renamed from `Signup` to `handleSignup` to match handleLogin
  const handleSignup = async () => {
    // NEW: clear the old error before trying again
    setError("");
    try {
      const result = await axios.post(
        BASE_URL + "/signup",
        {
          firstName,
          gender,
          emailId,
          password,
        },
        {
          withCredentials: true,
        }
      );
      // Works only if your signup route also sets the cookie and returns the user.
      // If it doesn't, navigate to the login mode instead of /feed.
      dispatch(addUser(result.data));
      navigate("/profile");
    } catch (err) {
      // CHANGED: same safe error read as handleLogin
      setError(err.response?.data?.message);
    }
  };

  // NEW: flips between login and signup mode
  const toggleForm = () => {
    setIsLoginForm(!isLoginForm); // `!` means "the opposite": true becomes false, false becomes true
    setError(""); // don't carry "Invalid email or password" into the other mode
  };

  return (
    <>
      <section className="min-h-screen bg-[#FFF9ED] flex">
        <div className="flex-1 bg-black flex flex-col justify-center px-30">
          <div className="w-full max-w-xl ">
            {/* Way back to the hero/landing page */}
            <Link
              to="/"
              className="mb-10 inline-block font-[borel] text-2xl text-[#FFF9ED]/60 hover:text-[#FFF9ED]"
            >
              ← Back to home
            </Link>

            {/* CHANGED: heading text depends on the mode */}
            <h1 className="font-[Sedan_SC]  text-[#FFF9ED] text-5xl">
              {isLoginForm ? "Welcome Back" : "Join DevX"}
            </h1>

            {/* CHANGED: heading text depends on the mode */}
            <h2 className="font-[borel] text-3xl text-[#FFF9ED] mt-20 leading-relaxed">
              {isLoginForm ? "Login to Your Account" : "Create Your Account"}
            </h2>

            {/* CHANGED: subtitle text depends on the mode */}
            <h2 className="font-[borel] text-2xl text-[#FFF9ED]/60 leading-relaxed">
              {isLoginForm
                ? "Enter your email to Login Into Your Account"
                : "Fill in your details to Sign Up"}
            </h2>

            {/* NEW: first name input, shown ONLY in signup mode.
                `!isLoginForm && (...)` means: if signup mode, show this, otherwise show nothing. */}
            {!isLoginForm && (
              <>
                <label htmlFor="firstName" className="block text-sm font-medium text-[#FFF9ED] mt-8">
                  First Name
                </label>
                <input
                  id="firstName"
                  type="text"
                  placeholder="Elon"
                  value={firstName}
                  onChange={(e) => setfirstName(e.target.value)}
                  className="mt-2 w-full h-12 rounded-xl bg-white/10 border border-white/20 px-4 text-[#FFF9ED] placeholder:text-[#FFF9ED]/40 outline-none focus:border-[#FFF9ED]/60"
                />

                <label htmlFor="gender" className="block text-sm font-medium text-[#FFF9ED] mt-8">
                  Gender
                </label>
                <select
                  id="gender"
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                  className="mt-2 w-full h-12 rounded-xl bg-white/10 border border-white/20 px-4 text-[#FFF9ED] outline-none focus:border-[#FFF9ED]/60"
                >
                  <option value="male" className="text-black">Male</option>
                  <option value="female" className="text-black">Female</option>
                  <option value="others" className="text-black">Others</option>
                </select>
              </>
            )}

            <label htmlFor="email" className="block text-sm font-medium text-[#FFF9ED] mt-8">
              Email
            </label>
            <input
              id="email"
              type="email"
              placeholder="you@example.com"
              value={emailId}
              onChange={(e) => setemailId(e.target.value)}
              className="mt-2 w-full h-12 rounded-xl bg-white/10 border border-white/20 px-4 text-[#FFF9ED] placeholder:text-[#FFF9ED]/40 outline-none focus:border-[#FFF9ED]/60"
            />

            <div className="flex justify-between items-center mt-5">
              <label htmlFor="password" className="text-sm font-medium text-[#FFF9ED]">
                Password
              </label>
              {/* CHANGED: "Forgot password?" only makes sense when logging in, so hide it in signup mode */}
              {isLoginForm && (
                <a href="#" className="text-sm text-[#FFF9ED]/70 hover:underline underline-offset-4">
                  Forgot password?
                </a>
              )}
            </div>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setpassword(e.target.value)}
              className="mt-2 w-full h-12 rounded-xl bg-white/10 border border-white/20 px-4 text-[#FFF9ED] outline-none focus:border-[#FFF9ED]/60"
            />

            {/* Error message: shows only when `error` has text */}
            {error && <p className="mt-4 text-red-400 text-sm">{error}</p>}

            {/* CHANGED: the same button now runs a different function and shows different text per mode.
                Note: no brackets after handleLogin / handleSignup. We hand React the function to run on click. */}
            <button
              type="button"
              className="mt-8 w-full h-12 rounded-xl bg-[#FFF9ED] text-black font-[borel] text-xl cursor-pointer hover:bg-white"
              onClick={isLoginForm ? handleLogin : handleSignup}
            >
              {isLoginForm ? "Login" : "Sign Up"}
            </button>

            {/* CHANGED: replaced <Link to="/signup"> with a <span> that calls toggleForm.
                The page no longer changes, only the form does. */}
            <p className="text-center text-sm text-[#FFF9ED]/60 mt-6">
              {isLoginForm ? "Don't have an account? " : "Already have an account? "}
              <span
                onClick={toggleForm}
                className="text-[#FFF9ED] underline underline-offset-4 cursor-pointer"
              >
                {isLoginForm ? "Sign up" : "Login"}
              </span>
            </p>
          </div>
        </div>

        <div className="flex flex-1 justify-center">
          {/* RIGHT: visual */}
          <img
            src={LoginImg}
            alt="Developers connecting around a laptop"
            className="w-full max-w-3xl object-contain"
          />
        </div>
      </section>
    </>
  );
}

export default Login;