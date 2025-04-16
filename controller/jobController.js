const jobModel = require('../model/jobModel');

const createJob = async (req, res) => {
    try {
        const { title, description, company, location, salary, type } = req.body;

        if (!title, !description, !company, !location, !salary, !type) {
            res.status(400).jon({ message: "All fields are required" })
        }

        const job = await jobModel.create({
            title,
            description,
            company,
            location,
            salary,
            type,

        })

        res.status(201).json({ message: "Job created successfully", job });

    } catch (error) {
        console.error("Error in creating job", error);
        res.status(500).json({ message: "Job creation failed", error });
    }
}

const getAllJobs = async (req, res) => {
    try {
        const jobs = await jobModel.find().sort({ createdAt: -1 });
        res.status(200).json({ message: "All jobs fetched successfully", jobs });

    } catch (error) {
        console.log("Error in getting all jobs", error);
        res.status(500).json({ message: "Failed to get all jobs", error });
    }
}

const getJobById = async (req, res) => {
    try {
        const { id } = req.params;
        const job = await jobModel.findById(id);

        if (!job) {
            return res.status(404).json({ message: "Job not found" })
        }

        res.status(200).json({ message: "Job fetched successfully", job });

    } catch (error) {
        console.error("Error in getting job by id", error);
        res.status(500).json({ message: "Failed to get job by id", error });
    }

}

const updateJob = async(req, res)  =>{
    try{
        const job = await jobModel.findById(req.params.id);

        if(!job){
            return res.status(404).json({message: "Job not found"})
        }

        const updatedJob = await jobModel.findByIdAndUpdate(req.params.id, req.body, {new : true} );

        res.status(200).json({message: "Job updated successfully", updatedJob})
        
    }catch(error){

    }
}

const deleteJob = async (req, res) => {
    try{
        const job = await jobModel.findById(req.params.id);
        if(!job){
            return res.status(404).json({message :"Job not Found"})
        }

        const deletedJob = await jobModel.findByIdAndDelete(job);
        res.status(200).json({message: "Job deleted successfully", deletedJob})

    }catch(error){
        console.error("Error in deleting job", error);
        res.status(500).json({message: "Failed to delete job", error});
    }
}
module.exports = { createJob, getAllJobs, getJobById, updateJob, deleteJob};

