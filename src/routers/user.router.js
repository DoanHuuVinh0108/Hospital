import express from "express";
import user from "../controllers/user.controller"

const router = express.Router();

router.route("/getId/:id").get(user.getId);
router.route("/add").post(user.add);
router.route("/update/:id").put(user.update);
router.route("/delete/:id").delete(user.delete);

module.exports = router;
