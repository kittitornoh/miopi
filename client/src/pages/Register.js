import { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { Formik } from 'formik';
import * as yup from 'yup';
import axios from 'axios';
import { AuthContext } from '../auth/AuthContext';

// api
import * as API from '../api/api';

// components
import ErrorText from '../components/ErrorText';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

const Register = () => {
  let history = useHistory();
  const [error, setError] = useState(null);
  const { setAuthState } = useContext(AuthContext);

  const initialValues = {
    first_name: 'John',
    last_name: 'Doe',
    email: 'kitodges@email.com',
    password: 'password',
  };

  const validationSchema = yup.object().shape({
    first_name: yup.string().required('First name is required.'),
    last_name: yup.string().required('Last name is required.'),
    email: yup
      .string()
      .email('Please enter a valid email address.')
      .required('Email is required.'),
    password: yup.string().required('Password is required.'),
  });

  const handleLogin = async (data) => {
    try {
      await axios.post(API.REGISTER, data).then((response) => {
        setError(null);
        history.push('/login');
      });
    } catch (error) {
      setError(error.response.data);
    }
  };

  return (
    <Row className='d-flex justify-content-center'>
      <Col sm={12} md={6}>
        <Card className='p-4'>
          <Card.Title>Register</Card.Title>
          <Card.Body className='p-0 mt-3'>
            {error && <ErrorText>{error.message}</ErrorText>}
            <Formik
              validationSchema={validationSchema}
              onSubmit={handleLogin}
              initialValues={initialValues}
            >
              {({ handleSubmit, handleChange, values, errors }) => (
                <Form noValidate onSubmit={handleSubmit}>
                  <Form.Group controlId='registerFirstName'>
                    <Form.Label>First name</Form.Label>
                    <Form.Control
                      type='first_name'
                      placeholder='First name'
                      name='first_name'
                      value={values.first_name}
                      onChange={handleChange}
                      isInvalid={!!errors.first_name}
                    />
                    <Form.Control.Feedback type='invalid'>
                      {errors.first_name}
                    </Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group controlId='registerLastName'>
                    <Form.Label>Last name</Form.Label>
                    <Form.Control
                      type='last_name'
                      placeholder='Last name'
                      name='last_name'
                      value={values.last_name}
                      onChange={handleChange}
                      isInvalid={!!errors.last_name}
                    />
                    <Form.Control.Feedback type='invalid'>
                      {errors.last_name}
                    </Form.Control.Feedback>
                  </Form.Group>

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
                    Create account
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

export default Register;
