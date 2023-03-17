import Router from "express";
import { verify, verifyDB } from "../middleware/verify.js";
import { Register, Login, Logout, RefreshToken } from "../controller/user.js";
const router = Router();

router.post("/register", Register);
router.post("/login", Login);
router.get("/logout", verify, verifyDB, Logout);
router.get("/refresh", verify, verifyDB, RefreshToken);

export default router;
