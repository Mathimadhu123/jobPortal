const express = require('express');
const router = express.Router();
const companyController = require('../controller/companyController');
const { protect } = require('../middleware/authMiddleware');

// Employer/Admin routes
router.post('/company',  companyController.createCompany);
router.get('/companies', companyController.getAllCompanies);
router.get('/company/:id', companyController.getCompanyById);

module.exports = router;
