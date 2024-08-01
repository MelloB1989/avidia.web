import jwt from 'jsonwebtoken';
const KEY = process.env.JWT_KEY;
export default function verify(req, res){
  if(req.method === 'POST'){
    const token = req.body.token;
    try {
      const verified = jwt.verify(token, KEY);
      if (verified) res.status(200).json({ success: true });
    }
    catch {
      res.status(200).json({ success: false })
    }
  }
  else res.status(500).json( {error: "Invalid method" })
}