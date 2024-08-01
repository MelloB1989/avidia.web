const admin = require('../firestore_auth');

const getCourse = async (courseId) => {
    const db = admin.firestore();
  const courseRef = db.collection('courses').doc(courseId);
  const doc = await courseRef.get();
  if (!doc.exists) {
    console.log('No such document!');
  } else {
    //console.log('Document data:', doc.data());
    return doc.data();
  }
}

module.exports = getCourse;

/*Usage
// Replace 'courseIdHere' with actual course ID
getCourse('courseIdHere');
*/