import { Router } from "express";
import {
  getTodo,
  create,
  remove,
  update,
} from "../controllers/routController.js";

const router = new Router();
import Todo from "../models/Todo.js";

// Get todo
//http://localhost:3002/organizer
router.get("/", getTodo);

// Create
// http://localhost:3002/organizer
router.post("/", create);

// Update
//http://localhost:3002/organizer
router.patch("/", update);

// Remove
//http://localhost:3002/organizer
router.delete("/", remove);

export default router;
