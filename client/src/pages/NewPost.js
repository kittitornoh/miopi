import { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { Formik } from 'formik';
import * as yup from 'yup';
import axios from 'axios';

// api
import * as API from '../api/api';

// context
import { AuthContext } from '../auth/AuthContext';

// components
import ErrorText from '../components/ErrorText';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

const NewPost = () => {
  let history = useHistory();
  const [error, setError] = useState(null);
  const { authState } = useContext(AuthContext);

  const initialValues = {
    title: '',
    body: '',
  };

  const validationSchema = yup.object().shape({
    title: yup.string().required('Title is required.'),
    body: yup.string().required('Body is required.'),
  });

  /**
   * Post a new post then redirect to the home page.
   *
   * @param {*} data    Object containing the post data.
   */
  const handlePost = async (data) => {
    // add UserId
    const newPost = { ...data, userId: authState.id };

    try {
      await axios
        .post(API.POSTS, newPost, {
          headers: { 'access-token': localStorage.getItem('access-token') },
        })
        .then((response) => {
          setError(null);

          // redirect
          history.push('/');
        });
    } catch (error) {
      setError(error.response.data);
    }
  };

  return (
    <Row className='d-flex justify-content-center'>
      <Col sm={12} md={6}>
        <Card className='p-4'>
          <Card.Title>New Post</Card.Title>
          <Card.Body className='p-0 mt-3'>
            {error && <ErrorText>{error.message}</ErrorText>}
            <Formik
              validationSchema={validationSchema}
              onSubmit={handlePost}
              initialValues={initialValues}
            >
              {({ handleSubmit, handleChange, values, errors, touched }) => (
                <Form noValidate onSubmit={handleSubmit}>
                  <Form.Group controlId='newPostTitle'>
                    <Form.Label>Title</Form.Label>
                    <Form.Control
                      type='title'
                      placeholder='A new title'
                      name='title'
                      value={values.title}
                      onChange={handleChange}
                      isInvalid={!!errors.title && touched.title}
                    />
                    <Form.Control.Feedback type='invalid'>
                      {errors.title}
                    </Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group controlId='newPostBody'>
                    <Form.Label>Body</Form.Label>
                    <Form.Control
                      as='textarea'
                      rows={4}
                      placeholder='Some text...'
                      name='body'
                      value={values.body}
                      onChange={handleChange}
                      isInvalid={!!errors.body && touched.body}
                    />
                    <Form.Control.Feedback type='invalid'>
                      {errors.body}
                    </Form.Control.Feedback>
                  </Form.Group>

                  <Button type='submit' block>
                    Post
                  </Button>
                </Form>
              )}
            </Formik>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
};

export default NewPost;
