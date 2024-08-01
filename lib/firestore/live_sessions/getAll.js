const admin = require('../../firestore_auth');
const db = admin.firestore();

const getLiveSessions = async (course_id) => {
  try {
    const doc = await db.collection('live_session').doc(course_id).get();
    if (!doc.exists) {
      return null;
    }
    return doc.data().sessions || [];
  } catch (error) {
    console.error('Error getting live sessions: ', error);
    throw error;
  }
};

module.exports = getLiveSessions;