const express = require('express');
const router = express.Router();
const userController = require('../controller/users.controller');

// GET: get all users
router.get('/', (req, res) => {
  userController.getUsers(req, res);
})

// GET: get by id 
router.get('/:id', (req, res) => {
  userController.getUserById(req,res);
})

// POST: add new user
router.post('/', function (req, res) {
  userController.addUser(req,res);
})

// PUT: deposit
router.put('/deposit/:id', function (req, res) {
  userController.deposit(req,res);
})

// PUT: withdraw
router.put('/withdraw/:id', function (req, res) {
  userController.withdraw(req,res);
})

// PUT: update credit
router.put('/updateCredit/:id', function (req, res) {
  userController.updateCredit(req,res);
})

// PUT: transfer
router.put('/transfer/:src/:dst', function (req, res) {
  userController.transfer(req,res);
})

// DELETE: remove 
router.delete('/remove/:id', function (req, res) {
  userController.removeUser(req,res);
})

module.exports = router;