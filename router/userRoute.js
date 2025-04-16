// const express = require('express');
// const router = express.Router();
// const authController = require('../controller/authController'); // ✅ Correct the path

// router.post('/register', authController.register);

// module.exports = router;

const express = require('express');
const router = express.Router();
const userController = require('../controller/userController')



router.post('/user/register', userController.register);

router.post('/user/login', userController.login);

// router.put('/quizz/:id', quizzController.updateQuizz);

// router.delete('/quizz/:id', quizzController.deleteOneQuizz)

module.exports = router;
