import express from 'express';
import UserController from '../controllers/UserController';

const router = express.Router();
const userController = new UserController();

router.get('/users', userController.getAllUsers);
router.get('/users/:username/details', userController.getUserDetails);



export default router;
