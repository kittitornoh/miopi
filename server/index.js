const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');

// app
const app = express();

// constants
const PORT = process.env.PORT || 3001;
const API = '/api/v1';

// middleware
app.use(cors());
app.use(express.json());
app.use(cookieParser());

// database
const db = require('./models');

// routers ----------------------------------------------------------------
//auth
const authRoutes = require('./routes/auth.routes');
app.use(`${API}/auth`, authRoutes);
// posts
const postsRoutes = require('./routes/posts.routes');
app.use(`${API}/posts`, postsRoutes);

// init server
db.sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on: http://localhost:${PORT}`);
  });
});
