const express = require('express');
const dotenv = require('dotenv').config();
const contactRoutes = require('./routes/contactRoutes');
const userRoutes = require('./routes/userRoutes');
const errorHander = require('./middleware/errorHandler');
const connectDb = require('./config/dbConnection');

connectDb();
const app = express();

const port = process.env.PORT || 3000;

app.use(express.json());
app.use('/user', userRoutes);
app.use('/contact', contactRoutes);
app.use(errorHander);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
