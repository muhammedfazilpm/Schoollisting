const express = require("express");

const schoolRoutes = express.Router();
const schoolController = require("../Controller/schoolController");
const { upload } = require("../config/multer");

schoolRoutes.post("/new", upload.single("image"), schoolController.addDetails);

schoolRoutes.get("/", schoolController.getList);

schoolRoutes.put("/delete/:id", schoolController.deleteSchool);

schoolRoutes.post("/view", schoolController.viewDetails);

schoolRoutes.post("/getdetails", schoolController.getEdit);

schoolRoutes.post("/edit", upload.single("image"), schoolController.postEdit);

module.exports = schoolRoutes;
