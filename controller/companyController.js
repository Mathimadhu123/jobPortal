const Company = require('../model/companyModel')

const createCompany = async (req, res) => {
    try {
      const { name, description, location, website } = req.body;
  
      if (!name || !description || !location || !website) {
        return res.status(400).json({ message: 'All fields are required' });
      }
  
      const existingCompany = await Company.findOne({ name });
      if (existingCompany) {
        return res.status(409).json({ message: 'Company already exists' });
      }
  
      const company = await Company.create({
        name,
        description,
        location,
        website,
        // createdBy: req.user.id  // assuming employer/admin is logged in
      });
  
      res.status(201).json({ message: 'Company profile created', company });
    } catch (error) {
      res.status(500).json({ message: 'Error creating company', error });
    }
  };
  
  const getAllCompanies = async (req, res) => {
    try {
      const companies = await Company.find();
      res.status(200).json(companies);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching companies', error });
    }
  };
  

  const getCompanyById = async (req, res) => {
    try {
      const company = await Company.findById(req.params.id);
      if (!company) {
        return res.status(404).json({ message: 'Company not found' });
      }
      res.status(200).json(company);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching company', error });
    }
  };

module.exports = { createCompany, getAllCompanies, getCompanyById };