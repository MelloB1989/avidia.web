const admin = require('../../firestore_auth');
const db = admin.firestore();

const getUnlockDates = async (courseId) => {
    try {
        const doc = await db.collection('timetable_cohort').doc(courseId).get();
        if (!doc.exists) {
            return { success: false, error: 'Unlock dates not found for the specified course' };
        } else {
            return { success: true, data: doc.data() };
        }
    } catch (error) {
        return { success: false, error };
    }
};

exports.module = getUnlockDates;