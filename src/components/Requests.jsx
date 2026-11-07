import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import BASE_URL from "../utils/constants";
import getAvatar, { getDefaultAvatar } from "../utils/getAvatar";
import { addRequests, removeRequests } from "../utils/requestSlice";

const HEADING = "font-['Sedan_SC']";
const BODY = "font-['Borel']";

const getSkills = (skills) => {
  if (Array.isArray(skills)) return skills.filter(Boolean);
  if (typeof skills === "string")
    return skills.split(",").map((s) => s.trim()).filter(Boolean);
  return [];
};

const Requests = () => {
  const dispatch = useDispatch();
  const requests = useSelector((store) => store.requests);
  const [error, setError] = useState("");
  const [busyId, setBusyId] = useState(null);

  useEffect(() => {
    if (requests) return; // already loaded
    const fetchRequests = async () => {
      try {
        const res = await axios.get(BASE_URL + "/users/requests/pending", {
          withCredentials: true,
        });
        dispatch(addRequests(res.data.data ?? []));
      } catch (err) {
        console.log(err.response?.status, err.response?.data || err.message);
        setError("Could not load requests.");
      }
    };
    fetchRequests();
  }, [requests, dispatch]);

  // status: "accepted" | "rejected"
  const reviewRequest = async (status, requestId) => {
    setBusyId(requestId);
    try {
      await axios.post(
        `${BASE_URL}/request/review/${status}/${requestId}`,
        {},
        { withCredentials: true }
      );
      dispatch(removeRequests(requestId));
    } catch (err) {
      console.log(err.response?.status, err.response?.data || err.message);
      setError(`Could not ${status === "accepted" ? "accept" : "reject"} request.`);
    } finally {
      setBusyId(null);
    }
  };

  return (
    <div className="mx-auto flex w-full max-w-4xl flex-col items-center gap-10 px-4 py-12">
      <div className="text-center">
        <h1 className={`${HEADING} text-4xl leading-tight text-[#fff8ee] md:text-5xl`}>
          Incoming Requests
        </h1>
        <p className={`${BODY} mt-10 text-2xl text-[#fff8ee]/60 md:text-2xl`}>
          Devs who want to team up with you.
        </p>
      </div>

      {error && <p className={`${BODY} text-2xl text-[#fff8ee]`}>{error}</p>}
      {!error && requests === null && (
        <p className={`${BODY} text-2xl text-[#fff8ee]`}>Loading...</p>
      )}
      {!error && requests?.length === 0 && (
        <p className={`${BODY} text-2xl text-[#fff8ee]`}>
          No pending requests right now.
        </p>
      )}

      <div className="flex w-full flex-col gap-10">
        {(requests || []).map((r) => {
          // backend populates the sender as fromUserId
          const u = r.fromUserId ?? r.fromUser ?? r;
          const skills = getSkills(u.skills);
          const busy = busyId === r._id;
          return (
            <div
              key={r._id}
              className="flex flex-col gap-4 rounded-3xl border-[1.5px] border-black bg-[#fff8ee] p-6 sm:min-h-52 sm:flex-row sm:items-center"
            >
              <img
                src={getAvatar(u)}
                onError={(e) => (e.currentTarget.src = getDefaultAvatar(u))}
                alt={u.firstName}
                className="h-40 w-full shrink-0 rounded-2xl border-[4px] border-black object-cover object-top sm:h-40 sm:w-40"
              />

              <div className="flex min-w-0 flex-1 flex-col gap-2">
                <h2 className={`${HEADING} truncate text-3xl capitalize leading-normal text-black`}>
                  {[`${u.firstName ?? ""} ${u.lastName ?? ""}`.trim(), u.age, u.gender]
                    .filter(Boolean)
                    .join(" · ")}
                </h2>

                {u.bio && (
                  <p className={`${BODY} text-lg leading-normal text-black/80`}>
                    {u.bio.length > 90 ? `${u.bio.slice(0, 90).trimEnd()}...` : u.bio}
                  </p>
                )}

                {skills.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {skills.slice(0, 5).map((s) => (
                      <span
                        key={s}
                        className={`${BODY} flex h-7 items-center rounded-full bg-black px-4 pt-1 text-sm leading-none text-[#fff8ee]`}
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              <div className="flex shrink-0 gap-3 sm:flex-col">
                <button
                  disabled={busy}
                  onClick={() => reviewRequest("accepted", r._id)}
                  className={`${BODY} flex-1 cursor-pointer rounded-full bg-black px-6 pb-1 pt-2 text-lg text-[#fff8ee] transition hover:opacity-80 disabled:opacity-50`}
                >
                  Accept
                </button>
                <button
                  disabled={busy}
                  onClick={() => reviewRequest("rejected", r._id)}
                  className={`${BODY} flex-1 cursor-pointer rounded-full border-[1.5px] border-black px-6 pb-1 pt-2 text-lg text-black transition hover:bg-black/10 disabled:opacity-50`}
                >
                  Reject
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Requests;
