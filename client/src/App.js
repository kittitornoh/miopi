import { useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useHistory,
} from 'react-router-dom';

// pages
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Post from './pages/Post';
import Profile from './pages/Profile';

// context
import { AuthContext } from './auth/AuthContext';

const App = () => {
  let history = useHistory();
  const [authState, setAuthState] = useState(false);

  return (
    <>
      <AuthContext.Provider value={{ authState, setAuthState }}>
        <Router>
          <nav>
            <div>
              <p>Register</p>
            </div>
          </nav>
          <Switch>
            <Route exact path='/' component={Home} />
            <Route path='/login' component={Login} />
            <Route path='/register' component={Register} />
            <Route path='/:postId' component={Post} />
            <Route path='/profile' component={Profile} />
            <Route>
              <div>Not found.</div>
            </Route>
          </Switch>
        </Router>
      </AuthContext.Provider>
    </>
  );
};

export default App;
