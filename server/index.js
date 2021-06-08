const express = require('express');
const cors = require('cors');

// app
const app = express();

// constants
const PORT = process.env.PORT || 3001;
const API = '/api/v1';

// middleware
app.use(cors());
app.use(express.json());

// database
const db = require('./models');

// routers
const authRoutes = require('./routes/auth.routes');
app.use(`${API}/auth`, authRoutes);

// init server
db.sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on: http://localhost:${PORT}`);
  });
});
