import express from "express";
import Feedback from "../models/Feedback.js";
import multer from "multer";
import path from "path";
import fs from "fs";

const router = express.Router();

// Multer setup for file upload (store files in 'uploads' folder)
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // ensure 'uploads' folder exists at your server root
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  },
});
const upload = multer({ storage });

// POST /api/tips - Submit feedback/tip
router.post("/", upload.single("attachment"), async (req, res) => {
  try {
    const {
      tip,
      category,
      anonymous,
      contact,
      lat,
      lng,
    } = req.body;

    console.log("Received tip:", tip);
    console.log("Received category:", category);
    console.log("Received anonymous:", anonymous);
    console.log("Received contact:", contact);
    console.log("Received lat:", lat);
    console.log("Received lng:", lng);
    console.log("Received file:", req.file);

    const isAnonymous = anonymous === "true";

    const newFeedback = new Feedback({
      tip,
      category,
      anonymous: isAnonymous,
      contact: isAnonymous ? "" : contact,
      attachment: req.file ? req.file.filename : null,
      location:
        lat && lng
          ? { lat: lat.toString(), lng: lng.toString() }
          : null,
    });

    await newFeedback.save();

    console.log("Saved feedback:", newFeedback);

    res.status(201).json({
      success: true,
      message: "Feedback submitted successfully",
      data: newFeedback,
    });
  } catch (error) {
    console.error("Error saving feedback:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
});



router.delete("/:id", async (req, res) => {
  console.log("DELETE called with id:", req.params.id); // Add this for debug
  try {
    const id = req.params.id;
    const feedback = await Feedback.findById(id);
    if (!feedback) {
      return res.status(404).json({ success: false, message: "Feedback not found" });
    }
    // delete attachment file if exists
    if (feedback.attachment) {
      const filePath = path.join(process.cwd(), "uploads", feedback.attachment);
      fs.unlink(filePath, (err) => {
        if (err) console.warn("Failed to delete file:", err.message);
      });
    }
    await Feedback.findByIdAndDelete(id);
    res.json({ success: true, message: "Feedback deleted successfully" });
  } catch (error) {
    console.error("Delete feedback error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
});




// GET /api/tips - Get all feedbacks
router.get("/", async (req, res) => {
  try {
    const list = await Feedback.find().sort({ createdAt: -1 });
    res.json({ success: true, data: list });
  } catch (error) {
    console.error("Error fetching feedbacks:", error);
    res.status(500).json({ success: false });
  }
});

export default router;
