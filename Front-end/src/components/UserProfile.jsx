import { data } from '../dummyData/userPost';
import dummyUserData from '../dummyData/userPost';
import '../styles/UserProfile.css';

const UserProfile = () => {
  return (
    <div className="user-profile">
      <div className="user-profile-info">
        {dummyUserData.map((user) => (
          <div key={user.id} className="user-profile-card">
            <img className="user-profile-image" src={user.profileImg} alt="User Profile" />
            <h2 className="user-profile-name">{user.name}</h2>
            <p className="user-profile-bio">{user.bio}</p>
          </div>
        ))}
      </div>

      <div className="user-profile-section">
        <h2 className="user-profile-section-title">Posts</h2>
        <div className="user-profile-list">
          {data.map((post) => (
            <div key={post.id} className="user-post-card">
              <img className="user-post-image" src={post.img} alt={`User ${post.id} Post`} />
              <p className="user-profile-info">Likes: {post.likes}</p>
              <p className="user-profile-info">Comments: {post.comments}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
