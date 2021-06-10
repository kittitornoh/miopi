import { useHistory } from 'react-router-dom';
import { formatDistanceToNow } from 'date-fns';

// components
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';

// helpers
import { truncateText } from '../helpers/truncateText';

const PostCard = ({ post }) => {
  let history = useHistory();

  return (
    <Col sm={12} md={3} className='mb-3'>
      <Card
        style={{ cursor: 'pointer' }}
        onClick={() => history.push(`/post/${post.id}`)}
      >
        <Card.Body>
          <Card.Title>{post.title}</Card.Title>
          <Card.Text>
            {
              // truncate
              post.body.length > 200 ? truncateText(post.body, 200) : post.body
            }
          </Card.Text>
        </Card.Body>
        <Card.Footer>
          <small className='text-muted'>
            {`${formatDistanceToNow(new Date(post.createdAt))} ago`}
          </small>
        </Card.Footer>
      </Card>
    </Col>
  );
};

export default PostCard;
