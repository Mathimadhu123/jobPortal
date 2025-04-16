const express = require('express');
const applicationController = require('../controller/applicationController');
const router = express.Router();

router.post('/application/apply', applicationController.applyForJob);
router.get('/companies', companyController.getAllCompanies);
router.get('/company/:id', companyController.getCompanyById);

module.exports = router;