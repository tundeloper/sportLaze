import React, { useEffect, useState } from "react";
import Layout from "./layout/layout";
import { ChannelsList } from "./channel/channel-list";
import { Sidebar } from "./channel/sider";
import axios from "axios";
import baseUrl from "../utils/baseUrl";
import { useParams } from "react-router-dom";

const TrendingChannelsPage = () => {
  const [channel, setChannel] = useState()
  const url = baseUrl();
  const {channelId} = useParams()
  
  useEffect(() => {
    ( async () => {
      try{
        const {data} = await axios.get(`${url}/channels/lounge/${channelId}`)
        console.log(data);
        setChannel(data)
      }catch(error) {
        console.error(error);
      }
    })()
  }, [])
  return (
    <Layout>
      <div className="flex min-h-[100vh] bg-[#f9f2f2] flex-col md:flex-row gap-6 p-6  dark:bg-black">
        <Sidebar />
        <ChannelsList />
      </div>
    </Layout>
  );
};

export default TrendingChannelsPage;
