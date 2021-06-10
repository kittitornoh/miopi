import { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import axios from 'axios';
import { formatDistanceToNow } from 'date-fns';

// api
import * as API from '../api/api';

// components
import Loading from '../components/Loading';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const Post = () => {
  let history = useHistory();
  let { postId } = useParams();
  const [post, setPost] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);

    axios
      .get(`${API.POSTS}/${postId}`)
      .then((response) => {
        setPost(response.data);
        setIsLoading(false);
      })
      .catch((error) => console.log(error.message));
  }, [postId]);

  return (
    <Row className='mb-5'>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <Col sm={12}>
            <Button
              variant='outline-dark'
              className='mb-4'
              onClick={() => history.push('/')}
            >
              Back
            </Button>
          </Col>
          <Col sm={12}>
            <Card>
              <Card.Body>
                <Card.Title>{post.title}</Card.Title>
                <Card.Text>{post.body}</Card.Text>
              </Card.Body>
              <Card.Footer>
                <small className='text-muted'>
                  {`${formatDistanceToNow(new Date(post.createdAt))} ago`}
                </small>
              </Card.Footer>
            </Card>
          </Col>
        </>
      )}
    </Row>
  );
};

export default Post;
