const express = require("express");
const adminControllers = require("../controllers/admin-controllers");

const router = express.Router();

router.get("/get-aboutus-content", adminControllers.getAboutUsContent);
router.get("/get-contactus-content", adminControllers.getContactUsContent);
router.get("/get-users", adminControllers.getUsers);
router.get("/get-admins", adminControllers.getAdmins);
router.post("/add-new-admin", adminControllers.addNewAdmin);
router.post("/login", adminControllers.adminLogin);
router.patch("/update-user-role/:userId", adminControllers.updateUserRole);
router.patch("/update-aboutus-content", adminControllers.updateAboutUsContent);
router.patch(
  "/update-contactus-content",
  adminControllers.updateContactUsContent
);
router.delete("/delete-admin/:adminId", adminControllers.deleteAdmin);
router.delete("/delete-user/:userId", adminControllers.deleteUser);

module.exports = router;
