import { Router } from "express";
import { postURLShortener, getShortenerPage, redirectShortLink } from "../controllers/postShortener.controller.js";

const router = Router(); 

router.get("/", getShortenerPage);

router.post("/", postURLShortener);

router.get("/:shortCode", redirectShortLink);

export default router;
