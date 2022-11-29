const express = require("express");
const auth = require("../middelware/authMiddleware");
const admin = require("../middelware/adminMiddlware");
const paymentt = require('./payment');

const router = express.Router();
const {
  getMedicines,
  getMedicine,
  postMedicine,
  updateMedicine,
  deleteMedicine,
} = require("../controllers/pharmaciesController");



router.get("/", getMedicines); 
router.get("/:id",[auth], getMedicine); 
router.post("/", [auth,admin], postMedicine); 
router.put("/:id",[auth,admin], updateMedicine); 
router.delete("/:id", [auth,admin], deleteMedicine);
router.put("/",[auth] ,paymentt.putPayment);
module.exports = router;
