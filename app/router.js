import express from 'express';
import userController from './controllers/userController';
import articleController from './controllers/articleController';
import commentController from './controllers/commentController';
import categoryController from './controllers/categoryController';
import refreshTokenController from './controllers/refreshTokenController';
import verifyToken from './middlewares/verifyToken.js';


const router = express.Router();


// GET 

// FIND ALL
router.get('/users', userController.findUsers);
router.get('/articles', articleController.findAllArticles);
router.get('/lastArticles', articleController.findLastFourArticles);
router.get('/comments', commentController.findOneComment);
router.get('/categories', categoryController.findCategories);

router.get('/articlesByCategory/:id', articleController.byCategory);
router.get('/articles/mostLiked', articleController.getBestArticles);
 // -----------------------------------------------

 // FIND ONE

router.get('/user/:id', userController.findUsers);
router.get('/article/:id', articleController.findOneArticle);
router.get('/articles', articleController.findAllArticles);
router.get('/article/:id/comments', commentController.findCommentByArticle);
router.get('/comment/:id', commentController.findOneComment);
router.get('/category/:id', categoryController.findOneCategory);
router.get('/', refreshTokenController.handleRefreshToken);
// POST 
router.post('/user/create', userController.createUser);
router.post('/comment/create', commentController.createComment);
router.post('/category/create', categoryController.create);
router.post('/article/create', articleController.createArticle);

router.post('/api/authenticate', userController.login);
router.post('/api/authorization', verifyToken, userController.authorization);
router.post("/send_mail", userController.sendMail);
// UPDATE
router.put('/article/setOnline/:id', articleController.setOnLine);
router.put('/article/setOffline/:id', articleController.setOffLine);
router.put('/article/incrementLike/:id', articleController.addLike);
router.put('/article/decrementLike/:id', articleController.removeLike);
router.put('/user/update/:id', articleController.removeLike);

// DELETE
router.delete('/comment/delete/:id', commentController.deleteComment);
router.delete('/category/delete/:id', categoryController.delete);
router.delete('/user/delete/:id', userController.deleteUser);

export default router;