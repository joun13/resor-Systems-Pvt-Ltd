const express = require("express");
const router = express.Router();

const { csv } = require("../controllers/csv");

router.get("/csv", csv);

module.exports = router;
