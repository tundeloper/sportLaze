// import React from 'react';
// import logo from './logo.svg';
import { GoogleOAuthProvider } from "@react-oauth/google";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import { lazy, Suspense } from "react";
// import Loading from "./components/loadings/loading";
import Protect from "./utils/ProtectedRoute";
import SportlazeProvider from "./store/context";
import LoungeId from "./pages/selectedLounge";
import UserProfile from "./pages/userProfile";
import EditProfile from "./pages/edit-profile";
import Follower from "./pages/follower";
import Following from "./pages/following";
// import { Verified } from "@mui/icons-material";
import FollowVerified from "./pages/verifiedFollow";
import { GetSinglePost } from "./pages/getPost";
import TrendingChannelsPage from "./components/trendingChanel";
import CreateChannel from "./pages/create-channel";
import { Monetization } from "./pages/monetization";
import { PromotionPage } from "./pages/promotion";
import { AdsTarget } from "./pages/adsTarget";
import { Payment } from "./pages/payment";
import Notifications from "./pages/notification";
import Messages from "./pages/messages";
import UserChat from "./pages/chat";
import Verification from "./pages/verify";
import ForgetPassword from "./pages/forget-passord";
const Welcome = lazy(() => import("./pages/auth"));
const Home = lazy(() => import("./pages/home"));
const Lounge = lazy(() => import("./pages/lounge"));
const LivescorePage = lazy(() => import("./pages/LivescorePage"));
function App() {

  return (
    <SportlazeProvider>
      <GoogleOAuthProvider clientId="292887638276-kk8gmqfsjivcnjujhsiqiu5d62rkocqt.apps.googleusercontent.com">
        <div className="App">
          <Routes>
            <Route
              path="/"
              element={
                <Suspense>
                  <Protect redirectPath="auth">
                    <Home />
                  </Protect>
                </Suspense>
              }
            />
            <Route
              path="/auth"
              element={
                <Suspense fallback={<div>Loading...</div>}>
                  <Welcome />
                </Suspense>
              }
            />
            <Route
              path="/auth/verification"
              element={
                <Suspense fallback={<div>Loading...</div>}>
                  <Verification />
                </Suspense>
              }
            />
            <Route
              path="/auth/forgot-password"
              element={
                <Suspense fallback={<div>Loading...</div>}>
                  <ForgetPassword />
                </Suspense>
              }
            />
            <Route
              path="/followers"
              element={
                <Suspense fallback={<div>Loading...</div>}>
                  <Protect redirectPath="auth">
                    <Follower />
                  </Protect>
                </Suspense>
              }
            />
            <Route
              path="/messages"
              element={
                <Suspense fallback={<div>Loading...</div>}>
                  <Protect redirectPath="auth">
                    <Messages />
                  </Protect>
                </Suspense>
              }
            />
            <Route
              path="/messages/:user_id"
              element={
                <Suspense fallback={<div>Loading...</div>}>
                  <Protect redirectPath="auth">
                    <UserChat />
                  </Protect>
                </Suspense>
              }
            />
            <Route
              path="/following"
              element={
                <Suspense fallback={<div>Loading...</div>}>
                  <Protect redirectPath="auth">
                    <Following />
                  </Protect>
                </Suspense>
              }
            />
            <Route
              path="/verified-followers"
              element={
                <Suspense fallback={<div>Loading...</div>}>
                  <Protect redirectPath="auth">
                    <FollowVerified />
                  </Protect>
                </Suspense>
              }
            />
            <Route
              path={`/user/:username`}
              element={
                <Suspense fallback={<div>Loading...</div>}>
                  <Protect redirectPath="auth">
                    <UserProfile />
                  </Protect>
                </Suspense>
              }
            />
            <Route
              path={`/post/:id`}
              element={
                <Suspense fallback={<div>Loading...</div>}>
                  {/* <Protect redirectPath="auth"> */}
                    <GetSinglePost />
                  {/* </Protect> */}
                </Suspense>
              }
            />
            <Route
              path="/edit-Profile"
              element={
                <Suspense fallback={<div>Loading...</div>}>
                  <Protect redirectPath="auth">
                    <EditProfile />
                  </Protect>
                </Suspense>
              }
            />
            <Route
              path="/notifications"
              element={
                <Suspense fallback={<div>Loading...</div>}>
                  <Protect redirectPath="auth">
                    <Notifications />
                  </Protect>
                </Suspense>
              }
            />c
             <Route
              path="/channels/:channelId"
              element={
                <Suspense fallback={<div>Loading...</div>}>
                  <Protect redirectPath="auth">
                    <TrendingChannelsPage />
                  </Protect>
                </Suspense>
              }
            />
            <Route
              path="/lounge/create-channel/:id"
              element={
                <Suspense fallback={<div>Loading...</div>}>
                  <Protect redirectPath="auth">
                    <CreateChannel />
                  </Protect>
                </Suspense>
              }
            />
            <Route
              path="/lounge"
              element={
                <Suspense fallback={<div>Loading...</div>}>
                  <Protect redirectPath="auth">
                    <Lounge />
                  </Protect>
                </Suspense>
              }
            />
            <Route
              path="/livescore"
              element={
                <Suspense fallback={<div>Loading...</div>}>
                    <LivescorePage />
                </Suspense>
              }
            />
            <Route
              path="/promotion"
              element={
                <Suspense fallback={<div>Loading...</div>}>
                  <Protect redirectPath="auth">
                    <PromotionPage />
                  </Protect>
                </Suspense>
              }
            />
            <Route
              path="/ads-target"
              element={
                <Suspense fallback={<div>Loading...</div>}>
                  <Protect redirectPath="auth">
                    <AdsTarget />
                  </Protect>
                </Suspense>
              }
            />
            <Route
              path="/payment"
              element={
                <Suspense fallback={<div>Loading...</div>}>
                  <Protect redirectPath="auth">
                    <Payment />
                  </Protect>
                </Suspense>
              }
            />
            <Route
              path="/videos"
              element={
                <Suspense fallback={<div>Loading...</div>}>
                  <Protect redirectPath="auth">
                    <div>Videos Route</div>
                  </Protect>
                </Suspense>
              }
            />
            <Route
              path="/monetization"
              element={
                <Suspense fallback={<div>Loading...</div>}>
                  <Protect redirectPath="auth">
                    <Monetization />
                  </Protect>
                </Suspense>
              }
            />
            <Route
              path="/verify"
              element={
                <Suspense fallback={<div>Loading...</div>}>
                  <Protect redirectPath="auth">
                    <div>Vefrify section</div>
                  </Protect>
                </Suspense>
              }
            />
            <Route
              path="/lounge/:slug"
              element={
                <Suspense fallback={<div>Loading...</div>}>
                  <Protect redirectPath="auth">
                    <LoungeId />
                  </Protect>
                </Suspense>
              }
            />
            <Route
              path="*"
              element={
                <Suspense fallback={<div>Loading...</div>}>
                  <div>Invalid Route</div>
                </Suspense>
              }
            />
          </Routes>
          {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header> */}
        </div>
      </GoogleOAuthProvider>
    </SportlazeProvider>
  );
}

export default App;
