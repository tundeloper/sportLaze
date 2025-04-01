import React from "react";
import { Button, Card, Avatar, TextField, InputAdornment } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import Layout from "./layout/layout";
import { ChannelsList } from "./channel/channel-list";
import { Sidebar } from "./channel/sider";

const TrendingChannelsPage = () => {
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
