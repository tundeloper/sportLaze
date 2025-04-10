import React, { useState } from "react";
import MessageIcon from "../../assets/messageIcon";
// import BarIcon from "../../assets/NavBar";
import NotIcon from "../../assets/notifications";
import SearchIcon from "../../assets/Search";
import SideBarIcon from "../../assets/sideBarIcon";
import UserIcon from "../../assets/userIcon";
import SideNav from "./sideNav";
import { Link } from "react-router-dom";
import whiteImg from "../../assets/logoWhite.png";
import UserPost from "../userProfile/post";
import PostInput from "./post";
import MUISnackbar from "../../utils/snackBar";
import { Avatar, Button, Popover, Typography } from "@mui/material";
import { useSportlaze } from "../../hooks/useContext";

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [profile, setProfile] = useState<boolean>(false);
  const [postOverlay, setPostOverlay] = useState<boolean>(false);
  const {logout, user} = useSportlaze()

  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  return (
    <>
    {profile && <div className="w-screen h-screen fixed top-0 bg-transparent" style={{zIndex: "100"}} onClick={() => {setProfile(false)}}></div>}
      <div>
        <MUISnackbar />

        <div className="flex sticky z-[100] top-0 justify-between items-center p-4 gradient sm:p-5">
          <SideNav
            profile={profile}
            setIsVisible={setProfile}
            setPostOverlay={setPostOverlay}
          />
          {postOverlay && (
            <div
              className="bg-[#4e5257a8] h-[100vh] w-[100vw] flex justify-center items-center absolute -z-[100] top-0 left-0 "
              onClick={(e) => {
                setPostOverlay(false);
                setProfile(false);
                e.stopPropagation()
              }}
            >
              <div className="min-h-[20rem] min-w-[35rem]" onClick={(e) => {
                e.stopPropagation()
              }}>
                <PostInput />
              </div>
            </div>
          )}

          <div className="flex items-center gap-6 sm:gap-[6rem]">
            <div style={{ cursor: "pointer" }} onClick={() => setProfile(true)}>
              <SideBarIcon />
            </div>
            <div className="relative">
              <input
                type="text"
                className="w-[13rem] text-secondary p-2 pl-8 sm:w-[18rem]"
                placeholder="Search Sportlaze"
                style={{ borderRadius: "1.2rem", outline: "none" }}
              />
              <div style={{ position: "absolute", top: "10px", left: "8px" }}>
                <SearchIcon />
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="relative mr-2" style={{ borderRadius: "10rem" }}>
              {/* <Link to='/'><BarIcon /></Link> */}
              <Link to="/">
                <img src={whiteImg} alt="logo" className="w-[2.5rem]" />
              </Link>
            </div>
            <div
              className="p-[10px] bg-primary relative"
              style={{ borderRadius: "10rem" }}
            >
              <MessageIcon />
              <div
                className="flex justify-center items-center bg-[white] text-[red] text-[10px] w-4 h-4"
                style={{
                  position: "absolute",
                  top: "-.6rem",
                  right: "-.3rem",
                  borderRadius: "2rem",
                }}
              >
                3
              </div>
            </div>
            <div
              className="p-2 bg-primary relative"
              style={{ borderRadius: "10rem" }}
            >
              <NotIcon />
              <div
                className="flex justify-center items-center bg-[white] text-[red] text-[10px] w-4 h-4"
                style={{
                  position: "absolute",
                  top: "-.6rem",
                  right: "-.3rem",
                  borderRadius: "2rem",
                }}
              >
                5
              </div>
            </div>
            <section aria-describedby={id} onClick={handleClick} style={{ padding: '0', margin: '0' }}>
              <div
                className="hidden bg-primary sm:block"
                style={{ borderRadius: "10rem" }}
              >
                {user.profile_picture ? (
              <Avatar
                src={user.profile_picture}
                sx={{ width: 40, height: 40 }}
              />
            ) : (
              <Avatar sx={{ width: 40, height: 40 }}>
                {user.username && user.username[0].toLocaleUpperCase()}
              </Avatar>
            )}
              </div>
            </section>
            <Popover
              id={id}
              open={open}
              anchorEl={anchorEl}
              onClose={handleClose}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
            >
              <div className="flex flex-col items-center p-2">
              <Link to={`/user/${user.username}`} style={{color: 'gray', textTransform: 'capitalize' }} >View profile</Link>
              <Button sx={{ p: 0, color: 'gray', textTransform: 'capitalize' }} onClick={logout}>Log Out</Button>
              </div>
            </Popover>
          </div>
        </div>
        <div>{children}</div>
      </div>
    </>
  );
};

export default Layout;
