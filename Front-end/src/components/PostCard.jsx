import PropTypes from 'prop-types';
import '../styles/PostCard.css'; 

const PostCard = ({ name, text, img, avtar, time }) => {
    return (
        <div className="post-card">
            <div className="user-info">
                <img src={avtar} alt={`${name}'s avatar`} />
                <div>
                    <p className="user-name">{name}</p>
                    <p className="post-time">{time}</p>
                </div>
            </div>
            <p className="post-text">{text}</p>
            {img && <img className="post-image" src={img} alt={`${name}'s post`} />}
        </div>
    );
}

PostCard.propTypes = {
    name: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    img: PropTypes.string,
    avtar: PropTypes.string.isRequired,
    time: PropTypes.string.isRequired,
};

export default PostCard;
