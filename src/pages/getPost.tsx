import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import baseUrl from "../utils/baseUrl";
import UserProfile from "../components/userProfile/profile";
import { Post } from "../utils/interface";
import axios from "axios";
import { motion } from "framer-motion";
import { Tooltip } from "recharts";
import { Avatar } from "@mui/material";
import { formatFullDate, timeAgo } from "../utils/format-date";
import PostScroll from "../components/userProfile/postslider";

export function GetSinglePost() {
    const [post, setPost] = useState<Post>();
  const { id } = useParams();
  const url = baseUrl();

  const fetchPost = async () => {
      // Fetch post by id
      try {
        const response = await axios.get(`${url}/posts/${id}`);
        console.log(response.data );
        setPost(response.data);
        
    } catch (error) {
        console.log(error)
    }
  };
  useEffect(() => {
    fetchPost()
    console.log(id);
  }, [id]);

  return <UserProfile>
    <>
        {/* <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="fixed h-screen w-screen top-0 left-0  flex justify-center items-center mx-auto p-4 border rounded-2xl shadow-md bg-[#d1d5db80]"
          style={{ zIndex: "100" }}
          onClick={(event) => {
            setshowQuote(false);
            event.stopPropagation();
          }}
        > */}
          <div
            className="w-full h-auto bg-black p-3 rounded-md dark:bg-white"
            onClick={(e) => e.stopPropagation()}
          >
            (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="bg-white p-0 pt-1 rounded-lg w-full mb-2  dark:bg-black md:p-4"
              >
                {/* <p className="text-sm text-gray-600">Reposting:</p> */}
                <div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <Link to={`/user/${post?.username}`}>
                        {post?.profile_picture ? (
                          <Avatar
                            src={post?.profile_picture}
                            alt="user icon"
                            className="w-12 h-12"
                          />
                        ) : (
                          <Avatar alt="user icon" className="w-12 h-12">
                            {post?.username[0].toLocaleUpperCase()}
                          </Avatar>
                        )}
                      </Link>
                      <div>
                        <Link
                          to={`/user/${post?.username}`}
                          className="font-semibold text-sm dark:text-white"
                        >
                          {post?.name}
                        </Link>
                        <div className="flex gap-3">
                          <p className="text-gray-500 text-xs">
                            @{post?.username}
                          </p>
                          {/* {post && <Tooltip
                            title={`${formatFullDate(post.created_at)}`}
                          >
                            <p className="text-gray-500 text-xs">
                              {timeAgo(`${post?.created_at}`)}
                            </p>
                          </Tooltip>} */}
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* content */}
                  <div className="mt-2 ml-12 text-gray-700 text-sm">
                    <p className="dark:text-darkw">
                      {post?.content}
                      {/* {feed.hashtags.length > 0 && <link>{feed.hashtags}</link>} */}
                    </p>
                  </div>
                  <div className="mt-3 ml-12">
                    {post && post?.media_files.length > 0 ? (
                      <PostScroll posts={post.media_files} />
                    ) : null}
                  </div>
                </div>
              </motion.div>
            )
  
          </div>
        {/* </motion.div> */}
        </>
  </UserProfile>;
}
