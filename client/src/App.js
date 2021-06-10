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
import NewPost from './pages/NewPost';
import NotFound from './pages/NotFound';

// context
import { AuthContext } from './auth/AuthContext';

// components
import Loading from './components/Loading';
import ProtectedRoute from './components/ProtectedRoute';
import NavBar from './components/NavBar';
import Container from 'react-bootstrap/Container';

const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [authState, setAuthState] = useState({
    id: '',
    name: '',
    isAuth: false,
  });

  /**
   * Validate token.
   */
  const validateToken = async () => {
    setIsLoading(true);
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
          setIsLoading(false);
        });
    } catch (error) {
      console.log(error.response.data);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    // check for token
    if (localStorage.getItem('access-token')) {
      // validate token if it exists
      validateToken();
    } else {
      setIsLoading(false);
    }
  }, []);

  return (
    <>
      <AuthContext.Provider value={{ authState, setAuthState }}>
        <Router>
          <NavBar />

          <Container style={{ marginTop: 80 }}>
            {isLoading ? (
              <Loading />
            ) : (
              <Switch>
                <Route exact path='/' component={Home} />
                <Route exact path='/login' component={Login} />
                <Route exact path='/register' component={Register} />
                <Route exact path='/post/:postId' component={Post} />
                <ProtectedRoute
                  exact
                  path='/profile'
                  isAuth={authState.isAuth}
                  component={Profile}
                />
                <ProtectedRoute
                  exact
                  path='/newPost'
                  isAuth={authState.isAuth}
                  component={NewPost}
                />
                <Route component={NotFound} />
              </Switch>
            )}
          </Container>
        </Router>
      </AuthContext.Provider>
    </>
  );
};

export default App;
