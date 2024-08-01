const get_courses = require('../../../lib/firestore/get_courses');
const verifyToken = require('../../../lib/jwt_verify');

export default async function my_courses(req, res){
    if(req.method === 'POST'){
    //console.log(req.body.token)
    const token = req.body.token;
    
    try {
        //Verify the JWT token and get the decoded data from the token
        const decodedData = verifyToken(token);
        //console.log('Decoded Data:', decodedData);
        if(decodedData){
            const courses = await get_courses(decodedData.userId);
            if(courses !== null){
                res.status(200).json(courses);
            }
            else res.status(500).json({ error: 'Error fetching users data' });
        }
    }
//Catch INVALID TOKEN ERROR
catch (error) {
  if (error.message === 'invalid_token') {
    console.error('Invalid Token');
    res.status(401).json({ error: 'Invalid JWT token' });
  } else {
    console.error('Error:', error.message);
    res.status(401).json({ error: error.message });
  }
}} 
else res.status(500).json({ error: 'Wrong method' });
} 