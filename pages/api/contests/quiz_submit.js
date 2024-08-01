const jwt = require('jsonwebtoken');
const secretKey = process.env.JWT_KEY;
import { GraphQL_endpoint, GraphQL_API_KEY } from '@/config';
import querygen from '@querygen';
import { GraphQLClient } from 'graphql-request';

const client = new GraphQLClient(GraphQL_endpoint, {
    headers: {
      "x-api-key": GraphQL_API_KEY,
    },
});

export default async function QuizSubmit(req, res){
    if (req.method === 'POST') {
        const { token, answers, quiz, timer } = req.body;
        const user = jwt.verify(token, secretKey);
        if(user != null){
            const getQuizContestAnswers = await client.request(querygen("getQuizContestAnswers", quiz.slug));
            const quizAnswers = getQuizContestAnswers.listQuizQuestions.items;
            let score = 0;
            let correct = [];
            quizAnswers.forEach(quizAnswer => {
                const answer = answers.find(answer => answer.id === quizAnswer.id);
                if(answer && answer.answer.trim() === quizAnswer.answer.trim()){
                    correct.push(quizAnswer.id);
                    score += quizAnswer.score;
                }
            });

            //conver correct[], answers[] to string
            correct = correct.join(',');
            const answersString = JSON.stringify(answers).replace(/"/g, '\\"');
            const i = {
                answers: answersString,
                correct,
                courseId: quiz.course_id,
                nbspId: user.userId,
                quizSlug: quiz.slug,
                timeTake: timer,
                score: score
            };
            const putquizAnswers = await client.request(querygen("putquizAnswers", i));
            
            res.status(200).json({score});
        }

    } else {
        return res.status(405).end(); // Method Not Allowed
    }
}