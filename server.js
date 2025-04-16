const express = require('express');
const cors = require('cors');
const  connectDB  = require('./config/db');

const  userRoutes = require('./router/userRoute');
const jobRoutes = require('./router/jobRoute');
const applicationRoutes = require('./router/applicationRoute');


require('dotenv').config()

//mongoDb connection
connectDB();

// const route = require('./router/')
const app = express();
const port = process.env.PORT || 8000;

app.use(cors());
app.use(express.json());

app.use('/', userRoutes);
app.use('/', jobRoutes);
app.use('/', applicationRoutes);

app.get("/api/users", (req,res)=>{
    res.send("<h1>Welcome to job portal</h1>")

});

app.listen(port,()=>{
    console.log(`server is running at ${port}`)
    console.log()
});


