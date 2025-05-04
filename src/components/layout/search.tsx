import { Link } from "react-router-dom";
import SearchIcon from "../../assets/Search";
import { LoungeType, User } from "../../utils/interface";
import { Avatar } from "@mui/material";
import { motion } from "framer-motion";

export const Search = () => {
  return (
    <>
      <div className="relative">
        <input
          type="text"
          className="w-[13rem] text-secondary bg-white p-2 pl-8 sm:w-[18rem]"
          placeholder="Search Sportlaze"
          style={{ borderRadius: "1.2rem", outline: "none" }}
        />
        <div style={{ position: "absolute", top: "10px", left: "8px" }}>
          <SearchIcon />
        </div>
      </div>
    </>
  );
};

export const SearchUser: React.FC<{ user: User }> = ({ user }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="mb-4"
    >
      <Link
        to={`/user/${user.username}`}
        key={user.id}
        className="flex items-center gap-2 p-2 hover:bg-blue-600 rounded-md"
      >
        {user.profile_picture ? (
          <Avatar src={user.profile_picture} sx={{ width: 40, height: 40 }} />
        ) : (
          <Avatar sx={{ width: 40, height: 40 }}>
            {user.username && user.username[0].toLocaleUpperCase()}
          </Avatar>
        )}
        <div className="flex flex-col">
          <p className="text-[white] text-[.8rem] font-semibold">{user.name}</p>
          <p className="text-[white] text-[.7rem] font-semibold">
            @{user.username}
          </p>
        </div>
      </Link>
    </motion.div>
  );
};

export const SearchLouge: React.FC<{ lounge: LoungeType }> = ({ lounge }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="mb-4"
    >
      <Link
        to={`/lounge/${lounge.slug}`}
        className="flex gap-2 items-center p-2 hover:bg-blue-600 rounded-md"
      >
        <div className="w-[8rem] h-[5rem] rounded-md overflow-hidden">
          <img src={lounge.icon} alt={lounge.slug} className="h-full w-full" />
        </div>
        <div className=" flex flex-col">
          <p className="mb-2">{lounge.name}</p>
          <p className="">{lounge.description}</p>
        </div>
      </Link>
    </motion.div>
  );
};
