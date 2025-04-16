const mongoose = require('mongoose');

const applicationSchema = new mongoose.Schema({
    jobId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'jobModel',
        required: true
    },
    // applicantId: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'userModel',
    //     required: true
    // },
    resumeLink:{
        type:String,
        required: true
    },
    coverLetter:{
        type: String
    }
})

module.exports = mongoose.model('Application', applicationSchema)