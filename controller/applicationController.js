const applicationModel = require('../model/applicationModel');
const user = require('../model/userModel');

const applyForJob = async (req, res) => {
    try {
      const { jobId, resumeLink, coverLetter } = req.body;
  
      console.log("Job ID:", jobId);
  
      //  Get the applicant ID from the logged-in user (requires auth middleware)
      const applicantId = req.user._id;
  
      const application = new applicationModel({
        job: jobId,
        applicant: applicantId,
        resumeLink,
        coverLetter,
      });
  
      //  Save the application to the database first
      await application.save();
  
      //  Respond after successful save
      res.status(200).json({
        message: "Job application submitted successfully",
        application,
      });
    } catch (error) {
      console.error("Error in applying for job", error);
      res.status(500).json({ message: "Failed to apply for job", error });
    }
  };
  


module.exports = { applyForJob }