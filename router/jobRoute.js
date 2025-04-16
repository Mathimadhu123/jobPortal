const express = require('express');
const router = express.Router();
const jobController = require('../controller/jobController');

router.post('/job/create', jobController.createJob);

router.get('/job/getAll', jobController.getAllJobs);

router.get('/job/getJobyId/:id', jobController.getJobById);

router.put('/job/update/:id', jobController.updateJob);

router.delete('/job/deleteById/:id', jobController.deleteJob); 


module.exports = router