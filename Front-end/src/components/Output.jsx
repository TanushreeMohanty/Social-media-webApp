import React, { useMemo } from "react";

import Camera from "./Camera";
import Home from "./Home";
import UserProfile from "./UserProfile";
import Settings from "./Settings";
import Search from "./Search";
import Notifications from "./Notifications";
import PostList from "./PostList";
import Chat from "./Chat";

import '../styles/output.css'

import Context from "../dummyData/Context"; 

function Output() {

  const selectedTab = React.useContext(Context);
  
  const component = useMemo(() => {
    switch (selectedTab) {
      case "Camera":
        return <Camera />;
      case "Home":
        return <Home />;
      case "UserProfile":
        return <UserProfile />;
      case "Settings":
        return <Settings />;
      case "Search":
        return <Search />;
      case "Notifications":
        return <Notifications />;
      case "Chat":
        return <Chat />;
      case "PostList":
        return <PostList />;
      default:
        return <div />;
    }
  }, [selectedTab]);
  console.log(selectedTab);

  return <div className="component-content" >{component}</div>;
}

export default Output;
