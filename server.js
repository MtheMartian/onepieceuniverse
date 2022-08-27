const express = require('express');
const ejs = require('ejs');
const cors = require('cors');
const connectDB = require('./config/database');
const homeRoutes = require('./routes/home');
const characterCardRoutes = require('./routes/charactercards');
const characterInfoRoutes = require('./routes/characterinfo');
const app = express();

require('dotenv').config({path: './config/.env'});

connectDB();

app.set('view engine', 'ejs');
app.use(express.static('assets'));
app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.use('/', homeRoutes);
app.use('/', characterCardRoutes);
app.use('/', characterInfoRoutes);

app.listen(process.env.PORT, () =>{
  console.log(`Server running on port ${process.env.PORT}`);
})