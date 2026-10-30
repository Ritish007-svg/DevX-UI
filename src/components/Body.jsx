import { useState } from "react";
import { Link, NavLink, Outlet, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import axios from "axios";
import BASE_URL from "../utils/constants";
import { useDispatch } from "react-redux";
import { removeUser } from "../utils/UserSlice";


// Common style for every link (the black pill is drawn separately, see below)
const linkStyle =
  "relative inline-flex h-11 items-center rounded-full px-4 pt-1 text-lg font-bold leading-none text-black/60 sm:text-xl";

const Body = () => {
  const dispatch=useDispatch();
  // Tracks whether the profile dropdown is open or closed
  const [open, setOpen] = useState(false);

  // Used to move the user to another page after logout
  const navigate = useNavigate();

  // LOGOUT: close the dropdown and go to the login page (call your logout API here later)
  const handleLogout = async() => {
   try{
     await axios.post(
        BASE_URL + "/logout",{},
        {
          withCredentials: true,
        }
      );
    
      dispatch(removeUser());
      navigate("/login");
   }
   catch(err)
   {
      console.log(err.message);
   }
  };

  return (
    <>
     <div className="min-h-screen bg-black">
      {/* HEADER: full width, space on top and below the bar */}
      <header className="w-full px-3 pt-6 pb-3">
        {/* NAV BAR: cream rounded bar with black border, centred on the page, Borel font */}
        <nav className="mx-auto flex h-16 w-full max-w-5xl items-center justify-between rounded-full border-[1.5px] border-black bg-[#fff8ee] pl-6 pr-2 font-['Sedan_SC'] text-black mt-5">
          {/* LOGO: Sedan SC font, click to go to the feed */}
          <Link to="/feed" className="font-['Sedan_SC'] text-3xl leading-none">
            DevX
          </Link>

          {/* LINKS: Feed, Connections, Requests */}
          <div className="flex items-center gap-1">
            {/* FEED LINK: when this page is open, the black pill is drawn behind the text */}
            <NavLink to="/feed" className={linkStyle}>
              {({ isActive }) => (
                <>
                  {isActive && (
                    <motion.span
                      layoutId="pill"
                      style={{ borderRadius: 9999 }}
                      className="absolute inset-0 bg-black"
                    />
                  )}
                  <span className={`relative ${isActive ? "text-[#fff8ee]" : ""}`}>Feed</span>
                </>
              )}
            </NavLink>

            {/* CONNECTIONS LINK: same as above, only the path and the text change */}
            <NavLink to="/connections" className={linkStyle}>
              {({ isActive }) => (
                <>
                  {isActive && (
                    <motion.span
                      layoutId="pill"
                      style={{ borderRadius: 9999 }}
                      className="absolute inset-0 bg-black"
                    />
                  )}
                  <span className={`relative ${isActive ? "text-[#fff8ee]" : ""}`}>Connections</span>
                </>
              )}
            </NavLink>

            {/* REQUESTS LINK: same as above, only the path and the text change */}
            <NavLink to="/requests" className={linkStyle}>
              {({ isActive }) => (
                <>
                  {isActive && (
                    <motion.span
                      layoutId="pill"
                      style={{ borderRadius: 9999 }}
                      className="absolute inset-0 bg-black"
                    />
                  )}
                  <span className={`relative ${isActive ? "text-[#fff8ee]" : ""}`}>Requests</span>
                </>
              )}
            </NavLink>
          </div>

          {/* PROFILE: black circle on the right, click it to open or close the dropdown */}
          <div className="relative">
            {/* PROFILE BUTTON: swap the icon for <img src={user.photoUrl} /> when you have the user data */}
            <button
              onClick={() => setOpen(!open)}
              className="grid h-11 w-11 place-items-center rounded-full bg-black text-[#fff8ee]"
            >
              <svg viewBox="0 0 24 24" className="h-6 w-6" fill="currentColor">
                <circle cx="12" cy="8" r="4" />
                <path d="M4 21c0-4.4 3.6-7 8-7s8 2.6 8 7z" />
              </svg>
            </button>

            {/* DROPDOWN: only shows when open is true */}
            {open && (
              <div className="absolute right-0 top-14 z-50 w-48 rounded-2xl border-[1.5px] border-black bg-[#fff8ee] p-2 text-lg font-bold">
                {/* EDIT PROFILE: goes to the profile page */}
                <Link
                  to="/profile"
                  onClick={() => setOpen(false)}
                  className="block rounded-xl px-3 py-2 hover:bg-black/5"
                >
                  Edit profile
                </Link>

                {/* LOGOUT: runs handleLogout above */}
                <button
                  onClick={handleLogout}
                  className="block w-full rounded-xl px-3 py-2 text-left hover:bg-black/5"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </nav>
      </header>

      {/* OUTLET: the page for the current route (Feed / Connections / Requests) shows up here */}
      <Outlet />
      </div>
    </>
  );
};

export default Body;