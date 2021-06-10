import { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { Formik } from 'formik';
import * as yup from 'yup';
import axios from 'axios';
import { AuthContext } from '../auth/AuthContext';

// api
import * as API from '../api/api';

// components
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

const Login = () => {
  let history = useHistory();
  const [error, setError] = useState('');
  const { setAuthState } = useContext(AuthContext);

  const initialValues = {
    email: 'kitodges@email.com',
    password: 'password',
  };

  const validationSchema = yup.object().shape({
    email: yup
      .string()
      .email('Please enter a valid email address.')
      .required('Email is required.'),
    password: yup.string().required('Password is required.'),
  });

  const handleLogin = (data) => {
    const user = { email: data.email, password: data.password };

    axios.post(API.LOGIN, user).then((response) => {
      if (response.data.error) {
        console.log(response.data);
      } else {
        setAuthState({
          id: response.data.id,
          name: response.data.name,
          isAuth: true,
        });

        history.push('/');
      }
    });
  };

  return (
    <Card className='w-50 p-5 mx-auto'>
      <Card.Title>Login</Card.Title>
      <Card.Body className='p-0 mt-3'>
        {error && <span>{error}</span>}
        <Formik
          validationSchema={validationSchema}
          onSubmit={handleLogin}
          initialValues={initialValues}
        >
          {({ handleSubmit, handleChange, values, errors }) => (
            <Form noValidate onSubmit={handleSubmit}>
              <Form.Group controlId='loginEmail'>
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type='email'
                  placeholder='Email'
                  name='email'
                  value={values.email}
                  onChange={handleChange}
                  isInvalid={!!errors.email}
                />
                <Form.Control.Feedback type='invalid'>
                  {errors.email}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group controlId='loginPassword'>
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type='password'
                  placeholder='Password'
                  name='password'
                  value={values.password}
                  onChange={handleChange}
                  isInvalid={!!errors.password}
                />
                <Form.Control.Feedback type='invalid'>
                  {errors.password}
                </Form.Control.Feedback>
              </Form.Group>

              <Button type='submit' block>
                Log in
              </Button>
            </Form>
          )}
        </Formik>
      </Card.Body>
    </Card>
  );
};

export default Login;
