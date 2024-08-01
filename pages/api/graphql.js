import axios from 'axios';
import { parse } from 'graphql';
import { GraphQL_endpoint, GraphQL_API_KEY } from '@/config';
import jwt from 'jsonwebtoken';
const JWT_KEY = process.env.JWT_KEY;

const admin_mutations = ["createActiveLab", "deleteActiveLab", "createCoupon", "updateCoupon", "deleteCoupon", "createCohort", "updateCohort", "deleteCohort", "createInstructor", "updateInstructor", "deleteInstructor", "createQuiz", "updateQuiz", "deleteQuiz", "createSubscribedCourse", "updateSubscribedCourse", "deleteSubscribedCourse", "createUser", "deleteUser", "createMyCustomType", "updateMyCustomType", "deleteMyCustomType", "createLiveSessions", "updateLiveSessions", "deleteLiveSessions", "createQuizContest", "updateQuizContest", "deleteQuizContest", "createQuizQuestion", "updateQuizQuestion", "deleteQuizQuestion", "createQuizAnswers", "updateQuizAnswers", "deleteQuizAnswers", "createHandouts", "updateHandouts", "deleteHandouts", "createAvidiaProjects", "updateAvidiaProjects", "deleteAvidiaProjects", "createAvidiaProjectDetails", "updateAvidiaProjectDetails", "deleteAvidiaProjectDetails"];
const user_restricted_queries = ["listUsers", "listActiveLabs", "listCoupons", "listQuizAnswers"]
const restricted_queries = [
    {
        query: "getUser",
        variables: ["nbspID"]
    },
    {
        query: "getMyCustomType",
        variables: ["id"]
    },
    {
        query: "queryQuizAnswersByNbspIdCourseIdIndex",
        variables: ["nbspId"]
    },
    {
        query: "getQuizAnswers",
        variables: ["nbspId"]
    }
];

export default async function handler(req, res) {
    async function executeQuery(){
        try {
            // Forward the request to the GraphQL endpoint
            const response = await axios.post(GraphQL_endpoint, req.body, {
                headers: {
                    'Content-Type': 'application/json',
                    'x-api-key': GraphQL_API_KEY,
                },
            });
    
            res.status(200).json(response.data);
        } catch (error) {
            console.error('API route error:', error);
            res.status(error.response?.status || 500).json({ message: error.message });
        }
    }
    const document = parse(req.body.query);
    const token = req.headers.token;
    const verified = jwt.verify(token, JWT_KEY);
    const operationName = document.definitions[0].selectionSet.selections[0].name.value;
    const variables = document.definitions[0].selectionSet.selections[0].arguments;
    if(admin_mutations.includes(operationName)){
        if(verified.userId === "1") await executeQuery();
        else {
            res.status(403).json({message: "Forbidden, don't try to fuck here bro"});
            return;
        }
    }
    else if(user_restricted_queries.includes(operationName)){
        res.status(403).json({message: "Forbidden, don't try to fuck here bro"});
        return;
    }
    else await executeQuery();
    
}