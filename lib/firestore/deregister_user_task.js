const admin = require('../firestore_auth');
const update_labs_activity = require('./update_labs_activity');

const deregister_user_task = async (userId, lab, taskArn) => {
    if (!userId || !lab) {
        console.log("Data not provided!");
        return null;
    }

    const db = admin.firestore();
    const userRef = db.collection('users').doc(userId);

    try {
        const snapshot = await userRef.get();
        const labs = snapshot.data().active_labs;

        let labIndex = labs.findIndex(alab => alab.lab_id === lab);

        if(labIndex === -1) {
            console.log("Lab not found!");
            return false;
        }

        labs[labIndex].task_running = "";
        labs[labIndex].status = "stopped";
        labs[labIndex].start = "not_set";

        await userRef.update({ active_labs: labs });
        console.log("UserRef updated successfully.");
    } catch (error) {
        console.error("Error updating userRef:", error);
        return error;
    }

    try {
        console.log("Attempting to update labs activity...");
        await update_labs_activity(userId, taskArn);
        console.log("Labs activity updated successfully.");
    } catch (error) {
        console.error("Error updating labs activity:", error);
        return error;
    }

    return true;
}

module.exports = deregister_user_task;