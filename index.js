const mongoose = require('mongoose')
const express = require("express");
const app = express();
const register = require('./routes/Auth/register');
const login = require("./routes/Auth/login");
const errorHandler = require('./middleware/error')

DB = 'mongodb+srv://GogoBikes:gogobikes@gogobikes.xqeyk.mongodb.net/GogoBikes?retryWrites=true&w=majority'

mongoose.connect(DB)
.then(()=>{
    console.log("connected to mongoDb")
})
.catch(()=> {
    console.log("Failed to connect mongo")
});


app.set('port', process.env.PORT || 3000);
app.use(express.json());

app.use('/api/user/register' , register);
app.use('/api/user/login' , login)

app.use(errorHandler)
const port = app.get('port')
app.listen(port , ()=> console.log(`Listening to port number ${port}...`));


