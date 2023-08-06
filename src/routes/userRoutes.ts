import express from 'express';
import UserController from '../controllers/UserController';

const router = express.Router();
const userController = new UserController();

router.get('/users', userController.getAllUsers);
router.get('/users/:username/details', userController.getUserDetails);
router.get('/users/:username/repos', userController.getUserRepositories);

export default router;
