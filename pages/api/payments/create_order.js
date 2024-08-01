const Razorpay = require("razorpay");
//const verifyToken = require('../../../lib/jwt_verify');
const jwt = require('jsonwebtoken');
const secretKey = process.env.JWT_KEY;

var razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY,
  key_secret: process.env.RAZORPAY_SECRET,
});

export default async function CreateOrder(req, res){
    if(req.method === 'POST'){
        const token = req.body.token;
        //console.log(req.body);
        const user = jwt.verify(token, secretKey);
        //console.log(user);
        if (user !== null){
            //CREATE THE ORDER IF JWT VALID
            try{
                const order = await razorpay.orders.create({
                      "amount": req.body.amt+"00",
                      "currency": "INR",
                      "receipt": req.body.uid,
                      "notes": {
                        "user": user.userId
                      }
                });
                //console.log(order);
                return res.status(200).json({order})
            }
            catch(e){
                return res.status(500).json({error: e})
            }
        }
        else res.status(401).json({error: "INVALID TOKEN"})
    }
    else{
        return res.status(500).json({error: "INVALID METHOD"})
    }
}