// components
import Col from 'react-bootstrap/Col';
import Spinner from 'react-bootstrap/Spinner';

const Loading = () => {
  return (
    <Col className='d-flex justify-content-center'>
      <Spinner animation='border' role='status' />
    </Col>
  );
};

export default Loading;
