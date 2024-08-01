import ai_completion from '../../../lib/openai/chat_plugin/gpt_3.5_turbo_completion';
import get_access from '../../../lib/firestore/access/get_access';
import auth_token_verify from '../../../lib/jwt_verify';

export default async function AICompletion(req, res){
    if (req.method === 'POST'){
        const { auth_token, access_token, message } = req.body;
                //Verify the JWT tokens
        const auth = auth_token_verify(auth_token);
        if(auth === null) res.status(401).json({ error: 'Access Denied, Invalid JWT tokens' });
        else{
        const data = await get_access(access_token);
        if (!data) {
        console.log("No access");
    } else {
        const r = await ai_completion(message);
            //Add token usage, r.total_tokens
            //Return message
        res.status(200).json({ message: r.message });
            //console.log("Full access");
    }
    }
    }
}