const express = require("express");
const cloudinaryRoutes = express.Router();

const multer = require("multer");
const cloudinary = require("../cloudinary-config"); // Import your Cloudinary configuration
const upload = multer({ dest: "../uploads/" });

cloudinaryRoutes.post("/upload", upload.single("image"), async (req, res) => {
  try {
    // Upload image
    const result = await cloudinary.uploader.upload(req.file.path);

    console.log(result.secure_url);

    // Respond with the Cloudinary image URL
    res.json({ imageUrl: result.secure_url });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Image upload failed" });
  }
});

module.exports = cloudinaryRoutes;
