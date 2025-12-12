import express from "express";
import {
  createBootcamp,
  deleteBootcamp,
  getBootcamp,
  getBootcampById,
  updateBootcamp,
} from "../controllers/bootCampController.js";
import { asyncHandler } from "../middleware/asyncHandler.js";

const router = express.Router();

// router.get("", getBootcamp);
// router.get("/:id", getBootcampById);
// router.post("", createBootcamp);
// router.put("/:id", updateBootcamp);
// router.delete("/:id", deleteBootcamp);
//or

//added the async handler so that we dont have to write the try-catch in controller
router
  .route("/")
  .get(asyncHandler(getBootcamp))
  .post(asyncHandler(createBootcamp));
router
  .route("/:id")
  .get(asyncHandler(getBootcampById))
  .put(asyncHandler(updateBootcamp))
  .delete(asyncHandler(deleteBootcamp));

export default router;
