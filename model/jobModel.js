const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
        title: {
            type: String,
            required:[true, "Please enter job title"]
        },
        description:{
            type: String,
            required: [true, "Please enter job dewcription"]
        },
        company:{
            type: String,
            required: [true, "Please enter company name"]
        },
        location:{
            type: String,
            required: [true, "Please enter job location"]
        },
        salary:{
            type: Number,
            required: [true, "Please enter job salary"]
        },
        type:{
            type: String,
            required: [true, "Please enter job type"],
            enum: ['full-time',  'part-time', 'internship'],
            default: 'full-time',  
        }
})
module.exports = mongoose.model('Job', jobSchema);