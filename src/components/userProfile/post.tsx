import React, { Dispatch, SetStateAction } from "react";
import { Avatar, Button, IconButton, Popover } from "@mui/material";
import { MoreVert as MoreVertIcon } from "@mui/icons-material";
import SendIcon from "../../assets/send";
// import postImage from "../../assets/poste/d picture.png";
import CommentIcon from "../../assets/comment";
import LikeIcon from "../../assets/like";
import Bookmarkicon from "../../assets/bookmarkIcon";
import { useSportlaze } from "../../hooks/useContext";
import { Post } from "../../utils/interface";
import axios from "axios";
import baseUrl from "../../utils/baseUrl";

const UserPost: React.FC<{
  feed: Post;
  type?: boolean;
  setPost?: Dispatch<SetStateAction<Post[]>>;
}> = ({ feed, type, setPost }) => {
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null
  );

  const { darkMode, setMessage, setSnackIsOpen, user } = useSportlaze();
  const open = Boolean(anchorEl);
  const url = baseUrl();
  const token = localStorage.getItem("access_token");

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const deletePost = async () => {
    console.log(feed.id);
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

  const likePost = async () => {
    try {
      const response = await axios.post(
        `https://lazeapi-v1.onrender.com/v1/posts/like`,
        { post_id: 45 },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response);
      if (response.status === 200) {
        setSnackIsOpen(true);
        setMessage({ message: "Post liked successfully", error: false });
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

  const followUser = async () => {
    console.log(feed.username);
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
        setMessage({ message: data.message, error: false });
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

  const id = open ? "simple-popover" : undefined;

  return (
    <div className="bg-white p-0 pt-1 rounded-lg w-full dark:bg-black md:p-4">
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
          <Avatar
            src="https://via.placeholder.com/50"
            alt="user icon"
            className="w-12 h-12"
          />
          <div>
            <p className="font-semibold text-sm">
              {type ? user.name : feed.name}
            </p>
            <p className="text-gray-500 text-xs">
              @{type ? user.username : feed.username}
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          {!type && (
            <Button
              variant="text"
              className="text-blue-500 font-semibold capitalize"
              onClick={followUser}
            >
              FOLLOW
            </Button>
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
              <Button>Bookmark Post</Button>
              {type && (
                <Button onClick={deletePost} sx={{ color: "red" }}>
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
      {/* <div className="mt-3 ml-12">
        <img
          src={postImage}
          alt="SportLaze post image"
          className="w-full h-auto rounded-md"
        />
      </div> */}
      {/* {user interaction} */}
      <div className="flex justify-between items-center w-full pl-12 mt-1">
        <div className="flex items-center justify-center gap-4">
          <div className="flex gap-[4px] items-center" onClick={likePost}>
            <LikeIcon fill={darkMode ? "white" : "#33363F"} />{" "}
            <p className="text-[13px] dark:text-white">{feed.likes_count}</p>
          </div>
          <div className="flex gap-[4px] items-center">
            <CommentIcon fill={darkMode ? "white" : "#33363F"} />{" "}
            <p className="text-[13px] dark:text-white">0</p>
          </div>
          <div className="flex gap-[1px] items-center">
            <SendIcon fill={darkMode ? "white" : "#222222"} />
            <p className="text-[13px] dark:text-white">0</p>
          </div>
        </div>
        {/* Bookmark */}
        <div className="mr-2">
          <Bookmarkicon fill={darkMode ? "white" : "#222222"} />
        </div>
      </div>
    </div>
  );
};

export default UserPost;
