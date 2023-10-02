import PostCard from './PostCard';
import { postData } from '../dummyData/postData';
import '../styles/PostList.css'; 

const PostList = () => {
    return (
        <div className="post-list">
            {
                postData.map((item) => {
                    return (
                        <PostCard key={item.id} name={item.name} text={item?.text} img={item?.img} avtar={item?.avtar} time={item?.time} />
                    );
                })
            }
        </div>
    );
}

export default PostList;
