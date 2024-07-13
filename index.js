const express = require('express');
const dotenv = require('dotenv').config();

const app = express();

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
