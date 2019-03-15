const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');

const register = require('./controllers/Register');
const signin = require('./controllers/SignIn');
const profile = require('./controllers/Profile');
const image = require('./controllers/Image');

const db = knex({
    client: 'pg',
    connection: {
      host : process.env.DATABASE_URL,
      ssl : true
    }
  });

const app = express();

app.use(bodyParser.json());
app.use(cors());

app.get('/',(req,res)=>{res.send('it is working');})
app.post('/signin',signin.handleSignIn(db,bcrypt))
app.post('/register',(req,res) => {register.handleRegister(req,res,db,bcrypt)})
app.get('/profile/:id',(req,res) => {profile.handleProfileGet(req,res,db)})
app.put('/image',(req,res) => {image.handleImagePut(req,res,db)})
app.post('/imageUrl',(req,res) => {image.handleApiCall(req,res)})
app.listen(process.env.PORT || 3000,() =>{
    console.log(`App is running on port ${process.env.PORT}`);
})