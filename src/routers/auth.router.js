import express from "express";
import auth from "../controllers/auth.controller";

const router = express.Router();

router.route("/login").post(auth.login);

module.exports = router;
