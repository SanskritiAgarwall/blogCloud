
import user from "@/models/user"
import connectDb from "@/middleware/mongoose"
var CryptoJS = require("crypto-js");
var jwt = require('jsonwebtoken');


const handler = async(req,res)=>{

    if(req.method=='POST'){
        let u = await user.findOne({"email": req.body.email}) 
        if(u){

            var bytes  = CryptoJS.AES.decrypt(u.password, 'rakesh123');
            var originalText = bytes.toString(CryptoJS.enc.Utf8);

            if(u.userVerified == false){

                res.status(400).json({ success :false, verify:false })

            }else{

        if(req.body.email == u.email && req.body.password == originalText){

            var token = jwt.sign({ name:u.email}, 'jwtsecret');
            res.status(200).json({ success :true, token , verify:true })
        }
        else{

            res.status(400).json({ error :"This is not allowed" })
        }
    }
    }else{

        res.status(400).json({ error :"This is not allowed" })
    }
        
    }
    else{
        res.status(400).json({ error :"This is not allowed" })
    }

}

export default connectDb(handler)
  