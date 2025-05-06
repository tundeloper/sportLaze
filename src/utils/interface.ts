import { Dispatch, SetStateAction } from "react";
import { number } from "yup";

export interface User {
  username: string | null;
  name: string | null;
  email: string | null;
  followers: number | null;
  following: number | null;
  date_of_birth: string | null;
  favorite_sport: string | null;
  favorite_team: string | null;
  formatted_join_date: string | null;
  formatted_member_since: string | null;
  profile_picture?: string;
  location: string | null;
  id: string | null;
  bio: string | null;
  website: string | null;
  banner_image: string | null;
}

export interface Userprofile {
  id: number;
  username: string;
  name: string;
  email: string;
  date_of_birth: string;
  country: string;
  favorite_sport: string;
  favorite_team: string;
  bio: string;
  location: string;
  following_count: number;
  followers_count: number;
  formatted_join_date: number;
  formatted_member_since: string;
  profile_picture: string;
  banner_image: string;
  website: string;
}

export const initialUserval = {
  username: null,
  name: null,
  email: null,
  date_of_birth: null,
  followers: null,
  following: null,
  favorite_sport: null,
  favorite_team: null,
  formatted_join_date: null,
  formatted_member_since: null,
  location: null,
  id: null,
  bio: null,
  website: null,
  banner_image: null,
};

export interface InitialUser {
  access_token: string;
  token_type: string;
  email: string;
  username: string;
  id: string;
}

export const initialUser = {
  access_token: "",
  token_type: "",
  email: "",
  username: "",
  id: "",
};

export interface postSlide {
  media_url: string;
  media_type: string;
  id: number;
  order_index: number;
}

export interface Post {
  author_id: number;
  content: string;
  name: string;
  media_url: string;
  username: string;
  profile_picture: string;
  created_at: string;
  hashtags: string;
  media_type: string;
  id: number;
  likes_count: number;
  comments_count: number;
  reposts_count: number;
  media_files: postSlide[];
  type: "post" | "repost";
  post_id: number;
  reposter_username: string;
  reposter_name: string;
  reposter_id: number;
  quote: string | null;
}

export interface MediaFile {
  file: File;
  preview: string;
}

export interface ContextType {
  isAuthenticated: boolean;
  loading: boolean;
  snacksisOpen: boolean;
  setSnackIsOpen: (isOpen: boolean) => void;
  disMesssage: { message: string; error: boolean };
  setMessage: (payload: { message: string; error: boolean }) => void;
  setLoading: (payload: boolean) => void;
  token?: null | string;
  logout: () => void;
  login: (token: string) => void;
  darkMode: boolean;
  setDarkMode: Dispatch<SetStateAction<boolean>>;
  user: User;
  setUser: Dispatch<SetStateAction<User>>;
  initailUser: InitialUser;
  setInitUser: Dispatch<SetStateAction<InitialUser>>;
  posts: Post[];
  setPosts: Dispatch<SetStateAction<Post[]>>;
  notifications: Notification[];
  setNotifications: Dispatch<SetStateAction<Notification[]>>;
}

export interface LoungeType {
  name: string;
  description: string;
  icon: string;
  id: number;
  slug: string;
  created_at: string;
  created_by: 0;
  member_count: 0;
}

export interface channelType {
  name: string;
  description: string;
  is_private: boolean;
  id: 0;
  lounge_id: number;
  created_at: string;
  created_by: string;
  member_count: 0;
}

export type commentsType = {
  id: number;
  content: string;
  created_at: string;
  updated_at: string;
  author_id: 14;
  post_id: 58;
  parent_id: number;
  author_name: string;
  author_username: string;
  author_profile_picture: string;
  replies: commentsType[];
};

export type Repost = {
  created_at: string;
  id: number;
  name: string;
  post_id: 66;
  profile_picture: string;
  quote: string | null;
  user_id: number;
  username: string;
  original_post: Post;
};

export type Bookmarks = {
  id: number;
  user_id: number;
  post_id: number;
  created_at: string;
  post: Post;
};

export type Notification = {
  id: number;
  user_id: number;
  sender_id: number;
  sender_name: string;
  sender_username: string;
  sender_profile_picture: string;
  type: "like" | "comment" | "repost" | "follow" | "quote_repost" | "message";
  content: string;
  reference_id: number;
  reference_type: string;
  is_read: boolean;
  created_at: string;
};

export enum NotificationType {
  LIKE = "LIKE",
  COMMENT = "COMMENT",
  REPOST = "REPOST",
  FOLLOW = "FOLLOW",
  MENTION = "MENTION",
  QUOTE_REPOST = "QUOTE_REPOST",
  MESSAGE = "MESSAGE",
}

export type SearchType = {
  hashtags: { hashtag: string; count: number }[];
  lounges: LoungeType[];
  users: User[];
};

export type conversation = {
  user_id: number;
  username: string;
  name: string;
  profile_picture: string;
  latest_message: {
    id: number;
    content: string;
    sender_id: string;
    created_at: string;
    is_read: boolean;
  };
  unread_count: number;
};

export type chats = {
  content: string;
  created_at: string;
  id: string;
  is_read: boolean;
  recipient_id: string;
  sender_id: number;
  sender_name: string;
  sender_profile_picture: string;
  sender_username: string;
};
