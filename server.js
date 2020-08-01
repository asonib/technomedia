const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

const app = express()
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

mongoose.connect('mongodb://localhost/contact', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(()=>{
    console.log('MongoDB Connected')
}).catch((err) => {
    console.error(`Error Connecting to DB ${err}`)
})

app.use('/api', require('./routes/auth/login'));
app.use('/api', require('./routes/auth/register'));

const port = process.env.port || 3000;
app.listen(port, () => {
    console.log(`server started at port ${port}`)
});