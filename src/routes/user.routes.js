const express = require('express');
const router = express.Router();
const UserController = require('../controllers/user.controller');
const validate = require('../middlewares/validate.middleware');
const { createUserSchema, updateUserSchema } = require('../validators/user.validator');

router.post('/', validate(createUserSchema), UserController.createUser);
router.put('/:id', validate(updateUserSchema), UserController.updateUser);

router.get('/:id', UserController.getUserById);
router.get('/', UserController.getAllUsers);
router.patch('/:id/soft-delete', UserController.softDeleteUser);
router.delete('/:id', UserController.deleteUser);

module.exports = router;
