require('dotenv').config();

const express = require('express');
const mongoose  = require('mongoose');
const morgan = require('morgan');
const path = require('path');

const app = express();

/**
 * Databases setup
 */
mongoose.connect(process.env.MONGODB_SECRET_KEY_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

/**
 * Server setup to handle JSON and image files  
*/
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use(
  '/files',
  express.static(path.resolve(__dirname, '..', 'uploads'))
)

app.use(require('./routes'));

app.listen(3000, () => {
  console.log('Server is running on port:3000...');
});