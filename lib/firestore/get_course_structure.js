const admin = require('../firestore_auth');
const db = admin.firestore();

const get_course_structure = async (courseId) => {
    try {
        const doc = await db.collection("course").doc(courseId).get();
        if (doc.exists) {
            //console.log("User data:", JSON.stringify(doc.data()));
            return doc.data();
        } else {
            console.log("No such course!");
            return null;
        }
    } catch (error) {
        console.error("Error getting course:", error);
    }
};

module.exports = get_course_structure;