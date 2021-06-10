import { useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';

// context
import { AuthContext } from '../auth/AuthContext';

// components
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';

const NavBar = () => {
  let history = useHistory();
  const { authState, setAuthState } = useContext(AuthContext);

  const logout = async () => {
    // remove token
    localStorage.removeItem('access-token');

    // reset authState
    setAuthState({
      id: '',
      name: '',
      isAuth: false,
    });

    // redirect to home page
    history.push('/');
  };

  return (
    <Navbar bg='dark' variant='dark' fixed='top'>
      <Container>
        <Navbar.Brand>
          <Link to='/' style={{ color: 'white' }}>
            MioPi
          </Link>
        </Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className='justify-content-end'>
          {authState.isAuth ? (
            <>
              <Navbar.Text>
                <Link to='/profile'>{authState.name}</Link>
              </Navbar.Text>
              <Navbar.Text className='pl-4'>
                <Button variant='outline-light' size='sm' onClick={logout}>
                  Log out
                </Button>
              </Navbar.Text>
            </>
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
