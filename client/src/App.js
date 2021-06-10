import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import axios from 'axios';

// api
import * as API from './api/api';

// pages
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Post from './pages/Post';
import Profile from './pages/Profile';

// context
import { AuthContext } from './auth/AuthContext';

// components
import NavBar from './components/NavBar';
import Container from 'react-bootstrap/Container';

const App = () => {
  const [authState, setAuthState] = useState({
    id: '',
    name: '',
    isAuth: false,
  });

  const verifyToken = async () => {
    try {
      await axios
        .get(API.AUTH, {
          headers: { 'access-token': localStorage.getItem('access-token') },
        })
        .then((response) => {
          setAuthState({
            id: response.data.id,
            name: `${response.data.first_name} ${response.data.last_name}`,
            isAuth: true,
          });
        });
    } catch (error) {
      console.log(error.response.data);
    }
  };

  useEffect(() => {
    // check for token
    if (localStorage.getItem('access-token')) {
      // verify token if it exists
      verifyToken();
    } else {
      console.log('no token');
    }
  }, []);

  return (
    <>
      <AuthContext.Provider value={{ authState, setAuthState }}>
        <Router>
          <NavBar />

          <Container style={{ marginTop: 80 }}>
            <Switch>
              <Route exact path='/' component={Home} />
              <Route path='/login' component={Login} />
              <Route path='/register' component={Register} />
              <Route path='/post/:postId' component={Post} />
              <Route path='/profile' component={Profile} />
              <Route>
                <div>Not found.</div>
              </Route>
            </Switch>
          </Container>
        </Router>
      </AuthContext.Provider>
    </>
  );
};

export default App;
