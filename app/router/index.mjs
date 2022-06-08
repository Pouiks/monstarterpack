import express from 'express';
const router = express.Router()


// GET
router.get('/', (req, res) => res.render('pages/index'));

router.get('/admin', (req, res) => res.render('pages/admin.ejs'));
router.get('users', )
router.get('/connexion', (req, res) => res.render('pages/login.ejs'));
router.get('/creer_un_compte', (req, res) => res.render('pages/create_account.ejs'));

// POST

// UPDATE

// DELETE

export default router;
