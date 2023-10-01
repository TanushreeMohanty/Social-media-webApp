import { Link } from "react-router-dom";
import { FaHome, FaSearch, FaVideo, FaCog, FaUser, FaBell, FaComment } from "react-icons/fa";

const Navigation = () => {
  const links = [
    { to: "/", label: "Home", icon: <FaHome /> },
    { to: "/search", label: "Search", icon: <FaSearch /> },
    { to: "/videos", label: "Videos", icon: <FaVideo /> },
    { to: "/settings", label: "Settings", icon: <FaCog /> },
    { to: "/profile", label: "Profile", icon: <FaUser /> },
    { to: "/notifications", label: "Notifications", icon: <FaBell /> },
    { to: "/chat", label: "Chat", icon: <FaComment /> },
  ];

  return (
    <nav className="flex flex-col gap-2">
      {links.map((link) => (
        <Link key={link.to} to={link.to} className="flex items-center">
          {link.icon}
          <span className="ml-2">{link.label}</span>
        </Link>
      ))}
    </nav>
  );
};

export default Navigation;
