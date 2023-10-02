import '../styles/Settings.css';

function Settings() {
  return (
    <div className="settings">
      <h1>Account Settings</h1>
      <div className="section">
        <h2>Account Information</h2>
        <div className="option">
          <p>Profile Picture</p>
          <input type="file" accept="image/*" />
          {/* Upload, change, or remove profile picture */}
        </div>
        <div className="option">
          <p>Username</p>
          <input type="text" placeholder="Enter your username" />
          {/* Allow users to change username */}
        </div>
        <div className="option">
          <p>Bio/About Me</p>
          <textarea placeholder="Write a brief bio about yourself"></textarea>
          {/* Provide space for a brief bio */}
        </div>
      </div>

      <div className="section">
        <h2>Privacy Settings</h2>
        <div className="option">
          <p>Account Privacy</p>
          <select>
            <option value="public">Public</option>
            <option value="private">Private</option>
            <option value="custom">Custom</option>
          </select>
          {/* Options for public, private, or custom privacy */}
        </div>
        <div className="option">
          <p>Post Privacy</p>
          <select>
            <option value="public">Public</option>
            <option value="private">Private</option>
            <option value="custom">Custom</option>
          </select>
          {/* Control post visibility */}
        </div>
        <div className="option">
          <p>Block Users</p>
          <input type="text" placeholder="Enter username to block" />
          {/* Block/unblock other users */}
        </div>
        <div className="option">
          <p>Mute Users</p>
          <input type="text" placeholder="Enter username to mute" />
          {/* Mute/unmute specific users */}
        </div>
      </div>

      <div className="section">
        <h2>Notifications</h2>
        <div className="option">
          <p>Notification Preferences</p>
          <div className="notification-checkbox">
            <input type="checkbox" id="likeNotifications" />
            <label htmlFor="likeNotifications">Likes</label>
          </div>
          <div className="notification-checkbox">
            <input type="checkbox" id="commentNotifications" />
            <label htmlFor="commentNotifications">Comments</label>
          </div>
          {/* Customize notification settings */}
        </div>
        <div className="option">
          <p>Email Notifications</p>
          <div className="notification-checkbox">
            <input type="checkbox" id="emailNotifications" />
            <label htmlFor="emailNotifications">Enable email notifications</label>
          </div>
          {/* Manage email notification preferences */}
        </div>
        <div className="option">
          <p>Push Notifications</p>
          <div className="notification-checkbox">
            <input type="checkbox" id="pushNotifications" />
            <label htmlFor="pushNotifications">Enable push notifications on mobile</label>
          </div>
          {/* Control push notifications on mobile */}
        </div>
      </div>

      {/* Add more sections for security, connected apps, data and privacy, appearance, language and region, etc. */}

      <div className="section">
        <button>Save Changes</button>
      </div>
    </div>
  );
}

export default Settings;
