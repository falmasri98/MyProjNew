const express = require("express");
const adminControllers = require("../controllers/admin-controllers");

const router = express.Router();

router.get("/get-aboutus-content", adminControllers.getAboutUsContent);
router.get("/get-users", adminControllers.getUsers);
router.post("/add-new-admin", adminControllers.addNewAdmin);
router.post("/login", adminControllers.adminLogin);
router.patch("/update-user-role/:userId", adminControllers.updateUserRole);
router.patch("/update-aboutus-content", adminControllers.updateAboutUsContent);
router.delete("/delete-user/:userId", adminControllers.deleteUser);

module.exports = router;
