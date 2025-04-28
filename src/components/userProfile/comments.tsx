import React, { Dispatch, SetStateAction, useState } from "react";
import { Avatar, Button, IconButton, Popover, Tooltip } from "@mui/material";
import { commentsType } from "../../utils/interface";
import { MoreVert as MoreVertIcon } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { formatFullDate, timeAgo } from "../../utils/format-date";
import CommentIcon from "../../assets/comment";
import LikeIcon from "../../assets/like";
import { useSportlaze } from "../../hooks/useContext";
import axios from "axios";
import baseUrl from "../../utils/baseUrl";
import CommentFeild from "./commentField";

const CommentSection: React.FC<{
  comment: commentsType;
  setComment: Dispatch<SetStateAction<commentsType[]>>;
}> = ({ comment, setComment }) => {
  const { darkMode, user, setMessage, setSnackIsOpen } = useSportlaze();
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null
  );
  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const url = baseUrl();
  const [showReply, setShowReply] = useState(false)
  const [showReplyInput, setShowReplyInput] = useState(false)
  const [commentText, setCommentText] = useState("");
  const token = localStorage.getItem("access_token")

  const postComment = async () => {
    if (!commentText.trim()) return;
    // const feedId = feed.type === "repost" ? feed.post_id : feed.id;

    try {
      const response = await axios.post(
        `${url}/social/comments`,
        { post_id: comment.parent_id, parent_id: comment.id, content: commentText },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        // setComment((prev) => [...prev, response.data]);
        setCommentText("");
        setSnackIsOpen(true);
        setMessage({ message: "Comment added!", error: false });
        // if (setPost)
        //   setPost((prev) => {
        //     return prev.map((post) => {
        //       const feedId = feed.type === "repost" ? post.post_id : post.id;
        //       return feedId === +`${feed.type === "repost" ? feed.id : feed.id}`
        //         ? { ...post, comments_count: post.comments_count + 1 }
        //         : post;
        //     });
        //   });
      }
    } catch (error) {
      setMessage({ message: "Failed to comment", error: true });
    } finally {
      setTimeout(() => setSnackIsOpen(false), 3000);
    }
  };

  const deleteComment = async () => {
    try {
      const response = await axios.delete(
        `${url}/social/comments/${comment.id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        }
      );
      if (response.status === 200) {
        setSnackIsOpen(true);
        setMessage({ message: "Comment deleted successfully", error: false });
        setComment((prevItems) =>
          prevItems.filter((item) => item.id !== comment.id)
        );
        // if (setPost)
        //   setPost((prev) => {
        //     return prev.map((post) => {
        //       const feedId = feed.type === "repost" ? post.post_id : post.id;
        //       return feedId === +`${feed.type === "repost" ? feed.id : feed.id}`
        //         ? { ...post, comments_count: post.comments_count + 1 }
        //         : post;
        //     });
        //   });
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
  

  return (
    <div className="bg-white p-0 pt-1 rounded-lg w-full mb-1  dark:bg-black md:p-2">
      {/* Shared Label */}
      {/* check if it persoal post or other feed 
      if it's personal post indicate, if it's share indicate it as well  */}

      {/* <div className="flex items-center text-gray-500 text-sm mb-2">
        <SendIcon fontSize="small" className="mr-1" />
        <span>Shared</span>
      </div> */}

      {/* Post Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <Link to={`/user/${comment.author_username}`}>
            {comment.author_profile_picture ? (
              <Avatar
                src={comment.author_profile_picture}
                alt="user icon"
                className="w-12 h-12"
              />
            ) : (
              <Avatar alt="user icon" className="w-12 h-12">
                {comment.author_username
                  ? comment.author_username[0].toLocaleUpperCase()
                  : ""}
              </Avatar>
            )}
          </Link>
          <div>
            <Link
              to={`/user/${comment.author_username}`}
              className="font-semibold text-sm dark:text-white"
            >
              {comment.author_name}
            </Link>
            <div className="flex gap-3">
              <p className="text-gray-500 text-xs">
                @{comment.author_username}
              </p>
              <Tooltip title={`${formatFullDate(comment.created_at)}`}>
                <p className="text-gray-500 text-xs">
                  {timeAgo(`${comment.created_at}`)}
                </p>
              </Tooltip>
            </div>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          {/* {!type && user.username === comment.author_username
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
              )} */}

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
              <Button onClick={() => setShowReplyInput(prev => !prev)}>Reply</Button>
              {/* <Button>Bookmark Post</Button> */}
              {user.username === comment.author_username && (
                <Button onClick={deleteComment} sx={{ color: "red" }}>
                  Delete Comment
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
          {comment.content}
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
        {/* {feed.media_files.length > 0 ? (
          <PostScroll posts={feed.media_files} />
        ) : (
          ""
        )} */}
      </div>
      {/* {user interaction} */}
      <div className="flex justify-between items-center w-full pl-12 mt-1">
        <div className="flex items-center justify-center gap-4">
          <div
            className="flex gap-[4px] items-center pointer"
            // onClick={() => {
            //   favouriteHandler(feed.id.toString());
            // }}
          >
            <LikeIcon fill={darkMode ? "white" : "#33363F"} />

            {/* <p className="text-[13px] dark:text-white">0</p> */}
          </div>
          <div className="flex gap-[4px] items-center cursor-pointer" onClick={() => setShowReply((prev) => !prev)}>
            <CommentIcon fill={darkMode ? "white" : "#33363F"} />
            {/* <p className="text-[13px] dark:text-white">0</p> */}
          </div>
          {/* <div
            className="flex gap-[4px] items-center cursor-pointer"
            onClick={() => {
              getComment();
              setSHowComments((prev) => !prev);
            }}
          >
            <CommentIcon fill={darkMode ? "white" : "#33363F"} />
            <p className="text-[13px] dark:text-white">0</p>
          </div>
          <div className="flex gap-[4px] items-center">
            <RetweetIcon fill={darkMode ? "white" : "#222222"} />
            <p className="text-[13px] dark:text-white">0</p>
          </div> */}

          {/* <div className="flex gap-[1px] items-center">
            <SendIcon fill={darkMode ? "white" : "#222222"} />
            <p className="text-[13px] dark:text-white">0</p>
          </div> */}
        </div>
        {/* Bookmark */}
        {/* <div className="flex items-center justify-center gap-4">
          <div className="flex gap-[2px] items-center">
            <Share fill={darkMode ? "white" : "#222222"} />
          </div>
          <div className="mr-2">
            <Bookmarkicon fill={darkMode ? "white" : "#222222"} />
          </div>
        </div> */}
      </div>
      {showReplyInput && <CommentFeild commentText={commentText} setCommentText={setCommentText} postComment={postComment} />}
      <div className="flex justify-between items-center w-full pl-8 mt-1">
        {showReply && (
          <div className="flex-1">
            {comment.replies.map((rep, index) => {
              return <CommentSection key={rep.id} comment={rep} setComment={setComment} />;
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default CommentSection;
