import { useContext } from 'react';

// context
import { AuthContext } from '../auth/AuthContext';

// components
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import { Link } from 'react-router-dom';

const NavBar = () => {
  const { authState } = useContext(AuthContext);

  return (
    <Navbar bg='dark' variant='dark' fixed='top'>
      <Container>
        <Navbar.Brand>MioPi</Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className='justify-content-end'>
          {authState.status ? (
            <Navbar.Text>
              Signed in as: <Link to=''>{authState.name}</Link>
            </Navbar.Text>
          ) : (
            <Navbar.Text>
              <Link to='/register'>Register</Link>
              {'  '}or{'  '}
              <Link to='/login'>Log in</Link>
            </Navbar.Text>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
