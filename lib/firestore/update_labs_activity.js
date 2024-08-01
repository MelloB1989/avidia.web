const admin = require('../firestore_auth');
const db = admin.firestore();

const update_labs_activity = async (userId, taskArn) => {
try {
        const activityRef = db.collection('admin').doc('activity');
        const doc = await activityRef.get();

        if (doc.exists) {
            const activeLabs = doc.data().active_labs || [];
            const updatedLabs = activeLabs.filter(lab => {
                return !(lab.user_id === userId && lab.task_id === taskArn);
            });

            //console.log("Update Labs", updatedLabs);
            await activityRef.update({
                active_labs: updatedLabs
            });

            console.log('User ID and Task ID removed successfully!');
        } else {
            console.log('Document does not exist!');
        }
    } catch (error) {
        console.error('Error updating activityRef:', error);
        return error;
    }
}

module.exports = update_labs_activity;