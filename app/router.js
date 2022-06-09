import express from 'express';
import userController from './controllers/userController';
import articleController from './controllers/articleController';
import commentController from './controllers/commentController';
import categoryController from './controllers/categoryController';

const router = express.Router();


// GET 
router.get('/users', userController.findUsers);
// POST 
router.post('/createUser', userController.createUser);
// UPDATE

// DELETE
export default router;