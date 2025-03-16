import { Avatar, Button, TextareaAutosize, ClickAwayListener } from "@mui/material";
import { useState } from "react";
import avat from "../../assets/user/man-studio.png";
import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions";
import ImageIcon from "@mui/icons-material/Image";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import VideoCameraBackIcon from "@mui/icons-material/VideoCameraBack";
import CloseIcon from "@mui/icons-material/Close";
import EmojiPicker from "emoji-picker-react";
import axios from "axios";
import baseUrl from "../../utils/baseUrl";
import { useSportlaze } from "../../hooks/useContext";

interface MediaFile {
  file: File;
  preview: string;
}

export default function PostInput() {
  const [text, setText] = useState<string>("");
  const [media, setMedia] = useState<MediaFile[]>([]);
  const [showEmojiPicker, setShowEmojiPicker] = useState<boolean>(false);

const API_URL = baseUrl();
const {setMessage, setSnackIsOpen} = useSportlaze()

  const handlePost = async () => {
    if (!text.trim() && media.length === 0) return;

    const formData = new FormData();
    formData.append("text", text);
    media.forEach((item, index) => {
      formData.append(`media_${index}`, item.file);
    });

    console.log(formData);

    try {
      setSnackIsOpen(true)
      const token = localStorage.getItem("access_token");
      const res = await axios.post(
          `${API_URL}/posts`,
          { content: text },
          {
              headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${token}`,
              },
          }
      );
      console.log(res)
      if(res.status === 200){
        setText('')
        setMessage({message: 'Post created successfully', error: false})
      }
      // setResponse(JSON.stringify(res.data, null, 2));
      // setError("");
  } catch (err: any) {
    console.log(err)
      setMessage({message: err?.data?.message || "Something went wrong", error: true});
      // setResponse("");
  } finally {
    setTimeout(() => {
      setSnackIsOpen(false);
    }, 5000);
  }
  };

  const handleMediaUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) return;
    const files = Array.from(event.target.files).map((file) => ({
      file,
      preview: URL.createObjectURL(file),
    }));
    setMedia((prev) => [...prev, ...files]);
  };

  const handleRemoveFile = (index: number) => {
    setMedia((prev) => prev.filter((_, i) => i !== index));
  };

  const handleEmojiClick = (emojiObject: { emoji: string }) => {
    setText((prev) => prev + emojiObject.emoji);
  };

  return (
    <div className="w-full p-4 border rounded-lg shadow-md mb-2 bg-white relative dark:bg-black">
      <div className="flex items-start gap-2 mb-2">
        <Avatar src={avat} sx={{ width: 50, height: 50 }} />
        <TextareaAutosize
          placeholder="What is happening?"
          className="flex-1 border border-gray-300 text-secondary focus:ring-0 dark:bg-black dark:text-white p-2 rounded-md"
          value={text}
          onChange={(e) => setText(e.target.value)}
          minRows={3}
          maxRows={4} // Ensures it becomes scrollable after a certain height
          style={{ resize: "none", overflow: "auto" }}
        />
      </div>

      <div className="flex gap-2 flex-wrap mt-2">
        {media.map((item, index) => (
          <div key={index} className="relative w-20 h-20">
            {item.file.type.startsWith("image") && (
              <img
                src={item.preview}
                alt="uploaded"
                className="w-full h-full object-cover rounded-md"
              />
            )}
            {item.file.type.startsWith("video") && (
              <video controls className="w-full h-full rounded-md">
                <source src={item.preview} type={item.file.type} />
              </video>
            )}
            <CloseIcon
              className="absolute top-0 right-0 bg-white p-1 rounded-full text-red-600 cursor-pointer"
              onClick={() => handleRemoveFile(index)}
            />
          </div>
        ))}
      </div>

      <div className="flex justify-between items-center mt-2">
        <div className="flex gap-3 text-gray-500">
          <label>
            <ImageIcon className="cursor-pointer" />
            <input
              type="file"
              accept="image/*"
              multiple
              className="hidden"
              onChange={handleMediaUpload}
            />
          </label>
          <label>
            <VideoCameraBackIcon className="cursor-pointer" />
            <input
              type="file"
              accept="video/*"
              className="hidden"
              onChange={handleMediaUpload}
            />
          </label>
          <ClickAwayListener onClickAway={() => setShowEmojiPicker(false)}>
            <div className="relative">
              <EmojiEmotionsIcon
                className="cursor-pointer"
                onClick={() => setShowEmojiPicker((prev) => !prev)}
              />
              {showEmojiPicker && (
                <div
                  className="absolute z-10 bg-white dark:bg-gray-800 shadow-lg p-2 rounded-md"
                  style={{
                    top: "40px", // Position below icon
                    left: "0",
                    minWidth: "250px",
                    maxWidth: "300px",
                    maxHeight: "300px",
                    overflowY: "auto",
                  }}
                >
                  <EmojiPicker
                    onEmojiClick={handleEmojiClick}
                    width="100%"
                    height="100%"
                  />
                </div>
              )}
            </div>
          </ClickAwayListener>
          <CalendarMonthIcon className="cursor-pointer" />
        </div>
        <Button
          variant="contained"
          color="primary"
          onClick={handlePost}
          className="bg-secondary text-white px-4 py-1 rounded-lg disabled:opacity-50"
          disabled={!text.trim() && media.length === 0}
        >
          Post
        </Button>
      </div>
    </div>
  );
}