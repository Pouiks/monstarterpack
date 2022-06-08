import express from 'express';
const router = express.Router()

router.get('/', (req, res) => res.render('pages/index'));

router.get('/admin', (req, res) => res.render('pages/admin.ejs'));
router.get('/connexion', (req, res) => res.render('pages/login.ejs'));
router.get('/creer_un_compte', (req, res) => res.render('pages/create_account.ejs'));



export default router;
