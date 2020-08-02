const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const session = require('express-session')
const passport = require('passport')

const app = express()
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

// Passport Config
require('./services/passportjs/passport')(passport);
  

mongoose.connect('mongodb://localhost/contact', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(()=>{
    console.log('MongoDB Connected')
}).catch((err) => {
    console.error(`Error Connecting to DB ${err}`)
})

// Express session
app.use(
    session({
      secret: 'secret',
      resave: true,
      saveUninitialized: true
    })
);
  
// Passport middleware
app.use(passport.initialize());
app.use(passport.session());


app.use('/api', require('./routes/auth/login'));
app.use('/api', require('./routes/auth/register'));
app.use('/api', require('./routes/user/profile'))

const port = process.env.port || 3000;
app.listen(port, () => {
    console.log(`server started at port ${port}`)
});