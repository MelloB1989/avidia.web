import { useMutation } from '@apollo/client';
import { createUser, createSubscription, createLab } from '@mutations';
import { v4 as uuidv4 } from 'uuid';
import {useEffect, useState} from 'react';
import axios from 'axios';

export default function Migration(){
    var i;
    const [message, smessage] = useState("Starting operation!");
    const [userg, setUserid] = useState();
    const [addSubscription, { subdata, subloading, suberror }] = useMutation(createSubscription);
    const [addLab, { labdata, labloading, laberror }] = useMutation(createLab);
    const [addUser, { userdata, userloading, usererror }] = useMutation(createUser);
    useEffect(()=>{
        const migrate = async() => {
            for (i = 0; i < 420; i++){
                console.log(`Fetching user ${i}`);
                setUserid(i.toString());
                const r = await axios.post('/api/temp/getuser', {id: i.toString()});
                //console.log(r.data.data.my_courses[0].started_from);
                if(r.data.data !== "not_found"){
                    const userid = uuidv4();
                    const resultLab = await addLab({ variables: { input: {"ecs_ip": "", "lab_id": "vs_code", "task_arn": "", "expiry": "", "status": "", "start": ""} } });
                    const labid = resultLab.data.createActiveLab.id;
                    smessage(`Lab ${labid} created`);
                    const resultCourse = await addSubscription({ variables: { input: {"permalink": "cohort_2024", "startedFrom": r.data.data.my_courses[0]?.started_from} } });
                    const courseid = resultCourse.data.createSubscribedCourse.id;
                    smessage(`Subscription ${courseid} created`);
                    const resultUser = await addUser({ variables: { input: {"id": userid, "nbspID": i.toString(), "subscribedCourseIds": [courseid], "active_labs": [labid]} } });
                    smessage(`User created`);
                    //const userID = resultCourse.data.createActiveLab.id;
                }
                else {
                    smessage(`User not found in firebase, skipping!`);
                }
            }
            smessage(`Migration Operation Complete!`);
    }
    migrate();
    }, []);
    if (suberror || usererror || laberror) return <p>Error :(</p>;
    return(
        <>
        <h1>Migrating Data for User ID: {userg}</h1>
        {subloading ? (<h2>Creating Subscription</h2>) : labloading ? (<h2>Creating Active Lab</h2>) : (<h2>Creating User</h2>)}
        <p>{message}</p>
        </>
        )
}