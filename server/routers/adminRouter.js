const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const userController = require('../controllers/userController');


// router.post('/create',
//   adminController.bcryptPassword,
//   adminController.addNewAdmin,
//   adminController.assignJwt,
//   adminController.assignUserJwt,
//   (req, res) => {
//     const { token } = res.locals;
//     res.status(200).json(token);
//   })

// router.post('/verify',
//   adminController.verifyAdmin,
//   adminController.verifyUser,
//   (req, res) => {
//     const { isAdmin } = res.locals;
//     res.status(200).json(isAdmin);
//   }
// )

module.exports = router;