// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import user from "@/models/user"
import connectDb from "@/middleware/mongoose"
var CryptoJS = require("crypto-js");
const nodemailer = require('nodemailer');

const handler = async(req,res)=>{
    if(req.method=='POST'){

        const {name , email } = req.body;

        const otp = Math.floor(1000 + Math.random() * 9000);
        let transporter = nodemailer.createTransport({
            service: 'gmail', // You can use any email service
            auth: {
                user: 'sanskritiagarwal0810@gmail.com', // Your email
                pass: 'uvza rhwq fcdx ixzb' // Your email password or app password
            }
        });
        
        // Email options
        let mailOptions = {
            from: 'sanskritiagarwal0810@gmail.com', // Sender address
            to: email, // Recipient's email
            subject: 'Your OTP Code for Blog Site', // Subject line
            text: `Your OTP is: <b>${otp}</b>`, // Plain text body
            html: `<b>Your OTP : ${otp}</b>` // HTML body
          };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                return error;
            }
            // console.log('Email sent: ' + info.response);
        });


        let encryptedPassword = CryptoJS.AES.encrypt(req.body.password, 'rakesh123').toString();
    let u = new user({
      name,
      email,
      password: encryptedPassword,
      otp, // Store OTP in the database for later verification
      otpExpiry: Date.now() + 10 * 60 * 1000 // OTP valid for 10 minutes
    });
    
    await u.save();

        
        
    res.status(200).json({ success :true })
    }
    else{
        res.status(400).json({ error :"This is not allowed" })
    }

}

export default connectDb(handler)
  