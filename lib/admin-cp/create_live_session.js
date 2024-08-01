const admin = require('../firestore_auth');
const db = admin.firestore();

const createLiveSession = async ({
  sessionId,
  sessionName,
  sessionAgenda,
  sessionTutor,
  sessionStart,
  sessionEnd,
  courseId,
}) => {
  const courseRef = db.collection('live_sessions').doc(courseId);

  const sessionData = {
    session_id: sessionId,
    session_name: sessionName,
    session_agenda: sessionAgenda,
    session_tutor: sessionTutor,
    session_start: sessionStart,
    session_end: sessionEnd,
  };

  // Atomically add a new session to the "sessions" array field.
  return courseRef.update({
    sessions: admin.firestore.FieldValue.arrayUnion(sessionData),
  });
};

module.exports = createLiveSession;
