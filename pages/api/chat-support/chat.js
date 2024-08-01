import ai_completion from '@/lib/chat-support/chat';

export default async function AICompletion(req, res){
    if (req.method === 'POST'){
        const { message } = req.body;
                //Verify the JWT tokens
        if(false) res.status(401).json({ error: 'Access Denied, Invalid JWT tokens' });
        else{
        if (false) {
        console.log("No access");
    } else {
        const r = await ai_completion(message);
            //Add token usage, r.total_tokens
            //Return message
        res.status(200).json({ message: r.message });
    }
    }
    }
}