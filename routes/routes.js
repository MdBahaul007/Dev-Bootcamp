import express from "express";
import {
  createBootcamp,
  deleteBootcamp,
  getBootcamp,
  getBootcampById,
  updateBootcamp,
} from "../controllers/bootCampController.js";

const router = express.Router();

// router.get("", getBootcamp);
// router.get("/:id", getBootcampById);
// router.post("", createBootcamp);
// router.put("/:id", updateBootcamp);
// router.delete("/:id", deleteBootcamp);
//or

router.route("/").get(getBootcamp).post(createBootcamp);
router
  .route("/:id")
  .get(getBootcampById)
  .put(updateBootcamp)
  .delete(deleteBootcamp);

export default router;
