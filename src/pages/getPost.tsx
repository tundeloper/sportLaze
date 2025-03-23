import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import baseUrl from "../utils/baseUrl";
import { feedType } from "../components/landing";
import UserProfile from "../components/userProfile/profile";

export function GetSinglePost() {
    const [post, setPost] = useState<feedType | null>(null);
  const { id } = useParams();
  const url = baseUrl();

  const fetchPost = async () => {
      // Fetch post by id
      try {
        const response = await fetch(`${url}/posts/${id}`);
        console.log(response);
        
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
