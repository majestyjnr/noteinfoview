const express = require('express');
const fs = require('fs');
const app = express();

// Allow read and write of JSON in application
app.use(express.json());

// Require route
const route = require('./routes/route')

// Register route
app.use('/', route)

const PORT = 4500
// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
