import { Avatar } from "@mui/material";
import avat from "../../assets/user/man-studio.png"
import { Link } from "react-router-dom";
import { User } from "../../utils/interface";

export default function Follow ({follow}: {follow?: User}) {
    return (
      <div className="flex items-start space-x-3 p-4 bg-gray-100 rounded-lg w-full dark:bg-black">
        {/* Profile Image */}
        <Link to={'#'} ><Avatar src={avat} sizes={'30'} /> </Link>
  
        {/* User Info */}
        <div className="flex-1">
          <div className="flex flex-col space-x-2">
            <span className="font-semibold text-gray-900 dark:text-white">{follow?.name}</span>
            <div className="flex items-center space-x-2">
            <span className="text-gray-500">@{follow?.username}</span>
            <span className="bg-secondary20 text-xs px-2 py-0.5 rounded-lg text-gray-300">
              Follows you
            </span>
            </div>
          </div>
          <p className="text-gray-600 text-sm mt-1 dark:text-darkw">
            {follow?.bio || "Lorem ipsum dolor sit amet consectetur. Id blandit lectus enim sit Lorem ipsum dolor sit amet, consectetur adipisicing elit. Magnam, et ex consequatur animi asperiores ut voluptatibus, voluptatem porro incidunt facilis, quis accusamus dolor laudantium laboriosam quam. Quod dolorum totam magni."}
          </p>
        </div>
  
        {/* Follow Button */}
        <button className="border border-secondary text-gray-700 px-4 py-1 rounded-full hover:bg-gray-200">
          Following
        </button>
      </div>
    );
  }