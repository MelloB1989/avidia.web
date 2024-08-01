const admin = require('../firestore_auth');

const register_user_task = async (userId, lab, taskArn) => {
    var labIndex = -1;
    var tmp = 0;
    try{
        if(!userId || !lab || !taskArn) { return null; console.log("Data not provided!"); }
        const db = admin.firestore();
        const userRef = db.collection('users').doc(userId);
        const snapshot = await userRef.get();
        const labs = snapshot.data().active_labs;
        //Find the index of the lab to update in the active_labs array
        labs.map((alab) => {
            if(alab.lab_id === lab) labIndex = tmp;
            tmp = tmp + 1;
        })
        //Update the Task ARN in the array map
        //console.log(labIndex)
        labs[labIndex].task_running = taskArn.toString();
        labs[labIndex].status = "running";
        labs[labIndex].start = new Date().getTime();
        labs[labIndex].start = "not_set";
        
        //console.log(labs);
        //Refactor the changes to database
        await userRef.update({ active_labs: labs });
        const activityRef = db.collection('admin').doc('activity');
         await activityRef.update({
            active_labs: admin.firestore.FieldValue.arrayUnion({ user_id: userId, task_arn: taskArn })
        });
        return true;
    }
    catch (error) {
        console.log(error)
        return error;
    }
}

module.exports = register_user_task;
/*Usage
const lab = "vs_code";
const userId = "0";
const arn = "arn:aws:ecs:ap-south-2:641688873870:task/Respawn/985e87346c31472bb20852c1056a4db3"

register_user_task(userId, lab, arn)
*/