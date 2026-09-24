import { Router } from 'express';
import { userController } from '../controllers/user.controller.js';

const router = Router();

router.post('login', ( req, res ) => { userController.login } );
router.post('register', ( req, res ) => { userController.register } );

export default router;