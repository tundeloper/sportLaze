import { Avatar } from "@mui/material";
import avat from "../../assets/user/man-studio.png";
import { Link } from "react-router-dom";
import { User } from "../../utils/interface";
import { Dispatch, SetStateAction } from "react";
import baseUrl from "../../utils/baseUrl";
import { useSportlaze } from "../../hooks/useContext";

export default function Followers({
  follow,
  following,
  setFollowings,
  setFollow,
}: {
  follow: User;
  following: User[];
  setFollowings: Dispatch<SetStateAction<User[]>>;
  setFollow: Dispatch<SetStateAction<User[]>>;
}) {
  const { setSnackIsOpen, setMessage } = useSportlaze();
  const isFollowing = following.some((foll) => foll.id === follow.id);

  const token = localStorage.getItem("access_token");
  const url = baseUrl();

  const followHandler = () => {
    if (isFollowing) {
      unFollowUser();
      setFollowings((prev) => {
        return prev.filter((foll) => foll.id !== follow.id);
      });
    } else {
      followUser();
      setFollowings((prev) => {
        return [...prev, { ...follow }];
      });
    }
  };

  const unFollowUser = async () => {
    try {
      const response = await fetch(
        `${url}/profile/unfollow/${follow.username}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data: { message: string; detail: string } = await response.json();
      if (response.status === 200) {
        setSnackIsOpen(true);
        console.log(data);
        if (following) setFollow((prev) => [...prev]);
        setMessage({ message: data.message, error: false });
      }
    } catch (error) {
      setSnackIsOpen(true);
      console.log(error);
      // setMessage({ message: data.detail, error: false });
    } finally {
      setTimeout(() => {
        setMessage({ message: "", error: false });
        setSnackIsOpen(false);
      }, 5000);
    }
  };

  const followUser = async () => {
    try {
      const response = await fetch(`${url}/profile/follow/${follow.username}`, {
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
        if (following) setFollow((prev) => [...prev]);
        setMessage({ message: data.message, error: false });
      }
    } catch (error) {
      setSnackIsOpen(true);
      console.log(error);
      // setMessage({ message: data.detail, error: false });
    } finally {
      setTimeout(() => {
        setMessage({ message: "", error: false });
        setSnackIsOpen(false);
      }, 5000);
    }
  };

  return (
    <div className="flex items-start space-x-3 p-4 bg-gray-100 rounded-lg w-full dark:bg-black">
      {/* Profile Image */}
      <Link to={`/user/${follow.username}`}>
        {follow.profile_picture ? (
          <Avatar src={follow.profile_picture} sizes={"30"} />
        ) : (
          <Avatar  sizes={"30"} />
        )}
      </Link>

      {/* User Info */}
      <div className="flex-1">
        <div className="flex flex-col space-x-2">
          <span className="font-semibold text-gray-900 dark:text-white">
            {follow?.name}
          </span>
          <div className="flex items-center space-x-2">
            <span className="text-gray-500">@{follow?.username}</span>
            <span className="bg-secondary20 text-xs px-2 py-0.5 rounded-lg text-gray-300">
              Follows you
            </span>
          </div>
        </div>
        <p className="text-gray-600 text-sm mt-1 dark:text-darkw">
          {follow?.bio ||
            "Lorem ipsum dolor sit amet consectetur. Id blandit lectus enim sit Lorem ipsum dolor sit amet, consectetur adipisicing elit. Magnam, et ex consequatur animi asperiores ut voluptatibus,"}
        </p>
      </div>

      {/* Follow Button */}
      <button
        className={`border border-secondary  text-gray-700 px-4 py-1 rounded-full ${
          isFollowing ? "hover:bg-primary" : "hover:bg-secondary"
        } hover:text-white transition-all`}
        // onMouseEnter={() => setIsHovered(true)}
        // onMouseLeave={() => setIsHovered(false)}
        onClick={followHandler}
      >
        {isFollowing ? "Unfollow" : "Follow"}
      </button>
    </div>
  );
}
