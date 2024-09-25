import express from "express";
import doctor from "../controllers/doctor.controller";

const router = express.Router();

router.route("/getId/:id").get(doctor.getId);
router.route("/getAll").get(doctor.getAll);
router.route("/getDoctorSalient").get(doctor.getDoctorSalient);
router.route("/add").post(doctor.add);
router.route("/update/:id").put(doctor.update);
router.route("/delete/:id").delete(doctor.delete);

module.exports = router;
