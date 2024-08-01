const admin = require('../firestore_auth');
const db = admin.firestore();
const addCourse = async (data, course_id) => {
      db.collection("courses").doc(course_id).set(data)
      .then(() => {
          console.log("Document successfully written!");
      })
      .catch((error) => {
          console.error("Error writing document: ", error);
      });
    }

module.exports = addCourse;