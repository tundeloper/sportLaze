import React, { Dispatch, SetStateAction, useState } from "react";
import {
  Avatar,
  Button,
  CircularProgress,
  ClickAwayListener,
  IconButton,
  Popover,
  Tooltip,
} from "@mui/material";
import { MoreVert as MoreVertIcon } from "@mui/icons-material";
import BookmarkBorderOutlinedIcon from "@mui/icons-material/BookmarkBorderOutlined";
import BookmarkIcon from "@mui/icons-material/Bookmark";
// import SendIcon from "../../assets/send";
import FavoriteRoundedIcon from "@mui/icons-material/FavoriteRounded";
// import postImage from "../../assets/posted picture.png"
import CommentIcon from "../../assets/comment";
import LikeIcon from "../../assets/like";
// import Bookmarkicon from "../../assets/bookmarkIcon";
import { useSportlaze } from "../../hooks/useContext";
import {
  Bookmarks,
  commentsType,
  Post,
  Repost,
  User,
  Userprofile,
} from "../../utils/interface";
import axios from "axios";
import baseUrl from "../../utils/baseUrl";
import { removePostId, storePostId } from "../../utils/store_likes";
import { Share } from "../../assets/svgs/tabler_share";
import { formatFullDate, timeAgo } from "../../utils/format-date";
import PostScroll from "./postslider";
import { Link } from "react-router-dom";
import CommentSection from "./comments";
import CommentFeild from "./commentField";
import { RepostIcon } from "../../assets/svgs/repost";
import RepostWithQuote from "./repostwithQuote";

const UserPost: React.FC<{
  feed: Post;
  userProfile?: Userprofile;
  followers?: User[];
  setFollowers?: Dispatch<SetStateAction<User[]>>;
  type?: boolean;
  reposts: Repost[];
  setReposts?: Dispatch<SetStateAction<Repost[]>>;
  setPost?: Dispatch<SetStateAction<Post[]>>;
  bookmarks: Bookmarks[];
  setBookmarks: Dispatch<SetStateAction<Bookmarks[]>>;
}> = ({
  feed,
  type,
  setPost,
  reposts,
  setReposts,
  followers,
  setFollowers,
  bookmarks,
  setBookmarks,
}) => {
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null
  );
  const { darkMode, setMessage, setSnackIsOpen, user } = useSportlaze();
  const open = Boolean(anchorEl);
  let storedIds: string[] = JSON.parse(localStorage.getItem("postIds") || "[]");
  const [myLikes, setMylikes] = useState<string[]>(storedIds || []); //setting likes temp
  const [showComments, setSHowComments] = useState<boolean>(false);
  const [commentIsLoading, setcommentIsLoading] = useState<boolean>(false);
  const [commentText, setCommentText] = useState("");
  const [repost, setRepost] = useState<boolean>(false);
  const [showRepostWithQuote, setShowRepostWithQuote] =
    useState<boolean>(false);
  const [comments, setComments] = useState<commentsType[]>([]);
  const url = baseUrl();
  const token = localStorage.getItem("access_token");

  const followedUser =
    followers && followers.some((user) => user.username === feed.username);

  const isRepost = reposts.some(
    (post) =>
      post.original_post.id ===
      +`${feed.type === "repost" ? feed.post_id : feed.id}`
  );

  const isBookmarked = bookmarks?.some(
    (bookmarks) =>
      bookmarks.post_id ===
      +`${feed.type === "repost" ? feed.post_id : feed.id}`
  );

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const deletePost = async () => {
    try {
      const response = await axios.delete(`${url}/posts/${feed.id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.status === 200) {
        setSnackIsOpen(true);
        setMessage({ message: "Post deleted successfully", error: false });
        if (setPost)
          setPost((prevItems) =>
            prevItems.filter((item) => item.id !== feed.id)
          );
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.message === "Network Error") {
          setMessage({ message: "Your network seems to be down", error: true });
        } else {
          setMessage({ message: error.response?.data.detail, error: true });
        }
      }
    } finally {
      setTimeout(() => {
        setSnackIsOpen(false);
        setMessage({ message: "", error: false });
      }, 5000);
    }
  };

  const deleteRePost = async () => {
    try {
      const feedId = feed.type === "repost" ? feed.post_id : feed.id;
      const response = await axios.delete(`${url}/social/reposts/${feedId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.status === 200) {
        // setSnackIsOpen(true);
        // setMessage({ message: "Post deleted successfully", error: false });
        if (setReposts && type) {
          setReposts((prevItems) =>
            prevItems.filter((item) => {
              const feedId = feed.type === "repost" ? feed.post_id : item.id;
              return feedId !== feed.post_id;
            })
          );
        }
        // remove for !type post and repost in the list of feed
        if (
          (!type && setReposts && feed.username === user.username) ||
          (!type && setReposts && feed.reposter_username === user.username)
        ) {
          if (setPost)
            setPost((prevItems) =>
              prevItems.filter((item) => item.post_id !== feed.post_id)
            );
        }

        //indicate post is not reposted
        if (setReposts && !type) {
          setReposts((prevItems) => {
            return prevItems.filter((item) => {
              const feedId = feed.type === "repost" ? feed.post_id : feed.id;
              // console.log(item.post_id, feedId)
              return item.post_id !== feedId;
            });
          });
        }
        // setReposts && setReposts([]);

        // remove for type post
        if (setPost && type) {
          setPost((prevItems) =>
            prevItems.filter((item) => item.id !== feed.id)
          );
        }
      }
    } catch (error) {
      console.log(error);
      if (axios.isAxiosError(error)) {
        if (error.message === "Network Error") {
          setMessage({ message: "Your network seems to be down", error: true });
        } else {
        }
      }
    } finally {
      setTimeout(() => {
        setSnackIsOpen(false);
        setMessage({ message: "", error: false });
      }, 5000);
    }
  };

  const followHandler = (username: string | null) => {
    if (followedUser) {
      console.log(username, followers);
      setFollowers &&
        setFollowers((prev) =>
          prev.filter((user) => user.username !== username)
        );
      UnfollowUser();
      console.log("remove");
    } else {
      followUser();
      setFollowers &&
        setFollowers((prev) => [
          ...prev,
          {
            username: feed.username,
            name: feed.name,
            email: null,
            followers: null,
            following: null,
            date_of_birth: null,
            favorite_sport: null,
            favorite_team: null,
            formatted_join_date: null,
            formatted_member_since: null,
            profile_picture: "",
            location: null,
            id: null,
            bio: null,
            website: null,
            banner_image: null,
          },
        ]);
    }
  };

  const favouriteHandler = (id: string) => {
    if (myLikes.includes(id)) {
      unlikePost(id);
    } else {
      likePost(id);
    }
  };

  const likePost = async (id: string) => {
    try {
      const response = await axios.post(
        `${url}/posts/like`,
        { post_id: id },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response);
      if (response.status === 200) {
        setSnackIsOpen(true);
        setMessage({ message: "Post liked successfully ✅", error: false });
        setMylikes(storePostId(id));
        if (myLikes.includes(id)) setMylikes([...myLikes, id]);
        if (setPost)
          setPost((prev) => {
            return prev.map((post) => {
              const feedId = feed.type === "repost" ? feed.post_id : feed.id;
              const postID = post.type === "repost" ? post.post_id : post.id;
              // post.id === feed.id
              return feedId === +postID
                ? { ...post, likes_count: post.likes_count + 1 }
                : post;
            });
          });

        // if (setBookmarks)
        //   setBookmarks((prev) => {
        //     return prev.map((post) => {
        //       console.log(post);
        //       const feedId = feed.type === "repost" ? feed.post_id : feed.id;
        //       return feedId === +id
        //         ? { ...post, likes_count: post.post.likes_count + 1 }
        //         : post;
        //     });
        //   });
      }
    } catch (error) {
      console.log(error);
      if (axios.isAxiosError(error)) {
        if (error.message === "Network Error") {
          setMessage({ message: "Your network seems to be down", error: true });
        } else {
          setMessage({ message: error.response?.data.detail, error: true });
        }
      }
    } finally {
      setTimeout(() => {
        setSnackIsOpen(false);
        setMessage({ message: "", error: false });
      }, 5000);
    }
  };

  const unlikePost = async (id: string) => {
    try {
      const response = await axios.post(
        `${url}/posts/unlike`,
        { post_id: id },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response);
      if (response.status === 200) {
        setSnackIsOpen(true);
        setMessage({ message: "Post Unliked ✅", error: false });
        setMylikes(removePostId(id));
        setMylikes((prev) => prev.filter((pos) => pos !== id));
        if (setPost)
          setPost((prev) => {
            return prev.map((post) => {
              // const feedId = feed.type === "repost" ? post.post_id : post.id;

              return post.id === feed.id
                ? { ...post, likes_count: post.likes_count - 1 }
                : post;
            });
          });

        // remove for type post bookmarks
        if (setBookmarks)
          setBookmarks((prev) => {
            return prev.map((post) => {
              // const feedId = feed.type === "repost" ? post.post_id : post.id;
              return post.post.id === feed.id
                ? { ...post, likes_count: post.post.likes_count - 1 }
                : post;
            });
          });
      }
    } catch (error) {
      console.log(error);
      if (axios.isAxiosError(error)) {
        if (error.message === "Network Error") {
          setMessage({ message: "Your network seems to be down", error: true });
        } else {
          setMessage({ message: error.response?.data.detail, error: true });
        }
      }
    } finally {
      setTimeout(() => {
        setSnackIsOpen(false);
        setMessage({ message: "", error: false });
      }, 5000);
    }
  };

  const repostHandler = async () => {
    try {
      const response = await axios.post(
        `${url}/social/reposts`,
        { post_id: `${feed.type === "repost" ? feed.post_id : feed.id}` },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 200) {
        setReposts && setReposts((prev) => [...prev, response.data]);
        // setSnackIsOpen(true);
        // setMessage({ message: "Post Reposted ✅", error: false });

        if (setPost)
          setPost((prev) => {
            return prev.map((post) => {
              const feedId = feed.type === "repost" ? post.post_id : post.id;
              //increment the list of reposts count
              return feedId === feed.id
                ? { ...post, reposts_count: post.reposts_count + 1 }
                : post;
            });
          });

        //add to the repost list to indicate it is reposted
        if (setPost && !type)
          setPost((prev) => {
            return prev.map((post) => {
              const feedId = feed.type === "repost" ? post.post_id : post.id;
              return feedId === +`${feed.type === "repost" ? feedId : feed.id}`
                ? { ...post, post_id: post.id }
                : post;
            });
          });

        setRepost(false);
      }
    } catch (error) {
      console.log(error);
      if (axios.isAxiosError(error)) {
        if (error.message === "Network Error") {
          setMessage({ message: "Your network seems to be down", error: true });
        } else {
          // setMessage({ message: error.response?.data.detail, error: true });
        }
      }
    } finally {
      setTimeout(() => {
        setSnackIsOpen(false);
        setMessage({ message: "", error: false });
      }, 5000);
    }
  };

  const followUser = async () => {
    try {
      const response = await fetch(`${url}/profile/follow/${feed.username}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const data: { message: string; detail: string } = await response.json();
      if (response.status === 200) {
        setSnackIsOpen(true);
        console.log(data);
        setMessage({ message: `You followed ${feed.username}`, error: false });
      }
    } catch (error) {
      setSnackIsOpen(true);
      // setMessage({ message: data.detail, error: false });
    } finally {
      setTimeout(() => {
        setMessage({ message: "", error: false });
        setSnackIsOpen(false);
      }, 5000);
    }
  };

  const UnfollowUser = async () => {
    try {
      const response = await fetch(`${url}/profile/unfollow/${feed.username}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("Unfollowed");
      const data: { message: string; detail: string } = await response.json();
      if (response.status === 200) {
        setSnackIsOpen(true);
        console.log(data);
        setMessage({
          message: `You unfollowed ${feed.username}`,
          error: false,
        });
      }
    } catch (error) {
      setSnackIsOpen(true);
      setMessage({ message: `You unfollowed ${feed.username}`, error: true });
    } finally {
      setTimeout(() => {
        setMessage({ message: "", error: false });
        setSnackIsOpen(false);
      }, 5000);
    }
  };

  const getComment = async () => {
    const feedId = feed.type === "repost" ? feed.post_id : feed.id;

    try {
      setcommentIsLoading(true)
      const { data } = await axios.get(`${url}/social/comments/${feedId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      console.log(data);

      if (data) {
        setComments(data);
      }
    } catch (error) {
      setMessage({ message: "Failed to comment", error: true });
    } finally {
      setTimeout(() => setSnackIsOpen(false), 3000);
      setcommentIsLoading(false)
    }
  };

  const postComment = async () => {
    if (!commentText.trim()) return;
    const feedId = feed.type === "repost" ? feed.post_id : feed.id;

    try {
      const response = await axios.post(
        `${url}/social/comments`,
        { post_id: feedId, content: commentText },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        setComments((prev) => [...prev, response.data]);
        setCommentText("");
        setSnackIsOpen(true);
        setMessage({ message: "Comment added!", error: false });
        if (setPost)
          setPost((prev) => {
            return prev.map((post) => {
              const feedId = feed.type === "repost" ? post.post_id : post.id;
              return feedId === +`${feed.type === "repost" ? feed.id : feed.id}`
                ? { ...post, comments_count: post.comments_count + 1 }
                : post;
            });
          });
      }
    } catch (error) {
      setMessage({ message: "Failed to comment", error: true });
    } finally {
      setTimeout(() => setSnackIsOpen(false), 3000);
    }
  };

  const createBookmark = async () => {
    const feedId = feed.type === "repost" ? feed.post_id : feed.id;
    console.log(bookmarks, "BOOKMARK ID");

    try {
      const response = await axios.post(
        `${url}/social/bookmarks`,
        { post_id: feedId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        setSnackIsOpen(true);
        setMessage({ message: "Bookmark created", error: false });
        setBookmarks && setBookmarks((prev) => [...prev, response.data]);
      }
    } catch (error) {
      setMessage({ message: "Already bookmarked", error: true });
    } finally {
      setTimeout(() => setSnackIsOpen(false), 3000);
    }
  };

  const deleteBookmark = async () => {
    const feedId = feed.type === "repost" ? feed.post_id : feed.id;

    try {
      const response = await axios.delete(`${url}/social/bookmarks/${feedId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setBookmarks &&
        setBookmarks((prev) =>
          prev.filter((bookmarks) => bookmarks.post_id !== feedId)
        );

      if (response.status === 200) {
        setSnackIsOpen(true);
        setMessage({ message: "Bookmark deleted", error: false });
      }
    } catch (error) {
      setMessage({ message: "Already bookmarked", error: true });
    } finally {
      setTimeout(() => setSnackIsOpen(false), 3000);
    }
  };

  const id = open ? "simple-popover" : undefined;

  return feed.quote ? (
    <div className="bg-white p-0 pt-1 12 rounded-lg w-full mb-2  dark:bg-black md:p-4">
      {/* Shared Label */}
      {/* check if it persoal post or other feed 
      if it's personal post indicate, if it's share indicate it as well  */}
      {feed.type === "repost" && (
        <div className="flex gap-3 items-center text-gray-700 text-sm mb-2">
          <RepostIcon fill="#6c55e7" />
          <span className="font-semibold">
            {user.username === feed.reposter_username
              ? "You Reposted"
              : `${feed.reposter_username} Reposted`}
          </span>
        </div>
      )}

      {/* Post Header */}
      {feed.quote && <div>{feed.quote}</div>}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <Link to={`/user/${feed.username}`}>
            {feed.profile_picture ? (
              <Avatar
                src={feed.profile_picture}
                alt="user icon"
                className="w-12 h-12"
              />
            ) : (
              <Avatar alt="user icon" className="w-12 h-12">
                {feed.username ? feed.username[0].toLocaleUpperCase() : ""}
              </Avatar>
            )}
          </Link>
          <div>
            <Link
              to={`/user/${feed.username}`}
              className="font-semibold text-sm dark:text-white"
            >
              {type ? feed.name : feed.name}
            </Link>
            <div className="flex gap-3">
              <p className="text-gray-500 text-xs">
                @{type ? feed.username : feed.username}
              </p>
              <Tooltip title={`${formatFullDate(feed.created_at)}`}>
                <p className="text-gray-500 text-xs">
                  {type
                    ? timeAgo(`${feed.created_at}`)
                    : timeAgo(`${feed.created_at}`)}
                </p>
              </Tooltip>
            </div>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          {!type && user.username === feed.username
            ? null
            : !type &&
              user.name !== feed.name && (
                <button
                  className={`border border-secondary  text-gray-700 px-4 py-1 rounded-full ${
                    followedUser ? "hover:bg-primary" : "hover:bg-secondary"
                  } hover:text-white transition-all`}
                  onClick={() => followHandler(feed.username)}
                >
                  {followedUser ? "Unfollow " : "Follow"}
                </button>
              )}
          <Popover
            id={id}
            open={open}
            anchorEl={anchorEl}
            onClose={() => {
              setAnchorEl(null);
            }}
            anchorOrigin={{
              vertical: "top",
              horizontal: "center",
            }}
            transformOrigin={{
              vertical: "bottom",
              horizontal: "right",
            }}
            sx={{
              "& .MuiPaper-root": {
                backgroundColor: `${darkMode ? "white" : "black"}`,
                border: "1px solid #33363F",
                width: "300px",
              },
              "& .MuiTypography-root": {
                color: `${darkMode ? "black" : "white"}`,
              },
            }}
          >
            <div className="flex flex-col p-2">
              <Button
                onClick={() => {
                  isBookmarked ? deleteBookmark() : createBookmark();
                }}
              >
                Bookmark Post
              </Button>
              {type &&
                (user.username === feed.username ||
                  feed.reposter_username === user.username) && (
                  <Button
                    onClick={() => {
                      if (feed.type === "post") {
                        deletePost();
                      } else {
                        deleteRePost();
                      }
                    }}
                    sx={{ color: "red" }}
                  >
                    Delete Post
                  </Button>
                )}
            </div>
          </Popover>
          <IconButton
            aria-describedby={id}
            size="small"
            className="bg-white"
            onClick={handleClick}
          >
            <MoreVertIcon className="text-secondary" />
          </IconButton>
        </div>
      </div>

      {/* Post Content */}
      <div className="mt-2 ml-12 text-gray-700 text-sm">
        <p className="dark:text-darkw">
          {feed.content}
          {/* {feed.hashtags.length > 0 && <link>{feed.hashtags}</link>} */}
        </p>
      </div>

      {/* Post Image */}
      <div className="mt-3 ml-12">
        {/* <img
          src={postImage}
          alt="SportLaze post image"
          className="w-full h-auto rounded-md"
        /> */}
        {feed.media_files.length > 0 ? (
          <PostScroll posts={feed.media_files} />
        ) : null}
      </div>
      {/* {user interaction} */}
      <div className="flex justify-between items-center w-full pl-12 mt-1">
        <div className="flex items-center justify-center gap-4">
          <div
            className="flex gap-[4px] items-center cursor-pointer"
            onClick={() => {
              favouriteHandler(
                feed.type === "repost"
                  ? feed.post_id.toString()
                  : feed.id.toString()
              );
            }}
          >
            {myLikes.includes(
              feed.type === "repost"
                ? feed.post_id.toString()
                : feed.id.toString()
            ) ? (
              <FavoriteRoundedIcon color="primary" sx={{ color: "red" }} />
            ) : (
              <LikeIcon fill={darkMode ? "white" : "#33363F"} />
            )}
            <p className="text-[13px] dark:text-white">{feed.likes_count}</p>
          </div>
          <div
            className="flex gap-[4px] items-center cursor-pointer"
            onClick={() => {
              getComment();
              setSHowComments((prev) => !prev);
            }}
          >
            <CommentIcon fill={darkMode ? "white" : "#33363F"} />
            <p className="text-[13px] dark:text-white">
              {feed.comments_count ? feed.comments_count : 0}
            </p>
          </div>

          <div
            className="flex gap-[4px] items-center cursor-pointer relative"
            onClick={() => {
              setRepost((prev) => !prev);
            }}
          >
            {repost && (
              <ClickAwayListener onClickAway={() => setRepost(false)}>
                <div className="absolute w-max top-6 bg-black dark:bg-white rounded-md shadow-lg">
                  <div
                    className="flex gap-2 cursor-pointer p-1 hover:bg-secondary rounded-md"
                    onClick={() => {
                      feed.reposter_username === user.username || isRepost
                        ? deleteRePost()
                        : repostHandler();
                    }}
                  >
                    <RepostIcon fill={darkMode ? "#222222" : "white"} />
                    {user.username === feed.reposter_username || isRepost ? (
                      <p className="font-semibold text-white dark:text-black">
                        Undo Repost
                      </p>
                    ) : (
                      <p className="font-semibold text-white dark:text-black">
                        Repost
                      </p>
                    )}
                  </div>
                  {/* <div className="flex gap-2 cursor-pointer p-1 hover:bg-secondary rounded-md">
                    <RepostIcon fill={darkMode ? "#222222" : "white"} />
                    <p className="font-semibold text-white dark:text-black">
                      Quote
                    </p>
                  </div> */}
                  {user.username === feed.reposter_username ||
                  isRepost ? null : (
                    <div
                      className="flex gap-2 cursor-pointer p-1 hover:bg-secondary rounded-md"
                      onClick={() => {
                        setShowRepostWithQuote(true);
                      }}
                    >
                      <RepostIcon fill={darkMode ? "#222222" : "white"} />
                      <p className="font-semibold text-white dark:text-black">
                        Quote
                      </p>
                    </div>
                  )}
                </div>
              </ClickAwayListener>
            )}
            {user.username === feed.reposter_username || isRepost ? (
              <>
                <RepostIcon fill={"#6c55e7"} />
                <p className="text-[13px] text-[#6c55e7]">
                  {feed.reposts_count}
                </p>
              </>
            ) : (
              <>
                <RepostIcon fill={darkMode ? "white" : "#222222"} />
                <p className="text-[13px] dark:text-white">
                  {feed.reposts_count}
                </p>
              </>
            )}
          </div>
          {/* {true && <RepostwithQuote />} */}
          {/* <div className="flex gap-[1px] items-center">
            <SendIcon fill={darkMode ? "white" : "#222222"} />
            <p className="text-[13px] dark:text-white">0</p>
          </div> */}
        </div>
        {/* Bookmark */}
        <div className="flex items-center justify-center gap-4">
          <div className="flex gap-[2px] items-center">
            <Share fill={darkMode ? "white" : "#222222"} />
            <p className="text-[13px] dark:text-white">{feed.comments_count}</p>
          </div>
          <div className="mr-2 cursor-pointer" onClick={createBookmark}>
            {isBookmarked ? (
              <BookmarkIcon
                sx={{ color: `${darkMode ? "white" : "#222222"}` }}
              />
            ) : (
              <BookmarkBorderOutlinedIcon
                sx={{ color: `${darkMode ? "white" : "#222222"}` }}
              />
            )}
            {/* <Bookmarkicon fill={darkMode ? "white" : "#222222"} /> */}

            {/* <Bookmarkicon fill={darkMode ? "white" : "#222222"} /> */}
          </div>
        </div>
      </div>

      {/* qoute */}

      {/* <ClickAwayListener onClickAway={() => setRepost(false)}> */}

      {/* </ClickAwayListener> */}

      {/* comment section */}
      {showComments && (
        <ClickAwayListener onClickAway={() => setSHowComments(false)}>
          <>
            <div className="flex justify-between flex-col w-full mt-4">
              <CommentFeild
                commentText={commentText}
                setCommentText={setCommentText}
                postComment={postComment}
              />
              {/* comment list */}
              {/* <div className="bg-white p-0 pt-1 rounded-lg w-full mb-2  dark:bg-black md:p-4"> */}
              <div className="mt-3 space-y-2">
                {comments.length > 0 ? (
                  comments.map((comment, idx) => (
                    <CommentSection
                      comment={comment}
                      key={idx}
                      setComment={setComments}
                      postId={comment.post_id}
                      // setPost={setPost}
                      // postId={feed.type === "repost" ? feed.post_id : feed.id}
                    />
                  ))
                ) : commentIsLoading ? <CircularProgress size={20}/> : (
                  <p className="text-xs text-gray-400 flex justify-center">
                    No comments yet,
                  </p>
                )}
              </div>
            </div>
          </>
        </ClickAwayListener>
      )}
      {showRepostWithQuote && (
        <RepostWithQuote
          originalPost={feed}
          setshowQuote={setShowRepostWithQuote}
          setReposts={setReposts}
          repostHandler={repostHandler}
          setPosts={setPost}
          setRepost={setRepost}
        />
      )}
    </div>
  ) : (
    //////////////////////// Repost Or Quote ////////////////////////
    <div className="bg-white p-0 pt-1 12 rounded-lg w-full mb-2  dark:bg-black md:p-4">
      {/* Shared Label */}
      {/* check if it persoal post or other feed 
      if it's personal post indicate, if it's share indicate it as well  */}

      {feed.type === "repost" && (
        <div className="flex gap-3 items-center text-gray-700 text-sm mb-2">
          <RepostIcon fill="#6c55e7" />
          <span className="font-semibold">
            {user.username === feed.reposter_username
              ? "You Reposted"
              : `${feed.reposter_username} Reposted`}
          </span>
        </div>
      )}

      {/* Post Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <Link to={`/user/${feed.username}`}>
            {feed.profile_picture ? (
              <Avatar
                src={feed.profile_picture}
                alt="user icon"
                className="w-12 h-12"
              />
            ) : (
              <Avatar alt="user icon" className="w-12 h-12">
                {feed.username ? feed.username[0].toLocaleUpperCase() : ""}
              </Avatar>
            )}
          </Link>
          <div>
            <Link
              to={`/user/${feed.username}`}
              className="font-semibold text-sm dark:text-white"
            >
              {type ? feed.name : feed.name}
            </Link>
            <div className="flex gap-3">
              <p className="text-gray-500 text-xs">
                @{type ? feed.username : feed.username}
              </p>
              <Tooltip title={`${formatFullDate(feed.created_at)}`}>
                <p className="text-gray-500 text-xs">
                  {type
                    ? timeAgo(`${feed.created_at}`)
                    : timeAgo(`${feed.created_at}`)}
                </p>
              </Tooltip>
            </div>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          {!type && user.username === feed.username
            ? null
            : !type &&
              user.name !== feed.name && (
                <button
                  className={`border border-secondary  text-gray-700 px-4 py-1 rounded-full ${
                    followedUser ? "hover:bg-primary" : "hover:bg-secondary"
                  } hover:text-white transition-all`}
                  onClick={() => followHandler(feed.username)}
                >
                  {followedUser ? "Unfollow " : "Follow"}
                </button>
              )}
          <Popover
            id={id}
            open={open}
            anchorEl={anchorEl}
            onClose={() => {
              setAnchorEl(null);
            }}
            anchorOrigin={{
              vertical: "top",
              horizontal: "center",
            }}
            transformOrigin={{
              vertical: "bottom",
              horizontal: "right",
            }}
            sx={{
              "& .MuiPaper-root": {
                backgroundColor: `${darkMode ? "white" : "black"}`,
                border: "1px solid #33363F",
                width: "300px",
              },
              "& .MuiTypography-root": {
                color: `${darkMode ? "black" : "white"}`,
              },
            }}
          >
            <div className="flex flex-col p-2">
              <Button
                sx={{ textTransform: "capitalizen" }}
                onClick={() => {
                  isBookmarked ? deleteBookmark() : createBookmark();
                }}
              >
                {isBookmarked ? "delete Bookmark" : "Bookmarks"}
              </Button>
              {type &&
                (user.username === feed.username ||
                  feed.reposter_username === user.username) && (
                  <Button
                    onClick={() => {
                      if (feed.type === "post") {
                        deletePost();
                      } else {
                        deleteRePost();
                      }
                    }}
                    sx={{ color: "red" }}
                  >
                    Delete Post
                  </Button>
                )}
            </div>
          </Popover>
          <IconButton
            aria-describedby={id}
            size="small"
            className="bg-white"
            onClick={handleClick}
          >
            <MoreVertIcon className="text-secondary" />
          </IconButton>
        </div>
      </div>

      {/* Post Content */}
      <div className="mt-2 ml-12 text-gray-700 text-sm">
        <p className="dark:text-darkw">
          {feed.content}
          {/* {feed.hashtags.length > 0 && <link>{feed.hashtags}</link>} */}
        </p>
      </div>

      {/* Post Image */}
      <div className="mt-3 ml-12">
        {/* <img
          src={postImage}
          alt="SportLaze post image"
          className="w-full h-auto rounded-md"
        /> */}
        {feed.media_files.length > 0 ? (
          <PostScroll posts={feed.media_files} />
        ) : null}
      </div>
      {/* {user interaction} */}
      <div className="flex justify-between items-center w-full pl-12 mt-1">
        <div className="flex items-center justify-center gap-4">
          <div
            className="flex gap-[4px] items-center cursor-pointer"
            onClick={() => {
              favouriteHandler(
                feed.type === "repost"
                  ? feed.post_id.toString()
                  : feed.id.toString()
              );
            }}
          >
            {myLikes.includes(
              feed.type === "repost"
                ? feed.post_id.toString()
                : feed.id.toString()
            ) ? (
              <FavoriteRoundedIcon color="primary" sx={{ color: "red" }} />
            ) : (
              <LikeIcon fill={darkMode ? "white" : "#33363F"} />
            )}
            <p className="text-[13px] dark:text-white">{feed.likes_count}</p>
          </div>
          <div
            className="flex gap-[4px] items-center cursor-pointer"
            onClick={() => {
              getComment();
              setSHowComments((prev) => !prev);
            }}
          >
            <CommentIcon fill={darkMode ? "white" : "#33363F"} />
            <p className="text-[13px] dark:text-white">
              {feed.comments_count ? feed.comments_count : 0}
            </p>
          </div>

          <div
            className="flex gap-[4px] items-center cursor-pointer relative"
            onClick={() => {
              setRepost((prev) => !prev);
            }}
          >
            {repost && (
              <ClickAwayListener onClickAway={() => setRepost(false)}>
                <div className="absolute w-max top-6 bg-black dark:bg-white rounded-md shadow-lg">
                  <div
                    className="flex gap-2 cursor-pointer p-1 hover:bg-secondary rounded-md"
                    onClick={() => {
                      feed.reposter_username === user.username || isRepost
                        ? deleteRePost()
                        : repostHandler();
                    }}
                  >
                    <RepostIcon fill={darkMode ? "#222222" : "white"} />
                    {user.username === feed.reposter_username || isRepost ? (
                      <p className="font-semibold text-white dark:text-black">
                        Undo Repost
                      </p>
                    ) : (
                      <p className="font-semibold text-white dark:text-black">
                        Repost
                      </p>
                    )}
                  </div>
                  {/* <div className="flex gap-2 cursor-pointer p-1 hover:bg-secondary rounded-md">
                    <RepostIcon fill={darkMode ? "#222222" : "white"} />
                    <p className="font-semibold text-white dark:text-black">
                      Quote
                    </p>
                  </div> */}
                  {user.username === feed.reposter_username ||
                  isRepost ? null : (
                    <div
                      className="flex gap-2 cursor-pointer p-1 hover:bg-secondary rounded-md"
                      onClick={() => {
                        setShowRepostWithQuote(true);
                      }}
                    >
                      <RepostIcon fill={darkMode ? "#222222" : "white"} />
                      <p className="font-semibold text-white dark:text-black">
                        Quote
                      </p>
                    </div>
                  )}
                </div>
              </ClickAwayListener>
            )}
            {user.username === feed.reposter_username || isRepost ? (
              <>
                <RepostIcon fill={"#6c55e7"} />
                <p className="text-[13px] text-[#6c55e7]">
                  {feed.reposts_count ? feed.reposts_count : 0}
                </p>
              </>
            ) : (
              <>
                <RepostIcon fill={darkMode ? "white" : "#222222"} />
                <p className="text-[13px] dark:text-white">
                  {feed.reposts_count ? feed.reposts_count : 0}
                </p>
              </>
            )}
          </div>
          {/* {true && <RepostwithQuote />} */}
          {/* <div className="flex gap-[1px] items-center">
            <SendIcon fill={darkMode ? "white" : "#222222"} />
            <p className="text-[13px] dark:text-white">0</p>
          </div> */}
        </div>
        {/* Bookmark */}
        <div className="flex items-center justify-center gap-4">
          <div className="flex gap-[2px] items-center">
            <Share fill={darkMode ? "white" : "#222222"} />
            {/* <p className="text-[13px] dark:text-white">0</p> */}
          </div>
          <div
            className="mr-2 cursor-pointer"
            onClick={() => {
              isBookmarked ? deleteBookmark() : createBookmark();
            }}
          >
            {/* <Bookmarkicon fill={darkMode ? "white" : "#222222"} /> */}
            {isBookmarked ? (
              <BookmarkIcon
                sx={{ color: `${darkMode ? "white" : "#222222"}` }}
              />
            ) : (
              <BookmarkBorderOutlinedIcon
                sx={{ color: `${darkMode ? "white" : "#222222"}` }}
              />
            )}
          </div>
        </div>
      </div>

      {/* qoute */}

      {/* <ClickAwayListener onClickAway={() => setRepost(false)}> */}

      {/* </ClickAwayListener> */}

      {/* comment section */}
      {showComments && (
        <ClickAwayListener onClickAway={() => setSHowComments(false)}>
          <>
            <div className="flex justify-between flex-col w-full pl-12 mt-4 pr-4">
              <CommentFeild
                commentText={commentText}
                setCommentText={setCommentText}
                postComment={postComment}
              />
              {/* comment list */}
              {/* <div className="bg-white p-0 pt-1 rounded-lg w-full mb-2  dark:bg-black md:p-4"> */}
              <div className="mt-3 space-y-2">
                {comments.length > 0 ? (
                  comments.map((comment, idx) => (
                    <CommentSection
                      comment={comment}
                      key={idx}
                      setComment={setComments}
                    />
                  ))
                ) : (
                  <p className="text-xs text-gray-400 flex justify-center">
                    No comments yet
                  </p>
                )}
              </div>
            </div>
          </>
        </ClickAwayListener>
      )}
      {showRepostWithQuote && (
        <RepostWithQuote
          originalPost={feed}
          setshowQuote={setShowRepostWithQuote}
          setReposts={setReposts}
          repostHandler={repostHandler}
          setPosts={setPost}
          setRepost={setRepost}
        />
      )}
    </div>
  );
};

export default UserPost;
