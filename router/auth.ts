import * as express from "express";
import { UserService } from "../services/user-service";
import { AuthService } from "../services/auth-service";

const router = express.Router();

router.post("/send-email-verification", async (req, res) => {
  try {
    const userService = new UserService();
    const user = await userService.getUser(req.body.email);

    if (user) {
      const authService = new AuthService();
      const otp = await authService.createOTP(user.email);

      const response = await authService.sendPasswordResetEmail(
        user.email,
        user.name,
        otp
      );

      if (response.statusCode === 202) {
        res.status(200).json({ message: "Email sent successfully" });
      } else {
        res.status(500).json({ message: "Unable to send an email" });
      }
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Unable to send an email for verification" });
  }
});

router.post("/verify-email-otp", async (req, res) => {
  try {
    const { email, otp } = req.body;
    const authService = new AuthService();
    const isVerified = await authService.verifyOTP(email, otp);

    if (isVerified) {
      res.status(200).json({ message: "OTP verified successfully" });
    } else {
      res.status(400).json({ message: "OTP verification failed" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Unable to verify OTP" });
  }
});

export const authRouter = router;
