import { useState, useEffect, createElement } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import axios from 'axios';

// api
import * as API from './api/api';

// pages
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Post from './pages/Post';
import Profile from './pages/Profile';
import NewPost from './pages/NewPost';

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

  /**
   * Validate token.
   */
  const validateToken = async () => {
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
      // validate token if it exists
      validateToken();
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
              <Route exact path='/login' component={Login} />
              <Route exact path='/register' component={Register} />
              <Route exact path='/post/:postId' component={Post} />
              <PrivateRoute exact path='/profile' component={Profile} />
              <PrivateRoute exact path='/newPost' component={NewPost} />
              <Route>
                <div>Not found.</div>
              </Route>
            </Switch>
          </Container>
        </Router>
      </AuthContext.Provider>
    </>
  );

  function PrivateRoute({ component, ...rest }) {
    return (
      <Route
        {...rest}
        render={(props) => {
          return authState.isAuth ? (
            createElement(component, props)
          ) : (
            <Redirect to='/' />
          );
        }}
      />
    );
  }
};

export default App;
