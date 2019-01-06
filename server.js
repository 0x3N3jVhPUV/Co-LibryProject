const express = require('express');
const mongoose = require('mongoose');

const posts = require('./routes/api/posts');
const profile = require('./routes/api/profile');
const users = require('./routes/api/users');

const app = express();

//DB config
const db = require('./config/key').mongoURI

//connect to MongoDB
mongoose
    .connect(db, { useNewUrlParser: true }) 
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log('err'));

app.get('/', (req, res) => res.send('hello world'));

//Use Routes
app.use('/api/posts', posts);
app.use('/api/profile', profile);
app.use('/api/users', users);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running on port ${port}`));