import axios from "axios";
import baseUrl from "./baseUrl";
import { useSportlaze } from "../hooks/useContext";
import { useState } from "react";
import { commentsType } from "./interface";

export const getComment = async ({ post }: { post: string }) => {
  const [comments, setComments] = useState<commentsType[]>([]);
  const { setSnackIsOpen, setMessage } = useSportlaze();
  const url = baseUrl();
  try {
    const { data } = await axios.get(`${url}/social/comments/${post}`);

    console.log(data);
    if (data) return { comments, setComments };
  } catch (error) {
    setSnackIsOpen(true);
    setMessage({ message: "Failed to comment", error: true });
  } finally {
    setTimeout(() => setSnackIsOpen(false), 3000);
  }
};
