import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import baseUrl from "../utils/baseUrl";
import UserProfile from "../components/userProfile/profile";
import { Post } from "../utils/interface";
import axios from "axios";

export function GetSinglePost() {
    const [post, setPost] = useState<Post | null>(null);
  const { id } = useParams();
  const url = baseUrl();

  const fetchPost = async () => {
      // Fetch post by id
      try {
        const response = await axios.get(`${url}/posts/${id}`);
        console.log(response);
        setPost(response.data);
        
    } catch (error) {
        console.log(error)
    }
  };
  useEffect(() => {
    fetchPost()
    console.log(id);
  }, [id]);

  return <UserProfile>{id}</UserProfile>;
}
