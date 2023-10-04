import { Router } from "express";
import {
  getRoom,
  getOneRoom,
  createRoom,
  deleteRoom,
  updateRoom,
} from "../ctr/room.ctr.js";

const router = Router();

router.get("/read", getRoom);
router.get("/read/:id", getOneRoom);
router.post("/create", createRoom);
router.delete("/delete/:room_id", deleteRoom);
router.put("/update/:room_id", updateRoom);

export default router;
