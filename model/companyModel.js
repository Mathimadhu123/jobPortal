const mongoose = require('mongoose');

const companySchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please enter company name'],
    unique: true
  },
  description: {
    type: String,
    required: [true, 'Please enter company description']
  },
  location: {
    type: String,
    required: [true, 'Please enter company location']
  },
  website: {
    type: String,
    required: [true, 'Please enter company website']
  },
//   createdBy: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'User',
//     required: true
//   }
}, { timestamps: true });

module.exports = mongoose.model('Company', companySchema);
