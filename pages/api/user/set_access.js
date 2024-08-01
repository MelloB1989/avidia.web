import set_access from '../../../lib/firestore/access/set_access';
import cookie from 'cookie';
export default async (req, res) => {
    const { user_id } = req.body;
    try{
        const token = await set_access(user_id.toString());
        //console.log("TOKEN:" +token);
        const jwt_cookie = cookie.serialize('access_token', token, {
          maxAge: 86400, // 1 day in seconds
          path: '/',
        });
        res.setHeader('Set-Cookie', [jwt_cookie]);
        return res.status(200).json({success: true});
    }
    catch(error){
        return res.status(500).json({error});
    }
}