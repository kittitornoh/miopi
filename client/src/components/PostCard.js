import { truncateText } from '../helpers/truncateText';

const PostCard = ({ post }) => {
  return (
    <div>
      <h2>{post.title}</h2>
      <p>
        {
          // truncate
          post.body.length > 200 ? truncateText(post.body, 200) : post.body
        }
      </p>
    </div>
  );
};

export default PostCard;
