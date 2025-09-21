import express from 'express';
import { sendEmailOTP } from '../utils/otp.js';
import Institute from '../models/InstituteModel.js';
import Player from '../models/playerModel.js';

const router = express.Router();

// -------------------- Verify Email --------------------
router.post('/verify-email', async (req, res) => {
  try {
    const { instituteId, otp } = req.body;

    if (!instituteId) {
      return res.status(400).json({ message: 'Institute ID is required' });
    }

    const institute = await Institute.findById(instituteId);
    if (!institute) {
      return res.status(404).json({ message: 'Institute not found' });
    }

    if (!institute.emailOTP || String(institute.emailOTP) !== String(otp)) {
      return res.status(400).json({ message: 'Invalid OTP' });
    }

    if (institute.emailOTPExpiry < Date.now()) {
      return res.status(400).json({ message: 'OTP has expired' });
    }

    institute.emailVerified = true;
    institute.emailOTP = null;
    institute.emailOTPExpiry = null;
    await institute.save();

    return res.status(200).json({ success: true, message: 'Email Verified Successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
});

// -------------------- Resend OTP --------------------
router.post('/resend-otp', async (req, res) => {
  try {
    const { instituteId } = req.body;

    if (!instituteId) {
      return res.status(400).json({ message: 'Institute ID is required' });
    }

    const institute = await Institute.findById(instituteId);
    if (!institute) {
      return res.status(404).json({ message: 'Institute not found' });
    }

    // Prevent spamming: 2 minutes cooldown
    if (institute.lastOTPSent && Date.now() - institute.lastOTPSent < 2 * 60 * 1000) {
      return res.status(429).json({ message: 'Wait 2 minutes before requesting another OTP' });
    }

    const otp = Math.floor(100000 + Math.random() * 900000); // generate new OTP
    institute.emailOTP = otp;
    institute.emailOTPExpiry = Date.now() + 2 * 60 * 1000; // 2 minutes expiry
    institute.lastOTPSent = Date.now();
    await institute.save();

    await sendEmailOTP(institute.email, otp);

    return res.status(200).json({ success: true, message: 'OTP resent successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
});

// -------------------- Verify Email --------------------
router.post('/verify-email-player', async (req, res) => {
  try {
    const { playerId, otp } = req.body;

    if (!playerId) {
      return res.status(400).json({ message: 'Player ID is required' });
    }

    const player = await Player.findById(playerId);
    if (!player) {
      return res.status(404).json({ message: 'Player not found' });
    }

    if (!player.emailOTP || String(player.emailOTP) !== String(otp)) {
      return res.status(400).json({ message: 'Invalid OTP' });
    }

    if (player.emailOTPExpiry < Date.now()) {
      return res.status(400).json({ message: 'OTP has expired' });
    }

    player.emailVerified = true;
    player.emailOTP = null;
    player.emailOTPExpiry = null;
    await player.save();

    return res.status(200).json({ success: true, message: 'Email Verified Successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
});

// -------------------- Resend OTP --------------------
router.post('/resend-otp-player', async (req, res) => {
  try {
    const { playerId } = req.body;

    if (!playerId) {
      return res.status(400).json({ message: 'Player ID is required' });
    }

    const player = await Player.findById(playerId);
    if (!player) {
      return res.status(404).json({ message: 'Player not found' });
    }

    // Prevent spamming: 2 minutes cooldown
    if (player.lastOTPSent && Date.now() - player.lastOTPSent < 2 * 60 * 1000) {
      return res.status(429).json({ message: 'Wait 2 minutes before requesting another OTP' });
    }

    const otp = Math.floor(100000 + Math.random() * 900000); // generate new OTP
    player.emailOTP = otp;
    player.emailOTPExpiry = Date.now() + 2 * 60 * 1000; // 2 minutes expiry
    player.lastOTPSent = Date.now();
    await player.save();

    await sendEmailOTP(player.email, otp);

    return res.status(200).json({ success: true, message: 'OTP resent successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
});


export default router;
