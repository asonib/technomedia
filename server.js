const express = require('express')
const bodyParser = require('body-parser')

const app = express()
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

app.use('/api', require('./routes/auth/login'));
app.use('/api', require('./routes/auth/register'));

const port = process.env.port || 3000;
app.listen(port, () => {
    console.log(`server started at port ${port}`)
});