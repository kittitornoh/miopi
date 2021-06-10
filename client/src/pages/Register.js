import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Formik } from 'formik';
import axios from 'axios';

// api
import * as API from '../api/api';

// schema
import { userRegistrationValidationSchema } from '../validations/schemas/userRegistrationSchema';

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

  const initialValues = {
    first_name: '',
    last_name: '',
    email: '',
    password: '',
  };

  /**
   * Register with the given credentials.
   *
   * @param {*} data    Object containing first name, last name, email, and password.
   */
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
              validationSchema={userRegistrationValidationSchema}
              onSubmit={handleLogin}
              initialValues={initialValues}
            >
              {({ handleSubmit, handleChange, values, errors, touched }) => (
                <Form noValidate onSubmit={handleSubmit}>
                  <Form.Group controlId='registerFirstName'>
                    <Form.Label>First name</Form.Label>
                    <Form.Control
                      type='first_name'
                      placeholder='First name'
                      name='first_name'
                      value={values.first_name}
                      onChange={handleChange}
                      isInvalid={!!errors.first_name && touched.first_name}
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
                      isInvalid={!!errors.last_name && touched.last_name}
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
                      isInvalid={!!errors.email && touched.email}
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
                      isInvalid={!!errors.password && touched.password}
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
