import { todoController } from "../controllers/todo.controller.js";

import { Router } from "express";

const router = Router();

// GET ROUTES
router.get('/', todoController.read);

router.get('/:id', todoController.readById);

// POST METHOD
router.post('/', todoController.create);

// PUT METHOD
router.put('/:id', todoController.update);

// DELETE METHOD
router.delete('/:id', todoController.remove);

export default router;