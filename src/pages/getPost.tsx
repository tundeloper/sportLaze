import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import baseUrl from "../utils/baseUrl";
import UserProfile from "../components/userProfile/profile";
import { Post } from "../utils/interface";
import axios from "axios";
import { motion } from "framer-motion";
// import { Tooltip } from "recharts";
import { Avatar, CircularProgress } from "@mui/material";
// import { formatFullDate, timeAgo } from "../utils/format-date";
import PostScroll from "../components/userProfile/postslider";
// import UserPost from "../components/userProfile/post";

export function GetSinglePost() {
  const [post, setPost] = useState<Post>();
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  const url = baseUrl();

  const fetchPost = async () => {
    // Fetch post by id
    setLoading(true);
    try {
      const response = await axios.get(`${url}/posts/${id}`);
      console.log(response.data);
      setPost(response.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchPost();
  }, [id]);

  // useEffect(() => {
  //   // document.body
  // }, [post]);

  return (
    <>
    <UserProfile>
      <>
      {/* <DocumentPage
        title={post?.username}
        description={post?.content}
        imageUrl={post?.profile_picture}  
        /> */}
        {
          loading ? (
            <div className="flex justify-center items-center mt-6">
              <CircularProgress />
            </div>
          ) : (
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
          // <UserPost />
        }
      </>
    </UserProfile>
    </>
  );
}
