import { NavLink } from "react-router-dom";
import logouticon from "../../assets/svgs/logout-icon.svg";
import monetIcon from "../../assets/svgs/monet-icon.svg";
import promotionIcon from "../../assets/svgs/promotion-icon.svg";
import { Button } from "@mui/material";
import { useSportlaze } from "../../hooks/useContext";

const DropBar = () => {
  const { logout } = useSportlaze();

  return (
    <div className="absolute top-[20rem] w-full bg-primary ml-[-.5rem] py-4 flex gap-2 flex-col justify-center">
      <NavLink
        to={"/promotion"}
        className={({ isActive }) =>
          `flex items center gap-4 pl-10 py-3 hover:bg-secondary ${
            isActive && "border-r-[.3rem] border-white"
          }`
        }
      >
        <img src={promotionIcon} alt="home-icon" /> <p>Promotion</p>
      </NavLink>
      <NavLink
        to={"/monetization"}
        className={({ isActive }) =>
          `flex items center gap-4 pl-10 py-3 hover:bg-secondary ${
            isActive && "border-r-[.3rem] border-white"
          }`
        }
      >
        <img src={monetIcon} alt="home-icon" /> <p>Monetization</p>
      </NavLink>

      <div className="pl-8">
        <Button
          className="flex gap-4"
          sx={{ textTransform: "capitalize" }}
          onClick={() => {logout()}}
        >
          <img src={logouticon} alt="home-icon" />{" "}
          <p className="text-white">Logout</p>
        </Button>
      </div>
    </div>
  );
};

export default DropBar;
