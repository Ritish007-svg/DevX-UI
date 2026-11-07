


import axios from "axios";
import BASE_URL from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { showFeed } from "../utils/FeedSlice";
import { useEffect, useRef, useState } from "react"; // NEW: useState

import UserCard from "./userCard";
import EmptyFeed from "./EmptyFeed";
import SwipeableCard from "./SwipeableCard"; // NEW
import VibeFeedback from "./VibeFeedback"; // NEW
import { removeUserFromFeed } from "../utils/FeedSlice";
import { AnimatePresence, useMotionValue } from "framer-motion";
import SwipeZones from "./SwipeZones";

// ...inside Feed(), at the TOP with your other hooks (before any early return):

const Feed = () => {
  const dispatch = useDispatch();
  const dragX = useMotionValue(0);
  const feed = useSelector((store) => store.feed);
  const [exitDir, setExitDir] = useState("interested"); // NEW
  const [feedback, setFeedback] = useState(null); // NEW
  const exhausted = useRef(false); // true once the server has no more users
  const [noMore, setNoMore] = useState(false); // drives the "empty feed" screen, only after a fetch confirms it
  const pendingSwipes = useRef(new Set()); // swipe requests still in flight


  // NEW: translates the words used in the UI into the exact spelling the backend accepts
const STATUS_MAP = {
  interested: "Interested",
  ignored: "Ignored",
};
  const handleSend = async (status, userId) => {
    // NEW: decide direction + vibe before removing the card
    const decision = status.toLowerCase().includes("ignor") ? "ignored" : "interested";
    const user = feed.find((u) => u._id === userId);
    setExitDir(decision);
   setFeedback({ id: userId, name: user?.firstName, decision });
    setTimeout(() => setFeedback(null), 1600);

    dispatch(removeUserFromFeed(userId));
    const request = axios
      .post(
        BASE_URL + "/request/send/" +  STATUS_MAP[status] + "/" + userId,
        {},
        { withCredentials: true }
      )
      .catch((err) => console.log(err.message))
      .finally(() => pendingSwipes.current.delete(request));
    pendingSwipes.current.add(request);
    await request;
  };

  useEffect(() => {
    // Cards left: nothing to do, and a later empty feed may fetch again
    if (feed && feed.length > 0) {
      exhausted.current = false;
      return;
    }
    // Server already returned nothing new: stop, otherwise we'd loop forever
    if (feed && exhausted.current) return;
    let cancelled = false; // stops a stale run from updating the feed after unmount/re-run
    const getFeed = async () => {
      try {
        // Wait for in-flight swipes to be saved, or the backend would send the
        // last swiped user again in the next batch
        await Promise.all([...pendingSwipes.current]);
        if (cancelled) return;
        // Swiped users are excluded by the backend, so page 1 is always the next batch
        const res = await axios.get(BASE_URL + "/users/feed?page=1&limit=10", {
          withCredentials: true,
        });
        // Feed just ran out (not the first load): pause so the last card finishes
        // its exit animation before the next batch appears
        if (feed) await new Promise((resolve) => setTimeout(resolve, 1500));
        if (cancelled) return;
        if (res.data.length === 0) exhausted.current = true;
        setNoMore(res.data.length === 0);
        dispatch(showFeed(res.data));
      } catch (err) {
        console.log(err.message);
        setNoMore(true); // don't leave the page blank if the fetch fails
      }
    };
    getFeed();
    return () => {
      cancelled = true;
    };
  }, [feed, dispatch]);

  const cards = (feed ?? []).slice(0, 3);

  return (
    <>
      
      <div className="relative flex min-h-[calc(100vh-150px)] items-center justify-center overflow-x-clip">
        {/* Feed ran out and the next batch is on its way (the 1.5s pause).
            Sits near the top, like the "Your Dev Crew" heading on Connections */}
        {feed?.length === 0 && !noMore && (
          <h1 className="absolute inset-x-0 top-14 px-20 text-center font-['Sedan_SC'] text-4xl leading-tight text-[#fff8ee] md:text-4xl">
            Loading the next 10 users for your pleasure
          </h1>
        )}

  <div className="relative h-160 w-100">
          {/* NEW: AnimatePresence lets the removed card play its exit animation */}
          <AnimatePresence custom={exitDir}>
            {cards.map((user, index) => (
              <SwipeableCard
                key={user._id}
                pos={index}
                exitDir={exitDir}
                dragX={dragX}
                onSwipe={(status) => handleSend(status, user._id)}
>
                <UserCard user={user} onSend={handleSend} />
              </SwipeableCard>
            ))}
          </AnimatePresence>

          {/* NEW: moved inside so the last card can still animate out */}
          {feed?.length === 0 && noMore && (
            <EmptyFeed/>
          )}
        </div>
      </div>

      <VibeFeedback feedback={feedback} />
     <SwipeZones dragX={dragX} />
    </>
  );
};

export default Feed;