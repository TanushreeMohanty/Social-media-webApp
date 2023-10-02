import { useState } from "react";
import "../styles/Tabs.css";
import Context from "../dummyData/Context";
import Output from "./Output";

function Tabs() {
  const [selectedTab, setSelectedTab] = useState("Home");

  function handleCameraClick() {
    setSelectedTab("Camera");
  }

  function handleHomeClick() {
    setSelectedTab("Home");
  }

  function handleUserProfileClick() {
    setSelectedTab("UserProfile");
  }

  function handleSettingsClick() {
    setSelectedTab("Settings");
  }

  function handleSearchClick() {
    setSelectedTab("Search");
  }

  function handleNotificationsClick() {
    setSelectedTab("Notifications");
  }

  function handlePostClick() {
    setSelectedTab("PostList");
  }

  function handleChatClick() {
    setSelectedTab("Chat");
  }

  return (
    <>
      <Context.Provider value={selectedTab}>
        <div className="tabs-container">
          <div className="tabs">
            <a onClick={handleHomeClick}>Home</a>
            <a onClick={handleCameraClick}>Camera</a>
            <a onClick={handleUserProfileClick}>User Profile</a>
            <a onClick={handleSettingsClick}>Settings</a>
            <a onClick={handleSearchClick}>Search</a>
            <a onClick={handleNotificationsClick}>Notifications</a>
            <a onClick={handleChatClick}>Chats</a>
            <a onClick={handlePostClick}>Post</a>
          </div>
          <div className="output-container">
            <Output />
          </div>
        </div>
      </Context.Provider>
    </>
  );
}

export default Tabs;
