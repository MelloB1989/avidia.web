/*
import get_user from '../../../lib/firestore/get_user';

export default async function user_data(req, res){
    const userid = req.body.id;
    if(req.method === 'POST'){
    try{
        const ud = await get_user(userid);
        //console.log(ud)
        //ud ? res.status(200).json({data: ud}) : res.status(200).json({data: "not_found"});
    }
    catch{
        res.status(200).json({ error : "Aai cha gavat, galat JWT token bhejta hai!"})
    }
    }
    else{
        res.status(500).json({ error: "Wrong method bhau!" })
    }
}
*/