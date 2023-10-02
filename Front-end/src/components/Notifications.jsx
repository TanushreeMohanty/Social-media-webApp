import '../styles/Notification.css';
import notificationData from '../dummyData/notificationData';

function Notifications() {
  return (
    <div className="notifications">
      <h1>Notifications</h1>
      <ul className="notification-list">
        {notificationData.map((notification) => (
          <li key={notification.id} className="notification-item">
            <img
              src={notification.icon}
              className="notification-icon"
            />
            <p className="notification-message">{notification.message}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Notifications;
