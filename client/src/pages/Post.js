import { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import axios from 'axios';

// api
import * as API from '../api/api';

// components
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

const Post = () => {
  let history = useHistory();
  let { postId } = useParams();
  const [post, setPost] = useState({});

  useEffect(() => {
    axios
      .get(`${API.POSTS}/${postId}`)
      .then((response) => {
        console.log(response.data);
        setPost(response.data);
      })
      .catch((error) => console.log(error.message));
  }, [postId]);

  return (
    <>
      <Button
        variant='outline-dark'
        className='mb-4'
        onClick={() => history.push('/')}
      >
        Back
      </Button>
      <Card>
        <Card.Body>
          <Card.Title>{post.title}</Card.Title>
          <Card.Text>{post.body}</Card.Text>
        </Card.Body>
      </Card>
    </>
  );
};

export default Post;
