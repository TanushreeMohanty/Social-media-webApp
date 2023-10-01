import { data, data1, data3 } from './userPost';
import './UserProfile.css'
const UserProfile = () => {
  return (
    <div className="user-profile">
      <h1 className="user-profile-title">User Profiles</h1>
      <div className="user-profile-section">
        <h2 className="user-profile-section-title">Data Set 1</h2>
        <div className="user-profile-list">
          {data.map((user) => (
            <div key={user.id} className="user-profile-card">
              <img className="user-profile-image" src={user.img} alt={`User ${user.id}`} />
              <p className="user-profile-info">Likes: {user.likes}</p>
              <p className="user-profile-info">Comments: {user.comments}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="user-profile-section">
        <h2 className="user-profile-section-title">Data Set 2</h2>
        <div className="user-profile-list">
          {data1.map((user) => (
            <div key={user.id} className="user-profile-card">
              <img className="user-profile-image" src={user.img} alt={`User ${user.id}`} />
              <p className="user-profile-info">Likes: {user.likes}</p>
              <p className="user-profile-info">Comments: {user.comments}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="user-profile-section">
        <h2 className="user-profile-section-title">Data Set 3</h2>
        <div className="user-profile-list">
          {data3.map((user) => (
            <div key={user.id} className="user-profile-card">
              <img className="user-profile-image" src={user.img} alt={`User ${user.id}`} />
              <p className="user-profile-info">Likes: {user.likes}</p>
              <p className="user-profile-info">Comments: {user.comments}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
