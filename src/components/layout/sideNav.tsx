import { Button, ClickAwayListener } from "@mui/material";
import React, { Dispatch, SetStateAction, useState } from "react";
import logo from "../../assets/1.png";
import UserIcon from "../../assets/userIcon";
import ClearOutlinedIcon from "@mui/icons-material/ClearOutlined";
import ArrowRightCircle from "../../assets/arrowRightCircle";
import Bookmark from "../../assets/bookmark";
import { NavLink } from "react-router-dom";
import LoungeIcon from "../../assets/lounge";
import { useSportlaze } from "../../hooks/useContext";
import Moon from "../../assets/svgs/Moon_alt";
import moreIcon from "../../assets/svgs/More icon.svg";
import homeIcon from "../../assets/svgs/home icon.svg";
import verifyicon from "../../assets/svgs/verify icon.svg";
import DropBar from "./drop-bart";

const SideNav: React.FC<{
  profile: boolean;
  setIsVisible: Dispatch<SetStateAction<boolean>>;
  setPostOverlay: Dispatch<SetStateAction<boolean>>;
}> = ({ profile, setIsVisible, setPostOverlay }) => {
  const { darkMode, setDarkMode, user } = useSportlaze();
  const [dropBar, setDropBar] = useState<boolean>(false);

  return (
    <ClickAwayListener onClickAway={() => setDropBar(false)}>
      <div
        className={`sliding-component gradient-bb relative pt-10 p-2 bg-[red] h-[100vh] w-[20rem] ${
          profile ? "no-profile" : "profile"
        }`}
        style={{
          position: "fixed",
          left: "0",
          top: "0",
          zIndex: "3",
          borderTopRightRadius: "1rem",
          borderBottomRightRadius: "1rem",
        }}
        // onClick={() => setDropBar(true)}
      >
        {dropBar && (
          <ClickAwayListener onClickAway={() => setDropBar(false)}>
            <DropBar />
          </ClickAwayListener>
        )}
        <Button
          onClick={() => setIsVisible(false)}
          style={{
            position: "absolute",
            top: ".5rem",
            right: "0",
            color: "red",
          }}
        >
          <ClearOutlinedIcon />
        </Button>
        <div className="border-b border-grey pb-4 mb-3">
          <div className="flex justify-center flex-col items-center mb-4">
            <img
              src={logo}
              alt="current user"
              className="h-14 w-14 rounded-[100%]"
            />
            <p className="font-bold text-xl">@{user.username ? user.username : '_'}</p>
            <p>@{user.username ? user.username : '_'}</p>
          </div>
          <div className="flex justify-around">
            <div className="flex flex-col items-center">
              <p className="text">Following</p>{" "}
              <p className="font-bold">@{user.following ? user.following : '_'}</p>
            </div>
            <div className="flex flex-col items-center">
              <p>Followers</p> <p className="font-bold">@{user.followers ? user.followers : '_'}</p>
            </div>
          </div>
        </div>
        <div className="flex flex-col justify-center mb-2 mt-4">
          <NavLink
            to={"/"}
            className={({ isActive }) =>
              `flex items center gap-4 rounded-md pl-10 py-3 hover:bg-secondary ${
                isActive && "border-r-[.3rem] border-white"
              }`
            }
          >
            {" "}
            <img src={homeIcon} alt="home-icon" /> <p>Home</p>
          </NavLink>
          <NavLink
            to={"/user"}
            className={({ isActive }) =>
              `flex items center gap-4 rounded-md pl-10 py-3 hover:bg-secondary ${
                isActive && "border-r-[.3rem] border-white"
              }`
            }
          >
            {" "}
            <UserIcon /> <p>Profile</p>
          </NavLink>
          <NavLink
            to={"/lounge"}
            className={({ isActive }) =>
              `flex items center gap-4 rounded-md pl-10 py-3 hover:bg-secondary ${
                isActive && "border-r-[.3rem] border-white"
              }`
            }
          >
            {" "}
            <LoungeIcon h={25} w={27} /> <p>Lounge</p>
          </NavLink>
          <NavLink
            to={"/bookmark"}
            className={({ isActive }) =>
              `flex items center gap-4 rounded-md pl-10 py-3 hover:bg-secondary ${
                isActive && "border-r-[.3rem] border-white"
              }`
            }
          >
            {" "}
            <Bookmark /> <p>Bookmarks</p>
          </NavLink>
          <NavLink
            to={"/verify"}
            className={({ isActive }) =>
              `flex items center gap-4 rounded-md pl-10 py-3 hover:bg-secondary ${
                isActive && "border-r-[.3rem] border-white"
              }`
            }
          >
            {" "}
            <img src={verifyicon} alt="verify_icon" /> <p>Get Verified</p>
          </NavLink>
        </div>

        <div className="flex mb-2 mt-0 text-white ml-8 pr-8">
          <Button
            variant="text"
            sx={{ textTransform: "capitalize", color: "white" }}
            className="relative gap-4 text-white pl-[-2.3rem] text-left hover:bg-secondary transition pr-8 z-20"
            onClick={() => setDropBar((prev) => !prev)}
          >
            <img src={moreIcon} alt="more-icon" />
            <span className="text-white">More</span>
          </Button>
        </div>

        <div className="flex mb-2 mt-0 text-white ml-8 pr-8">
          <Button
            variant="contained"
            color="primary"
            
            sx={{
              textTransform: "capitalize",
              background: "white",
              color: "#463a85",
              borderRadius: "3rem",
            }}
            className="gap-4 pl-[-2.3rem] text-left  py-4 w-full transition pr-8 rounded-[100%]"
            onClick={() => setPostOverlay(true)}
          >
            <div className="text-secondary">Post</div>
          </Button>
        </div>
        <div className="flex justify-center mt-4">
          <Button
            sx={{
              color: "white",
              fontWeight: "bold",
              textTransform: "capitalize",
              display: "flex",
              gap: ".5rem",
              justifyContent: "flex-start",
            }}
          >
            <p>settings and support</p> <ArrowRightCircle />
          </Button>
        </div>

        {/* toggle darkmode */}
        <div>
          <Button
            className="absolute bottom-[.1rem] cursor-pointer bg-primary"
            onClick={() => setDarkMode(!darkMode)}
          >
            <Moon />
          </Button>
        </div>
      </div>
    </ClickAwayListener>
  );
};

export default SideNav;
