import generateSocketId from "./generateSocketId";

export default function baseUrl () {
  return 'https://lazeapi-v1.onrender.com/v1'
}

export function socketUrl () {
  const token = localStorage.getItem("access_token")
  
  return `wss://lazeapi-v1.onrender.com/ws?token=${token}&socket_id=${generateSocketId()}`;

}