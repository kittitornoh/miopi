import { useState, useEffect, useContext } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import axios from 'axios';
import { formatDistanceToNow } from 'date-fns';

// api
import * as API from '../api/api';

// context
import { AuthContext } from '../auth/AuthContext';

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
  const { authState } = useContext(AuthContext);

  useEffect(() => {
    setIsLoading(true);

    // get post
    axios
      .get(`${API.POSTS}/${postId}`)
      .then((response) => {
        setPost(response.data);
        setIsLoading(false);
      })
      .catch((error) => console.log(error.message));
  }, [postId]);

  /**
   * Delete a post.
   */
  const handleDelete = async () => {
    try {
      axios
        .delete(`${API.POSTS}/${postId}`, {
          headers: { 'access-token': localStorage.getItem('access-token') },
        })
        .then((response) => {
          history.goBack();
        });
    } catch (error) {
      console.log(error.response.message);
    }
  };

  return (
    <>
      <Row className='mb-3'>
        <Col sm={12} className='d-flex justify-content-between'>
          <Button variant='outline-dark' onClick={() => history.goBack()}>
            Back
          </Button>
          {
            // give option to delete if post belongs to logged in user
            authState.isAuth && post.UserId === authState.id ? (
              <Button variant='outline-danger' onClick={handleDelete}>
                Delete
              </Button>
            ) : (
              ''
            )
          }
        </Col>
      </Row>
      <Row className='mb-5'>
        {isLoading ? (
          <Loading />
        ) : (
          <>
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
    </>
  );
};

export default Post;
