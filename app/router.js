import express from 'express';
import userController from './controllers/userController';
import articleController from './controllers/articleController';
import commentController from './controllers/commentController';
import categoryController from './controllers/categoryController';

const router = express.Router();


// GET 

// FIND ALL
router.get('/users', userController.findUsers);
router.get('/articles', articleController.findAllArticles);
router.get('/comments', commentController.findOneComment);
router.get('/categories', categoryController.findCategories);

 // -----------------------------------------------

 // FIND ONE

router.get('/user/:id', userController.findUsers);
router.get('/article/:id', articleController.findAllArticles);
router.get('/comment/:id', commentController.findOneComment);
router.get('/category/:id', categoryController.findOneCategory);
// POST 
router.post('/user/create', userController.createUser);
router.post('/comment/create', commentController.createComment);
router.post('/category/create', categoryController.create);
router.post('/article/create', articleController.createArticle);
router.post('/article/setOnline', articleController.setOnLine);

// UPDATE

// DELETE
router.delete('/comment/delete/:id', commentController.deleteComment);

export default router;