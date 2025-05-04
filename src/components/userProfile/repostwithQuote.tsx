import React, { useState, FC, Dispatch, SetStateAction } from "react";
import { Post, Repost } from "../../utils/interface";
import UserPost from "./post";
import { motion } from "framer-motion";
import axios from "axios";
import baseUrl from "../../utils/baseUrl";
import { useSportlaze } from "../../hooks/useContext";
import { formatFullDate, timeAgo } from "../../utils/format-date";
import { Avatar, Tooltip } from "@mui/material";
import { Link } from "react-router-dom";
import PostScroll from "./postslider";

interface RepostWithQuoteProps {
  originalPost?: Post;
  setshowQuote: Dispatch<SetStateAction<boolean>>;
  setReposts?: Dispatch<SetStateAction<Repost[]>>;
  setRepost: Dispatch<SetStateAction<boolean>>;
  setPosts?: Dispatch<SetStateAction<Post[]>>;
  repostHandler: () => void;
  // onSubmit?: (quote: string) => void;
}

const RepostWithQuote: FC<RepostWithQuoteProps> = ({
  originalPost,
  // onSubmit,
  setshowQuote,
  setRepost,
  setPosts,
  setReposts
}) => {
  const [quote, setQuote] = useState<string>("");
  const url = baseUrl();
  const { user, setMessage, setSnackIsOpen } = useSportlaze();
  const token = localStorage.getItem("access_token");

  const handleSubmit = async (event: React.FormEvent) => {
    event.stopPropagation();
    try {
      const { data } = await axios.post(
        `${url}/social/reposts`,
        { post_id: originalPost?.type === 'repost' ? originalPost.post_id : originalPost?.id, quote: quote },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (data) {
        const FeedId = originalPost?.type === "repost" ? originalPost.post_id : originalPost?.id
        setReposts && setReposts((prev) => [...prev, data])
        // if (setReposts) {
        //   setReposts((prevItems) =>
        //     prevItems.filter((item) => item.id !==  FeedId)
        //   );
        if (setPosts)
          setPosts((prev) => {
            return prev.map((post) => {
              const feedId = originalPost?.type === "repost" ? post.post_id : post.id;
              //increment the list of reposts count
              return feedId === +`${originalPost?.type === "repost" ? post.post_id : post.id}`
                ? { ...post, reposts_count: post.reposts_count + 1 }
                : post;
            });
          });
      }
        

        setshowQuote(false);
        setQuote("");
      
    } catch (error) {
      console.log(error);
      setSnackIsOpen(true);
      setMessage({ message: "Post already reposted", error: true });
    } finally {
      setTimeout(() => {
        setSnackIsOpen(false)
      }, 3000);
    }
    // if (onSubmit) {
    //   onSubmit(quote);
    // } else {
    //   console.log("Reposting with quote:", quote);
    // }
    // setQuote(""); 
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="fixed h-screen w-screen top-0 left-0  flex justify-center items-center mx-auto p-4 border rounded-2xl shadow-md bg-[#d1d5db80]"
      style={{ zIndex: "100" }}
      onClick={(event) => {
        setshowQuote(false);
        event.stopPropagation();
      }}
    >
      <div
        className="w-[40rem] h-auto bg-black p-3 rounded-md dark:bg-white"
        onClick={(e) => e.stopPropagation()}
      >
        {originalPost && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="bg-white p-0 pt-1 rounded-lg w-full mb-2  dark:bg-black md:p-4"
          >
            <p className="text-sm text-gray-600">Reposting:</p>
            <div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Link to={`/user/${originalPost.username}`}>
                    {originalPost.profile_picture ? (
                      <Avatar
                        src={originalPost.profile_picture}
                        alt="user icon"
                        className="w-12 h-12"
                      />
                    ) : (
                      <Avatar alt="user icon" className="w-12 h-12">
                        {originalPost.username[0].toLocaleUpperCase()}
                      </Avatar>
                    )}
                  </Link>
                  <div>
                    <Link
                      to={`/user/${originalPost.username}`}
                      className="font-semibold text-sm dark:text-white"
                    >
                      {originalPost.name}
                    </Link>
                    <div className="flex gap-3">
                      <p className="text-gray-500 text-xs">
                        @{originalPost.username}
                      </p>
                      <Tooltip
                        title={`${formatFullDate(originalPost.created_at)}`}
                      >
                        <p className="text-gray-500 text-xs">
                          {timeAgo(`${originalPost.created_at}`)}
                        </p>
                      </Tooltip>
                    </div>
                  </div>
                </div>
              </div>
              {/* content */}
              <div className="mt-2 ml-12 text-gray-700 text-sm">
                <p className="dark:text-darkw">
                  {originalPost.content}
                  {/* {feed.hashtags.length > 0 && <link>{feed.hashtags}</link>} */}
                </p>
              </div>
              <div className="mt-3 ml-12">
                {originalPost.media_files.length > 0 ? (
                  <PostScroll posts={originalPost.media_files} />
                ) : null}
              </div>
            </div>
          </motion.div>
        )}

        <motion.textarea
          initial={{ scale: 0.95 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.3 }}
          value={quote}
          onChange={(e) => setQuote(e.target.value)}
          placeholder="Add your thoughts..."
          className="w-full p-3 border rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
          rows={3}
        />

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-4 flex justify-end"
        >
          <button
            onClick={handleSubmit}
            className="bg-secondary text-white px-4 py-2 rounded-xl hover:bg-blue-700 transition"
          >
            Repost
          </button>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default RepostWithQuote;
