import { useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

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
    id: 0,
    name: '',
    isAuth: false,
  });

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
