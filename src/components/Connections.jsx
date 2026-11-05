import axios from "axios";
import { useEffect, useState } from "react";
import BASE_URL from "../utils/constants";
import getAvatar, { getDefaultAvatar } from "../utils/getAvatar";

const HEADING = "font-['Sedan_SC']";
const BODY = "font-['Borel']";

const getSkills = (skills) => {
  if (Array.isArray(skills)) return skills.filter(Boolean);
  if (typeof skills === "string")
    return skills.split(",").map((s) => s.trim()).filter(Boolean);
  return [];
};

const Connections = () => {
  const [connections, setConnections] = useState(null); // null = not loaded yet
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchConnections = async () => {
      try {
        const res = await axios.get(BASE_URL + "/users/requests/status", {
          withCredentials: true,
        });
        setConnections(res.data.data ?? []);
      } catch (err) {
        console.log(err.response?.status, err.response?.data || err.message);
        setError("Could not load connections.");
      }
    };
    fetchConnections();
  }, []);

  return (
    <div className="mx-auto flex py-12 w-full max-w-[1800px] flex-col items-center gap-10 px-4">
      {/* HEADER */}
      <div className="text-center">
        <h1 className={`${HEADING} text-4xl leading-tight text-[#fff8ee] md:text-5xl`}>
          Your Dev Crew
        </h1>
        <p className={`${BODY} mt-10 text-2xl text-[#fff8ee]/60 md:text-2xl`}>
          Devs who said yes. Time to build something together.
        </p>
      </div>

      {error && <p className={`${BODY} text-2xl text-[#fff8ee]`}>{error}</p>}
      {!error && connections === null && (
        <p className={`${BODY} text-2xl text-[#fff8ee]`}>Loading...</p>
      )}
      {!error && connections?.length === 0 && (
        <p className={`${BODY} text-2xl text-[#fff8ee]`}>
          No crew yet. Go swipe a few devs on the feed!
        </p>
      )}

      <div className="mx-auto flex w-full flex-wrap justify-between gap-8">
        {(connections || []).map((u) => {
          const skills = getSkills(u.skills);
          return (
            <div
              key={u._id}
              className="flex h-136 w-96 max-w-full flex-col overflow-hidden rounded-3xl border-[1.5px] border-black bg-[#fff8ee] p-3"
            >
              {/* Inset rounded photo, cropped from the top so faces stay in view */}
              <img
                src={getAvatar(u)}
                onError={(e) => (e.currentTarget.src = getDefaultAvatar(u))}
                alt={u.firstName}
                className="h-80 w-full shrink-0 rounded-2xl object-cover object-top"
              />

              <div className="flex min-h-0 min-w-0 flex-1 flex-col gap-2 px-2 pt-4">
                {/* NAME + GENDER side by side */}
                <h2 className={`${HEADING} text-2xl shrink-0 truncate capitalize leading-normal text-black`}>
                  {[`${u.firstName ?? ""} ${u.lastName ?? ""}`.trim(), u.age, u.gender]
                    .filter(Boolean)
                    .join(" · ")}
                </h2>

                {/* BIO */}
                {u.bio && (
                  <div className="flex flex-1 items-center">
                    <p className={`${BODY} text-xl leading-normal text-black/80`}>
                      {u.bio.length > 50 ? `${u.bio.slice(0, 50).trimEnd()}...` : u.bio}
                    </p>
                  </div>
                )}

                {/* SKILLS */}
                {skills.length > 0 && (
                  <div className="mt-auto flex flex-wrap gap-2.5 pt-1">
                    {skills.slice(0, 5).map((s) => (
                      <span
                        key={s}
                        className={`${BODY} flex h-8 items-center justify-center rounded-full bg-black px-5 pt-1 text-center text-base leading-none text-[#fff8ee]`}
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Connections;
