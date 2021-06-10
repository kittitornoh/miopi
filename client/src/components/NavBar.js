import { useContext } from 'react';
import { Link } from 'react-router-dom';

// context
import { AuthContext } from '../auth/AuthContext';

// components
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';

const NavBar = () => {
  const { authState } = useContext(AuthContext);

  return (
    <Navbar bg='dark' variant='dark' fixed='top'>
      <Container>
        <Navbar.Brand>
          <Link to='/'>MioPi</Link>
        </Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className='justify-content-end'>
          {authState.isAuth ? (
            <Navbar.Text>
              Signed in as: <Link to='/profile'>{authState.name}</Link>
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
