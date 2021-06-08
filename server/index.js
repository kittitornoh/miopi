const express = require('express');
const cors = require('cors');

// app
const app = express();

// constants
const PORT = process.env.PORT || 3001;

// middleware
app.use(cors());
app.use(express.json());

// database

// routers

// init server
app.listen(PORT, () => {
  console.log(`Server is running on: http://localhost:${PORT}`);
});
