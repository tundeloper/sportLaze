import React from "react";
import { Avatar, Button, IconButton } from "@mui/material";
import { Send as SendIcon, MoreVert as MoreVertIcon } from "@mui/icons-material";
import postImage from "../../assets/posted picture.png";

const UserPost: React.FC = () => {
    return (
        <div className="bg-white p-4 rounded-lg w-full dark:bg-black ">
            {/* Shared Label */}
            <div className="flex items-center text-gray-500 text-sm mb-2">
                <SendIcon fontSize="small" className="mr-1" />
                <span>Shared</span>
            </div>

            {/* Post Header */}
            <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                    <Avatar
                        src="https://via.placeholder.com/50"
                        alt="SportLaze Logo"
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
                    <IconButton size="small">
                        <MoreVertIcon />
                    </IconButton>
                </div>
            </div>

            {/* Post Content */}
            <div className="mt-2 ml-12 text-gray-700 text-sm">
                <p className="dark:text-darkw">
                    🏆 Elevate your game with SportLaze!!!!! Connect, compete, and support
                    your favourite team with a community that’s as passionate as you are!
                    #SportLaze #GameOn
                </p>
            </div>

            {/* Post Image */}
            <div className="mt-3 ml-12">
                <img
                    src={postImage}
                    alt="SportLaze post image"
                    className="w-full h-auto rounded-md"
                />
            </div>
        </div>
    );
};

export default UserPost;
