const admin = require('../../firestore_auth');
const db = admin.firestore();

const setUnlockDates = async (courseId, unlockDates) => {
    try {
        await db.collection('timetable_cohort').doc(courseId).set(unlockDates);
        return { success: true };
    } catch (error) {
        return { success: false, error };
    }
};
exports.module = setUnlockDates;