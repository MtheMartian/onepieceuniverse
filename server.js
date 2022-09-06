const express = require('express');
const ejs = require('ejs');
const passport = require('passport');
const flash = require('express-flash');
const session = require('express-session');
const connectDB = require('./config/database');
const homeRoutes = require('./routes/home');
const characterCardRoutes = require('./routes/charactercards');
const characterInfoRoutes = require('./routes/characterinfo');
const usersRoutes = require('./routes/User');
const MongoStore = require('connect-mongo');
const app = express();

require('dotenv').config({path: './config/.env'});

require('./config/passport')(passport);

connectDB();

app.set('view engine', 'ejs');
app.use(express.static('assets'));
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  store: MongoStore.create({mongoUrl: process.env.DB_STRING}),
}))
app.use(passport.initialize());
app.use(passport.session());

app.use(flash());

//Global variables
app.use((request,response, next) =>{
  response.locals.success_msg = request.flash('success_msg');
  response.locals.error_msg = request.flash('error_msg');
  response.locals.error = request.flash('error');
  next();
})

app.use('/', homeRoutes);
app.use('/', characterCardRoutes);
app.use('/', characterInfoRoutes);
app.use('/', usersRoutes);

app.listen(process.env.PORT, () =>{
  console.log(`Server running on port ${process.env.PORT}`);
})