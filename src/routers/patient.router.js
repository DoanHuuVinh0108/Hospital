import express from "express";
import patient from "../controllers/patient.controller";

const router = express.Router();

router.route("/getId/:id").get(patient.getId);
router.route("/getAll").get(patient.getAll);
router.route("/add").post(patient.add);
router.route("/update/:id").put(patient.update);
router.route("/delete/:id").delete(patient.delete);

module.exports = router;
