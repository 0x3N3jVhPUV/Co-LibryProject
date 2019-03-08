const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');

const posts = require('./routes/api/posts');
const profile = require('./routes/api/profile');
const users = require('./routes/api/users');

const app = express();

//Body parser middleware
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

//DB config
const db = require('./config/key').mongoURI

mongoose.set('useFindAndModify', false);

//connect to MongoDB
mongoose
    .connect(db, { useNewUrlParser: true }) 
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log('err'));

//Passport middleware
app.use(passport.initialize());

//passport Config
require('./config/passport')(passport);

//Use Routes
app.use('/api/posts', posts);
app.use('/api/profile', profile);
app.use('/api/users', users);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running on port ${port}`));