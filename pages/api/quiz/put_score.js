const jwt = require('jsonwebtoken');
const secretKey = process.env.JWT_KEY;
import { GraphQL_endpoint, GraphQL_API_KEY } from '@/config';
import querygen from '@querygen';
import { GraphQLClient } from 'graphql-request';

export default async function get_flask_details(req, res){
    const { token, score, qd } = req.query;
    
    const client = new GraphQLClient(GraphQL_endpoint, {
        headers: {
          "x-api-key": GraphQL_API_KEY,
        },
    });
    
    const user = jwt.verify(token, secretKey);
    const nbspid = user.userId
    if(user !== null){
        //Create a quiz
        try{
        const quizContext = await client.request(querygen("createQuiz", {qd, score, nbspid}));
        console.log(quizContext);
        const quizId = quizContext.createQuiz.id;
        const userContext = await client.request(querygen("getUserCourseIds", nbspid));
        console.log(userContext);
        const courseId = userContext.getUser.subscribedCourseIds[0]; //TODO : UPDATE TO GET PARTICULAR COURSE ID
        
        const courseQuizContext = await client.request(querygen("getUserCourseQuiz", courseId));
        console.log(courseQuizContext);
        let quizzes = courseQuizContext.getSubscribedCourse.quizzes || [];
        const prevscore = courseQuizContext.getSubscribedCourse.score || 0.0;
        console.log(parseFloat(prevscore.toString()) + parseFloat(score.toString()))
        quizzes.push(quizId);
        const mutate = await client.request(querygen("updateUserCourseQuiz", {
            id: courseId,
            quizzes: quizzes,
            score: parseFloat(prevscore.toString()) + parseFloat(score.toString()),
            nbspid: nbspid
        }))
        console.log(mutate)
        res.status(200).json({success: "200 OK"});
        } catch(e) {
            console.log(e);
            res.status(500).json({error: e});
        }
    } else res.status(401).json({error: "Invalid JWT"})
}