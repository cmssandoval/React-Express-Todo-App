import { todoController } from "../controllers/todo.controller.js";
import { authMiddleware } from '../middlewares/auth.middleware.js';
import { Router } from "express";

const router = Router();

// GET ROUTES
router.get('/', authMiddleware, todoController.read);

router.get('/:id', authMiddleware, todoController.readById);

// POST METHOD
router.post('/', authMiddleware, todoController.create);

// PUT METHOD
router.put('/:id', authMiddleware, todoController.update);

// DELETE METHOD
router.delete('/:id', authMiddleware, todoController.remove);

export default router;