const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.post('/create',
  userController.bcryptPassword,
  userController.teamIdLookup,
  userController.addNewUser,
  (req, res) => res.status(200).json('Successfully added new user'));

router.post('/login',
  userController.loginCheck,
  userController.isAdminCheck,
  userController.teamId,
  userController.assignJwt,
  (req, res) => {
    const { token } = res.locals;
    res.cookie('AuthToken', token, { maxAge: 900000, httpOnly: true });
    res.status(200).json(token);
  }
)

router.post('/verify',
  userController.verifyAdmin,
  (req, res) => {
    const { isAdmin } = res.locals;
    res.status(200).json(isAdmin);
  }
)

module.exports = router; 