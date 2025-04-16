const User = require('../model/userModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs'); 

const register = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;

        // Validate fields
        if (!name || !email || !password || !role) {
            return res.status(400).json({ message: "All fields are required" });
        }

        // Check if user already exists
        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(409).json({ message: "User already exists with this email" });
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create user
        const userCreate = await User.create({
            name,
            email,
            password: hashedPassword,
            role
        });

        // Create JWT token
        const token = jwt.sign(
            { id: userCreate._id, role: userCreate.role },
            process.env.JWT_SECRET,
            { expiresIn: '1d' }
        );

        // Success response
        res.status(201).json({
            message: "User created successfully",
            user: {
                id: userCreate._id,
                name: userCreate.name,
                email: userCreate.email,
                role: userCreate.role
            },
            token
        });

    } catch (error) {
        console.error("Error in user registration", error);
        res.status(500).json({ message: "Registration failed", error });
    }
};

const login = async (req, res) =>{
    try {
        const {email, password} = req.body;

        if(!email, !password){
           return res.status(400).json({message: "All fields are required"})
        }

        const user = await User.findOne({email});
        if(!user){
           return res.status(404).json({message:"User not found"});
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){
           return res.status(401).json({message:"Invalid Password"})
        }

        const token = await jwt.sign({id:user._id, role:user.role}, process.env.JWT_SECRET,{expiresIn:'1d'});
        res.status(200).json({
            message:"Login successful",
            user:{
                id: user._id,
                email: user.email,
                role: user.role
            },
            token
        })

    } catch (error) {
        console.error("Error in Logging In", error);
        res.status(500).json({ message: "Logging in failed", error})
    }
}
module.exports = { register, login };




// const updateQuizz = async (req, res) => {
//     try {
//         const { id } = req.params;
//         console.log(id);

//         const quizzExists = await quizz.findOne({ _id: id })
//         if (!quizzExists) {
//             res.status(404).json({ message: "Quizz not found" })
//         }

//         const update = await quizz.findByIdAndUpdate(id, req.body, { new: true });
//         res.status(201).json(update);

//     } catch (error) {
//         console.log(error)
//         res.status(500).json({ message: "Error in updating quizz", error })
//     }
// }

// const deleteOneQuizz = async (req, res)=>{
//     try{
//       const {id} = req.params ;
//       const quizzExists = await quizz.findOne({_id :id});

//       if(!quizzExists){
//         res.status(404).json({message:"Quizz not found to delete"})
//       }

//       const deleteOne = await quizz.findByIdAndDelete(id);
//       res.status(200).json(deleteOne);

//     }catch(error){
//         res.status(500).json({message : "error in deleting Quizz"})
//     }
// }

// module.exports = { getQuiz, createQuizz, updateQuizz, deleteOneQuizz };

