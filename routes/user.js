const express = require("express");
const router = express.Router();
const userController = require("../controllers/usercontroller");
const authMiddleware = require("../middleware/auth");


router.put("/user",authMiddleware, userController.updatingUser);
router.post("/user/card",authMiddleware, userController.addCards);
router.post("/user/address",authMiddleware, userController.addAddress);
router.get("/users", userController.getAllUsers);

module.exports = router;
