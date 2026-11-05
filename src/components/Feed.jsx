


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
    try {
      await axios.post(
        BASE_URL + "/request/send/" +  STATUS_MAP[status] + "/" + userId,
        {},
        { withCredentials: true }
      );
    } catch (err) {
      console.log(err.message);
    }
  };

  useEffect(() => {
    // Cards left: nothing to do, and a later empty feed may fetch again
    if (feed && feed.length > 0) {
      exhausted.current = false;
      return;
    }
    // Server already returned nothing new: stop, otherwise we'd loop forever
    if (feed && exhausted.current) return;
    const getFeed = async () => {
      try {
        // Swiped users are excluded by the backend, so page 1 is always the next batch
        const res = await axios.get(BASE_URL + "/users/feed?page=1&limit=10", {
          withCredentials: true,
        });
        if (res.data.length === 0) exhausted.current = true;
        dispatch(showFeed(res.data));
      } catch (err) {
        console.log(err.message);
      }
    };
    getFeed();
  }, [feed, dispatch]);

  const cards = (feed ?? []).slice(0, 3);

  return (
    <>
      
      <div className="flex min-h-[calc(100vh-150px)] items-center justify-center overflow-x-clip">
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
          {feed?.length === 0 && (
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