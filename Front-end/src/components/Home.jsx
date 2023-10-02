import '../styles/Home.css';
import users from '../dummyData/storiseData'; 
import PostList from './PostList'

const UserProfileSection = () => {
  return (
    <div className="user-profile-section">
      <div className="stories-section">
        <div className="stories-container">
          {users.map((user, index) => (
            <div key={index} className="user-profile-card">
              <img
                src={user.profileImg}
                alt={`User ${index + 1}`}
                className="profile-image"
              />
              <p>{user.name}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="random-posts-section">
        <PostList />
      </div>
    </div>
  );
};

export default UserProfileSection;
