import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Post from './pages/Post';
import Profile from './pages/Profile';

const App = () => {
  return (
    <Router>
      <nav>
        <Link to='/'>Home</Link>
        <Link to='/login'>Login</Link>
        <Link to='/register'>Register</Link>
        <Link to='/post'>Post</Link>
        <Link to='/profile'>Profile</Link>
      </nav>

      <Switch>
        <Route exact path='/' component={Home} />
        <Route path='/login' component={Login} />
        <Route path='/register' component={Register} />
        <Route path='/post' component={Post} />
        <Route path='/profile' component={Profile} />
        <Route>
          <div>Not found.</div>
        </Route>
      </Switch>
    </Router>
  );
};

export default App;
