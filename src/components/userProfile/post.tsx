import React from "react";
import { Avatar, Button, IconButton } from "@mui/material";
import {
  Send as SendIcon,
  MoreVert as MoreVertIcon,
} from "@mui/icons-material";
import postImage from "../../assets/posted picture.png";
import CommentIcon from "../../assets/comment";
import LikeIcon from "../../assets/like";
import Bookmarkicon from "../../assets/bookmarkIcon";
import { useSportlaze } from "../../hooks/useContext";
import { feedType } from "../landing";

const UserPost: React.FC<{feed: feedType}> = ({feed}) => {
  const { darkMode } = useSportlaze();

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
            <p className="font-semibold text-sm">SportLaze Community</p>
            <p className="text-gray-500 text-xs">@sportlaze</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="text"
            className="text-blue-500 font-semibold capitalize"
          >
            FOLLOW
          </Button>
          <IconButton size="small" className="bg-white">
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
          <div className="flex gap-[4px] items-center">
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
