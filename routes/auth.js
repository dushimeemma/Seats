import express from 'express';
import User from '../controllers/auth';

const router = express.Router();
const user = new User();

router.post('/signup', user.createUser);
router.post('/login', user.authUser);

export default router;
