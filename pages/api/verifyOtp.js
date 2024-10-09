
import user from '@/models/user';
import connectDb from '@/middleware/mongoose';

const handler = async (req, res) => {
  if (req.method === 'POST') {
    const { email, otp } = req.body;

    let u = await user.findOne({ email });
    if (!u) {
      return res.status(400).json({ success: false, error: 'User not found' });
    }

    if (u.otp === otp && u.otpExpiry > Date.now()) {
      res.status(200).json({ success: true, message: 'OTP verified successfully' });

      u.otp = null;
      u.otpExpiry = null;
      u.userVerified = true;
      await u.save();
    } else {
      res.status(400).json({ success: false, error: 'Invalid or expired OTP' });
    }
  } else {
    res.status(400).json({ success: false, error: 'Method not allowed' });
  }
};

export default connectDb(handler);
