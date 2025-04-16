const mongoose = require('mongoose');

const connectDB = async () => {
    try{
        const conn = await mongoose.connect(process.env.MONGODB_URL)
        console.log(`connected to  mongoDB ${mongoose.connection.host}`)
    } catch(error){
        console.log("Error in connecting DB", error);
        
    }
    
}


module.exports = connectDB