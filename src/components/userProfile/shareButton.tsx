import { useState } from "react";
// import { FiShare2 } from "react-icons/fi";
import InstagramIcon from '@mui/icons-material/Instagram';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import XIcon from '@mui/icons-material/X';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import { Link } from "react-router-dom";
import { Share } from "../../assets/svgs/tabler_share";

interface ShareButtonProps {
  post_id: number;
  title?: string;
}

const ShareButton: React.FC<ShareButtonProps> = ({post_id, title = "Check this out!" }) => {
  const [open, setOpen] = useState(false);
    const currentUrl = typeof window !== "undefined" ? window.location.href : "";


  const shareLinks = [
    {
      name: "WhatsApp",
      icon: <WhatsAppIcon sx={{color: 'green'}} className="text-green-500" />,
      link: `https://api.whatsapp.com/send?text=${encodeURIComponent(`${title} ${currentUrl}post/${post_id}`)}`,
    },
    {
      name: "Instagram",
      icon: <InstagramIcon sx={{color: 'pink'}} className="text-pink-500" />,
      link: "https://www.instagram.com", // No direct share link support
    },
    {
      name: "Twitter",
      icon: <XIcon className="text-blue-400" />,
      link: `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(`${currentUrl}post/${post_id}`)}`,
    },
    {
      name: "LinkedIn",
      icon: <LinkedInIcon className="text-blue-700" />,
      link: `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(`${currentUrl}post${post_id}`)}&title=${encodeURIComponent(title)}`,
    },
    // {
    //   name: "Gmail",
    //   icon: <FaEnvelope className="text-red-600" />,
    //   link: `mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(currentUrl)}`,
    // },
  ];

  return (
    <div className="relative inline-block text-left">
      <div
        onClick={() => setOpen(!open)}
        className="flex justify-between gap-3 w-full items-center transition"
      >
        {/* <FiShare2 className="w-5 h-5" /> */}
        <Share fill={"white"} />
        <p>Share Post via</p>
      </div>

      {open && (
        <div className="absolute right-0 mt-2 w-48 bg-dark rounded-lg shadow-lg z-10  bg-black dark:bg-white">
          {shareLinks.map((platform) => (
            <Link
              key={platform.name}
              to={platform.link}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 hover:text-black transition"
            >
              {platform.icon}
              <span className="text-sm">{platform.name}</span>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default ShareButton;
