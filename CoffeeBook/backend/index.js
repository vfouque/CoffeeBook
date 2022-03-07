require('dotenv').config();

const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const JWTtokenCheck = require('./middlewares/JWTtokenCheck');
const indexRouter = require('./routes/index');
const categoryRouter = require('./routes/category');
const userRouter = require('./routes/user');
const loginRouter = require('./routes/login');
const logoutRouter = require('./routes/logout');
const subscribeRouter = require('./routes/subscribe');
const postRouter = require('./routes/post')

const app = express();

// Specifier le répertoire pour les fichiers static : .css, .js, .jpg, ...
app.use(express.static('public'));

// Allow requests from all origins
app.use(
    cors({
        credentials: true,
        origin: 'http://localhost:3000',
    })
);

// ajouter les middleware pour la lecture des cookies et du corps des requetes post
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

// use router files
app.use(JWTtokenCheck);
app.use('/', indexRouter);
app.use('/login', loginRouter);
app.use('/logout', logoutRouter);
app.use('/subscribe', subscribeRouter);
app.use('/categories', categoryRouter);
app.use('/user', userRouter);
app.use('/post', postRouter);

// start the server
app.listen(process.env.PORT || 5000, () => {
    console.log(`CoffeeBook running on ${process.env.PORT || 5000}`);
});
