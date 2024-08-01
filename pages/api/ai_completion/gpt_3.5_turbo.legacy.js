import ai_completion from '../../../lib/openai/chat_plugin/gpt_3.5_turbo_completion';
import access_token_verify from '../../../lib/access_jwt_verify';
import auth_token_verify from '../../../lib/jwt_verify';
import user_courses from '../../../lib/firestore/get_courses';

export default async function AICompletion(req, res){
    if (req.method === 'POST'){
        const { auth_token, access_token, message } = req.body;
        //Verify the JWT tokens
        const auth = auth_token_verify(auth_token);
        const access = access_token_verify(access_token);
        if(auth === null || access === null) res.status(401).json({ error: 'Access Denied, Invalid JWT tokens' });
        else{
            const user_id = auth.userId;
            const available_courses = user_courses(user_id);
            if(available_courses){
                const r = await ai_completion(message);
                //Add token usage, r.total_tokens
                //Return message
                res.status(200).json({ message: r.message });
            }
            else res.status(401).json({ error: 'Access Denied, User not subscribed to any courses' });
        }
    }
}