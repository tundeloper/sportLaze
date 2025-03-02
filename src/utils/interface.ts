export interface User {
  username: string | null;
  name: string | null;
  email: string | null;
  followers: number | null;
  following: number | null;
  date_of_birth: string | null,
  favorite_sport: string |null,
  favorite_team: string | null,
  formatted_join_date: string | null,
  formatted_member_since: string | null,
  location: string | null,
  id: string | null,
  bio: string | null,
  posts?: { content?: string; image?: [] }[];
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
