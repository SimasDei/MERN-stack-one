const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const items = require('./routes/api/items');

const app = express();

// Bodyparser Middleware
app.use(bodyParser.json());

// DB  Config
const db = require('./config/keys').mongoURI;

// Connect to MongoDB via mongoose
mongoose.connect(db)
  .then(() => {
    console.log('Connected to MongoDB')
  }).catch(err =>{
    console.log(err)
})

// User routes. Anything that requires api, goes through items
app.use('/api/items', items);

// Create server port, process.env for deployment, port 5000 for dev
const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on ${port}`));