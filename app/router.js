import express from 'express';
import userController from './controllers/userController';
import articleController from './controllers/articleController';
import commentController from './controllers/commentController';
import categoryController from './controllers/categoryController';

const router = express.Router();



router.get('users', userController.findUsers);

export default router;